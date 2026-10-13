// CONFIG SIMPLE - sin const para evitar SyntaxError por recarga - v10 UNIFICADO
window.SUPABASE_URL = "https://pgnlafozaukhdqlxfcfk.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_pVJiDol9813vN_wCbuRT0w_w1vDatSz";
window.EDGE_FUNCTION_URL = window.SUPABASE_URL + "/functions/v1/send-qr";

window.APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzG3bROW_7esax_qsAYTCJwT-_8gAF1XLwGVk7DKt5UZaX-EtQ8OOWhwlJjXNRjXsq5KQ/exec";

// Compatibilidad - las 2 apuntan al mismo (email + drive)
window.APPS_SCRIPT_EMAIL_URL = window.APPS_SCRIPT_URL;
window.APPS_SCRIPT_DRIVE_URL = window.APPS_SCRIPT_URL;

// Opcional: ID de carpeta Drive (vacío = crea automática FeriaSanMartin-Fotos-Grupos)
window.DRIVE_FOLDER_ID = window.DRIVE_FOLDER_ID || "";

// Helper para crear cliente Supabase (usado por admin.html, vote.html, registro-grupos.html)
window.initSupabaseClient = window.initSupabaseClient || function(){
  try{
    if(!window.supabase || !window.supabase.createClient) return null;
    if(window.supabaseClient && window.supabaseClient.from) return window.supabaseClient;
    var client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    window.supabaseClient = client;
    window.supabaseInstance = client;
    console.log('Supabase OK - unificado');
    return client;
  }catch(e){ console.error(e); return null; }
};

if(window.supabase && window.supabase.createClient && !window.supabaseClient){
  try{
    window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    window.supabaseInstance = window.supabaseClient;
  }catch(e){}
}