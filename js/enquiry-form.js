/* Enquiry form -> FormSubmit (AJAX). All configuration lives here.
   Replace RECEIVING_EMAIL with the client's real address (see README: first-time activation). */
(function(){
  var HC = window.HC = window.HC || {};
  var CONFIG = {
    RECEIVING_EMAIL: 'heerpatel1394@gmail.com',
    ENDPOINT: 'https://formsubmit.co/ajax/',
    TIMEOUT_MS: 20000
  };
  var PLACEHOLDER = CONFIG.RECEIVING_EMAIL.indexOf('YOUR_RECEIVING_EMAIL')===0;

  HC.initEnquiry = function(){
    var form=document.getElementById('enquiry-form'); if(!form) return;
    var status=form.querySelector('.form-status'), btn=form.querySelector('button[type=submit]'), busy=false;
    var cat=form.elements.category, prod=form.elements.product_name, dl=document.getElementById('product-list');
    function fillList(){ if(!dl) return; var c=cat.value; dl.innerHTML=(c?HC.byCat(c):HC.products).map(function(p){return '<option value="'+HC.esc(p.name)+'">';}).join(''); }
    // prefill from ?product=<id> or ?category=<key>
    var q=new URLSearchParams(location.search), pre=q.get('product')&&HC.byId(q.get('product'));
    if(pre){ cat.value=pre.category; prod.value=pre.name; form.elements.product_url.value=new URL(HC.productUrl(pre),location.href).href; }
    else if(q.get('category')) cat.value=q.get('category');
    fillList(); cat.addEventListener('change',fillList);
    form.elements.page_url.value=location.href.split('#')[0];

    var rules={
      full_name:function(v){return v.trim().length>=2||'Please enter your full name.';},
      email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Please enter a valid email address.';},
      phone:function(v){var d=v.replace(/\D/g,''); return (/^[+()\-\s\d]+$/.test(v)&&d.length>=7&&d.length<=15)||'Please enter a valid phone number (7\u201315 digits).';},
      city:function(v){return v.trim().length>=2||'Please enter your city.';},
      category:function(v){return !!v||'Please choose a product category.';},
      message:function(v){return v.trim().length>=2||'Please tell us a little more (at least 10 characters).';}
    };
    function check(name){
      var el=form.elements[name], r=rules[name](el.value), err=document.getElementById('err-'+name);
      var ok=r===true; el.setAttribute('aria-invalid',ok?'false':'true'); if(err) err.textContent=ok?'':r; return ok;
    }
    Object.keys(rules).forEach(function(n){ form.elements[n].addEventListener('blur',function(){check(n);}); form.elements[n].addEventListener('input',function(){ if(form.elements[n].getAttribute('aria-invalid')==='true') check(n); }); });
    function say(msg){ status.textContent=msg; status.className='form-status error show'; status.focus(); }

    form.addEventListener('submit',function(ev){
      ev.preventDefault(); if(busy) return;
      status.className='form-status';
      var bad=Object.keys(rules).filter(function(n){return !check(n);});
      if(bad.length){ form.elements[bad[0]].focus(); return; }
      if(form.elements._honey.value) return;               // bot trap
      if(PLACEHOLDER){ say('This form isn\u2019t connected to an inbox yet. The site owner needs to set the receiving email in js/enquiry-form.js (see README).'); return; }
      busy=true; btn.disabled=true; var label=btn.textContent; btn.textContent='Sending\u2026';
      var d=new FormData(form);
      var body={ _subject:'New enquiry \u2013 '+HC.catLabel(cat.value)+(prod.value?': '+prod.value:'')+' | Heer\u2019s-crafty',
        _template:'table', _captcha:'false', _honey:'',
        'Full Name':d.get('full_name').trim(), 'Email':d.get('email').trim(), 'Phone':d.get('phone').trim(), 'City':d.get('city').trim(),
        'Product Category':HC.catLabel(d.get('category')), 'Product Name':(d.get('product_name')||'Not specified').trim(),
        'Product Page URL':d.get('product_url')||'Not specified', 'Enquiry Page URL':d.get('page_url'), 'Message':d.get('message').trim(),
        _replyto:d.get('email').trim() };
      var ctl=('AbortController' in window)?new AbortController():null, t=setTimeout(function(){ctl&&ctl.abort();},CONFIG.TIMEOUT_MS);
      fetch(CONFIG.ENDPOINT+encodeURIComponent(CONFIG.RECEIVING_EMAIL),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(body),signal:ctl?ctl.signal:undefined})
      .then(function(r){ return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok,j:j};}); })
      .then(function(res){
        var success = res.ok && (res.j.success===true||res.j.success==='true');
        if(!success) throw new Error(res.j.message||'rejected');
        form.reset(); try{sessionStorage.setItem('hc-enquiry-ok','1');}catch(x){}
        location.href='thank-you.html';
      })
      .catch(function(err){
        say(err&&err.name==='AbortError'?'The request took too long. Please check your connection and try again.':'We couldn\u2019t send your enquiry just now. Please check your connection and try again in a moment.');
      })
      .finally(function(){ clearTimeout(t); busy=false; btn.disabled=false; btn.textContent=label; });
    });
  };
  HC.initThankYou=function(){
    if(!document.getElementById('ty-root')) return;
    var ok=false; try{ ok=sessionStorage.getItem('hc-enquiry-ok')==='1'; sessionStorage.removeItem('hc-enquiry-ok'); }catch(x){}
    if(!ok){ location.replace('contact.html'); return; }
    document.getElementById('ty-root').hidden=false;
  };
})();
