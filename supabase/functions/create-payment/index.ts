import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Doctor fee configuration - all pricing is controlled server-side
const DOCTOR_FEES: Record<string, number> = {
  "1": 500,   // Dr. Sarah Mitchell
  "2": 1200,  // Dr. James Chen
  "3": 1000,  // Dr. Priya Sharma
  "4": 500,   // Dr. Michael Brown
};

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
    const { doctorId, doctorName, specialty, date, time } = await req.json();

    if (!doctorId || !doctorName || !specialty || !date || !time) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the fee from server-side configuration (NOT from frontend)
    const fee = DOCTOR_FEES[doctorId];
    if (!fee) {
      return new Response(
        JSON.stringify({ error: "Invalid doctor ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Razorpay credentials not configured");
      return new Response(
        JSON.stringify({ error: "Payment service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a pending appointment first
    const { data: appointment, error: appointmentError } = await supabase
      .from("appointments")
      .insert({
        user_id: userId,
        doctor_name: doctorName,
        specialty: specialty,
        date: date,
        time: time,
        fee: fee,
        status: "pending",
      })
      .select()
      .single();

    if (appointmentError) {
      console.error("Error creating pending appointment:", appointmentError);
      return new Response(
        JSON.stringify({ error: "Failed to create appointment" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Created pending appointment:", appointment.id);

    // Create Razorpay order
    const amountInPaise = fee * 100;
    const receiptId = `apt_${appointment.id.slice(0, 8)}`;

    const orderPayload = {
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId,
      notes: {
        appointment_id: appointment.id,
        doctor_name: doctorName,
        specialty: specialty,
      },
    };

    console.log("Creating Razorpay order with amount:", amountInPaise);

    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error("Razorpay order creation failed:", errorText);
      
      // Delete the pending appointment since payment order failed
      await supabase.from("appointments").delete().eq("id", appointment.id);
      
      return new Response(
        JSON.stringify({ error: "Failed to create payment order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const razorpayOrder = await razorpayResponse.json();
    console.log("Razorpay order created:", razorpayOrder.id);

    return new Response(
      JSON.stringify({
        order_id: razorpayOrder.id,
        amount: fee,
        amount_in_paise: amountInPaise,
        currency: "INR",
        appointment_id: appointment.id,
        key_id: razorpayKeyId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in create-payment:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
