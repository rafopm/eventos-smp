// CONFIG v12 CORREGIDO - con carpeta Drive correcta
window.SUPABASE_URL = "https://pgnlafozaukhdqlxfcfk.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_pVJiDol9813vN_wCbuRT0w_w1vDatSz";
window.EDGE_FUNCTION_URL = window.SUPABASE_URL + "/functions/v1/send-qr";

window.APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx58HBzJ4OlM0Xidrs4kGnWbrew9XW2aP6dH7x9d406s-1jnitHMuLygvsWMjoPpbcxZg/exec";

// Compatibilidad
window.APPS_SCRIPT_EMAIL_URL = window.APPS_SCRIPT_URL;
window.APPS_SCRIPT_DRIVE_URL = window.APPS_SCRIPT_URL;

// FIX: ID LIMPIO de tu carpeta - https://drive.google.com/drive/folders/1tluAk-lICqNrC6v-z3Z1j3rwbkDUxLhT
window.DRIVE_FOLDER_ID = "1tluAk-lICqNrC6v-z3Z1j3rwbkDUxLhT";

// Helper Supabase
window.initSupabaseClient = window.initSupabaseClient || function(){
  try{
    if(!window.supabase || !window.supabase.createClient) return null;
    if(window.supabaseClient && window.supabaseClient.from) return window.supabaseClient;
    var client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    window.supabaseClient = client;
    window.supabaseInstance = client;
    console.log('Supabase OK - carpeta Drive:', window.DRIVE_FOLDER_ID);
    return client;
  }catch(e){ console.error(e); return null; }
};

if(window.supabase && window.supabase.createClient && !window.supabaseClient){
  try{ window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY); window.supabaseInstance = window.supabaseClient; }catch(e){}
}