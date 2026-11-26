/* Reusable product detail view: product.html?p=<product-id> */
(function(){
  var HC = window.HC = window.HC || {};
  HC.initProductDetail = function(){
    var root=document.getElementById('pd-root'); if(!root) return;
    var id=new URLSearchParams(location.search).get('p'), p=id&&HC.byId(id), e=HC.esc;
    if(!p){
      document.title='Product not found \u2013 Heer\u2019s-crafty';
      root.innerHTML='<div class="wrap empty"><h1>We couldn\u2019t find that product.</h1><p style="margin-inline:auto">It may have moved. Browse the full collection instead.</p><a class="btn btn-primary" href="products.html">View All Products</a></div>';
      return;
    }
    // metadata
    var desc=p.name+' \u2013 '+p.description+' Send an enquiry to Heer\u2019s-crafty.';
    document.title=p.name+' | Heer\u2019s-crafty';
    var set=function(sel,attr,val){var n=document.querySelector(sel); if(n) n.setAttribute(attr,val);};
    set('meta[name=description]','content',desc); set('meta[property="og:title"]','content',p.name+' | Heer\u2019s-crafty');
    set('meta[property="og:description"]','content',desc); set('meta[property="og:image"]','content',new URL(p.images[0].src,location.href).href);
    var cu=new URL(location.href); cu.hash=''; set('link[rel=canonical]','href',cu.href);
    var idx=0, imgs=p.images, cat=HC.catLabel(p.category);
    var thumbs=imgs.length>1 ? '<div class="thumbs" role="tablist" aria-label="Product photos">'+imgs.map(function(im,i){return '<button type="button" data-i="'+i+'" aria-label="Show photo '+(i+1)+' of '+imgs.length+'" aria-current="'+(i===0)+'"><img src="'+im.src+'" alt="" width="96" height="96" loading="lazy"></button>';}).join('')+'</div>' : '';
    var nav=imgs.length>1 ? '<div class="g-nav"><button type="button" class="g-prev" aria-label="Previous photo">'+HC.icon('left')+'</button><button type="button" class="g-next" aria-label="Next photo">'+HC.icon('right')+'</button></div>' : '';
    root.innerHTML=
    '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="products.html">Collections</a> / <a href="'+p.category+'.html">'+cat+'</a></nav>'+
    '<div class="pd-grid"><div class="gallery">'+thumbs+'<div class="main-img" id="main-img" role="button" tabindex="0" aria-label="Open larger view"><img id="main-photo" src="'+imgs[0].src+'" width="'+imgs[0].w+'" height="'+imgs[0].h+'" alt="'+e(p.name)+' \u2013 photo 1">'+nav+'</div></div>'+
    '<div class="pd-info"><span class="pd-cat">'+e(cat)+(p.tag?' \u00b7 '+e(p.tag):'')+'</span><h1>'+e(p.name)+'</h1><p class="lead">'+e(p.description)+'</p>'+
    '<dl class="facts"><div><dt>Collection</dt><dd>'+e(cat)+'</dd></div>'+(p.tag?'<div><dt>Type</dt><dd>'+e(p.tag)+'</dd></div>':'')+'<div><dt>Photos</dt><dd>'+imgs.length+'</dd></div><div><dt>How to order</dt><dd>By enquiry</dd></div></dl>'+
    '<a class="btn btn-primary" href="'+HC.enquiryUrl(p)+'">Enquire About This Product '+HC.icon('arrow')+'</a>'+
    '<p style="margin-top:1.2rem;font-size:.92rem;color:rgba(41,39,37,.7)">Tell us what you\u2019d like to know \u2013 sizes, colours or availability \u2013 and we\u2019ll get back to you.</p></div></div></div>'+
    '<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Product photo"><button class="lb-close" aria-label="Close">\u00d7</button>'+(imgs.length>1?'<button class="lb-nav lb-prev" aria-label="Previous">'+HC.icon('left')+'</button><button class="lb-nav lb-next" aria-label="Next">'+HC.icon('right')+'</button>':'')+'<img id="lb-img" alt=""></div>';
    var main=document.getElementById('main-photo'), lb=document.getElementById('lightbox'), lbi=document.getElementById('lb-img');
    function show(i){
      idx=(i+imgs.length)%imgs.length; var im=imgs[idx];
      main.src=im.src; main.width=im.w; main.height=im.h; main.alt=p.name+' \u2013 photo '+(idx+1);
      root.querySelectorAll('.thumbs button').forEach(function(b,k){b.setAttribute('aria-current',k===idx);});
      if(lb.classList.contains('open')) lbi.src=im.src;
      if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(main,{opacity:.2,scale:1.03},{opacity:1,scale:1,duration:.6,ease:'power2.out'});
    }
    root.querySelectorAll('.thumbs button').forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.i);});});
    var gp=root.querySelector('.g-prev'), gn=root.querySelector('.g-next');
    if(gp){gp.addEventListener('click',function(ev){ev.stopPropagation();show(idx-1);}); gn.addEventListener('click',function(ev){ev.stopPropagation();show(idx+1);});}
    var opener=document.getElementById('main-img');
    function openLb(){lb.classList.add('open');lbi.src=imgs[idx].src;lbi.alt=main.alt;HC.lock(true);lb.querySelector('.lb-close').focus();}
    function closeLb(){lb.classList.remove('open');HC.lock(false);opener.focus();}
    opener.addEventListener('click',openLb); opener.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();openLb();}});
    lb.querySelector('.lb-close').addEventListener('click',closeLb);
    lb.addEventListener('click',function(ev){if(ev.target===lb) closeLb();});
    var lp=lb.querySelector('.lb-prev'), ln=lb.querySelector('.lb-next'); if(lp){lp.addEventListener('click',function(){show(idx-1);}); ln.addEventListener('click',function(){show(idx+1);});}
    document.addEventListener('keydown',function(ev){ if(!lb.classList.contains('open')) return; if(ev.key==='Escape') closeLb(); if(ev.key==='ArrowLeft') show(idx-1); if(ev.key==='ArrowRight') show(idx+1); });
    // related
    var rel=document.getElementById('related-wrap');
    if(rel){
      var list=HC.byCat(p.category).filter(function(x){return x.id!==p.id;}).slice(0,8);
      document.getElementById('related-slides').innerHTML=list.map(function(x){return '<div class="swiper-slide">'+HC.card(x)+'</div>';}).join('');
      document.getElementById('related-cat').href=p.category+'.html'; document.getElementById('related-cat').firstChild.textContent='View all '+cat+' ';
      if(!list.length) rel.hidden=true;
    }
  };
})();
