// === CONFIGURACIÓN SUPABASE - FORMATO NUEVO 2024+ ===
const SUPABASE_URL = "https://pgnlafozaukhdqlxfcfk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_pVJiDol9813vN_wCbuRT0w_w1vDatSz";

// Esta variable global la usa el tester y admin
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

// Crear cliente - compatible con llaves nuevas sb_publishable_
let supabaseClient;
if (window.supabase && window.supabase.createClient) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = supabaseClient;
  // Para compatibilidad con código viejo que usa `supabase`
  window.supabaseInstance = supabaseClient;
} else {
  console.error('Supabase CDN no cargó - verifica el script UMD');
}

// Alias para que tanto `supabase` como `supabaseClient` funcionen
// Nota: si window.supabase ya es el cliente, lo respetamos
if (!window.supabase || !window.supabase.from) {
  // Si window.supabase es la librería, el cliente está en supabaseClient
  // Dejamos window.supabase como librería y usamos window.supabaseClient como cliente
} else {
  // Ya es cliente, nada que hacer
}

const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/send-qr`;
window.EDGE_FUNCTION_URL = EDGE_FUNCTION_URL;