// CONFIG v12 CORREGIDO - con carpeta Drive correcta
window.SUPABASE_URL = "https://pgnlafozaukhdqlxfcfk.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_pVJiDol9813vN_wCbuRT0w_w1vDatSz";
window.EDGE_FUNCTION_URL = window.SUPABASE_URL + "/functions/v1/send-qr";

window.APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwXrMqMB1rzoMlodeLRQSDhKpsp3v0ONqDjwKDPUQlD7J9vWAMAQBg5HmbnTAz_hxEM/exec";

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

window.appsScriptRequest = function(payload, timeoutMs){
  return new Promise(function(resolve, reject){
    if(!window.APPS_SCRIPT_URL){ reject(new Error('Falta configurar la URL de Apps Script.')); return; }

    var requestId = 'request-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    var iframe = document.createElement('iframe');
    var form = document.createElement('form');
    var input = document.createElement('input');
    var timer;
    iframe.name = 'apps-script-' + requestId;
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.cssText = 'position:fixed;width:0;height:0;border:0;visibility:hidden';
    form.method = 'POST';
    form.action = window.APPS_SCRIPT_URL + '?transport=iframe';
    form.target = iframe.name;
    form.acceptCharset = 'UTF-8';
    form.style.display = 'none';
    input.type = 'hidden';
    input.name = 'payload';
    input.value = JSON.stringify(Object.assign({}, payload, {requestId: requestId}));
    form.appendChild(input);

    function cleanup(){
      window.removeEventListener('message', onMessage);
      window.clearTimeout(timer);
      iframe.remove();
      form.remove();
    }
    function onMessage(event){
      var message = event.data;
      if(!message || message.type !== 'apps-script-response' || message.requestId !== requestId) return;
      cleanup();
      if(message.response && (message.response.ok || message.response.success)) resolve(message.response);
      else reject(new Error(message.response && message.response.error || 'Apps Script no pudo completar la solicitud.'));
    }

    window.addEventListener('message', onMessage);
    timer = window.setTimeout(function(){ cleanup(); reject(new Error('Apps Script no respondió a tiempo.')); }, timeoutMs || 90000);
    document.body.appendChild(iframe);
    document.body.appendChild(form);
    try{ form.submit(); }
    catch(error){ cleanup(); reject(error); }
  });
};
