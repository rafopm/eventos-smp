// === CONFIGURACIÓN SUPABASE ===
// 1. Crea tu proyecto en supabase.com
// 2. Copia URL y ANON_KEY de Project Settings > API
// 3. Pega aquí

const SUPABASE_URL = "https://pgnlafozaukhdqlxfcfk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_pVJiDol9813vN_wCbuRT0w_w1vDatSz";

// Carga supabase-js via CDN en tus html antes de este archivo:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Para email con QR - Edge Function (opcional, puedes usar EmailJS)
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-qr`;
