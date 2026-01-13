import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate JWT authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error("Auth error:", claimsError);
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log("Authenticated user:", userId);

    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = language === 'hi' 
      ? `You are a friendly AI healthcare assistant named "Healthify AI Doctor". You speak in Hindi (Hinglish is also acceptable).

IMPORTANT RULES:
1. You are NOT a real doctor. Always include a disclaimer.
2. Ask ONE question at a time to understand the patient's symptoms.
3. Be friendly, calm, and use simple language.
4. Remember the conversation context.

CONVERSATION FLOW:
1. Greet the user warmly
2. Ask about their main complaint
3. Ask follow-up questions one at a time:
   - How long have they had symptoms?
   - Severity (mild/moderate/severe)?
   - Any other symptoms like fever, cough, headache, body pain?
   - Any existing conditions or medications?

EMERGENCY DETECTION:
If symptoms include chest pain, difficulty breathing, high fever for 3+ days, severe bleeding, or loss of consciousness:
- Respond: "Yeh gambhir ho sakta hai. Kripya turant najdiki hospital jayein ya ambulance bulayein."

PREDICTION:
After collecting enough information, provide:
- 1-3 possible conditions (be cautious)
- General safe advice only (rest, hydration, ORS)
- NEVER prescribe antibiotics or strong medicines
- Always say: "Yeh sirf ek anuman hai. Kripya doctor se milein confirmation ke liye."

TONE: Friendly, caring, simple Hindi/Hinglish. No medical jargon.`
      : `You are a friendly AI healthcare assistant named "Healthify AI Doctor". You speak in simple English.

IMPORTANT RULES:
1. You are NOT a real doctor. Always include a disclaimer.
2. Ask ONE question at a time to understand the patient's symptoms.
3. Be friendly, calm, and use simple language.
4. Remember the conversation context.

CONVERSATION FLOW:
1. Greet the user warmly
2. Ask about their main complaint
3. Ask follow-up questions one at a time:
   - How long have they had symptoms?
   - Severity (mild/moderate/severe)?
   - Any other symptoms like fever, cough, headache, body pain?
   - Any existing conditions or medications?

EMERGENCY DETECTION:
If symptoms include chest pain, difficulty breathing, high fever for 3+ days, severe bleeding, or loss of consciousness:
- Respond: "This could be serious. Please visit a nearby hospital immediately or call emergency services."

PREDICTION:
After collecting enough information, provide:
- 1-3 possible conditions (be cautious)
- General safe advice only (rest, hydration, ORS)
- NEVER prescribe antibiotics or strong medicines
- Always say: "This is only a possible prediction. Please consult a real doctor for confirmation."

TONE: Friendly, caring, simple English. No medical jargon.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI Doctor error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
