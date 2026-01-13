import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HMAC-SHA256 verification
async function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${orderId}|${paymentId}`);
  const keyData = encoder.encode(secret);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
  const signatureArray = new Uint8Array(signatureBuffer);
  
  // Convert to hex
  const generatedSignature = Array.from(signatureArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  console.log("Generated signature:", generatedSignature);
  console.log("Received signature:", signature);

  return generatedSignature === signature;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate the user
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Parse request body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointment_id } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !appointment_id) {
      return new Response(
        JSON.stringify({ error: "Missing required payment verification fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!razorpayKeySecret) {
      console.error("Razorpay secret not configured");
      return new Response(
        JSON.stringify({ error: "Payment service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the signature
    const isValid = await verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      razorpayKeySecret
    );

    if (!isValid) {
      console.error("Payment signature verification failed");
      return new Response(
        JSON.stringify({ error: "Payment verification failed - invalid signature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Payment signature verified successfully");

    // Verify the appointment belongs to the user and is in pending status
    const { data: appointment, error: fetchError } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", appointment_id)
      .eq("user_id", userId)
      .eq("status", "pending")
      .single();

    if (fetchError || !appointment) {
      console.error("Appointment not found or not in pending status:", fetchError);
      return new Response(
        JSON.stringify({ error: "Appointment not found or already processed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update appointment status to confirmed
    const { data: updatedAppointment, error: updateError } = await supabase
      .from("appointments")
      .update({ status: "scheduled" })
      .eq("id", appointment_id)
      .eq("user_id", userId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating appointment status:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to confirm appointment" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Appointment confirmed:", appointment_id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified and appointment confirmed",
        appointment: {
          id: updatedAppointment.id,
          doctor_name: updatedAppointment.doctor_name,
          specialty: updatedAppointment.specialty,
          date: updatedAppointment.date,
          time: updatedAppointment.time,
          fee: updatedAppointment.fee,
          status: updatedAppointment.status,
        },
        transaction_id: razorpay_payment_id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in verify-payment:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
