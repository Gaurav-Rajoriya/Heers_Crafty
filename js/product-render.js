/* Product cards and grids. Data lives in products-data.js. */
(function(){
  var HC = window.HC = window.HC || {};
  var all = window.HC_PRODUCTS || [];
  HC.products = all;
  HC.find = function(prefix){ for(var i=0;i<all.length;i++) if(all[i].id.indexOf(prefix)===0) return all[i]; return null; };
  HC.byId = function(id){ for(var i=0;i<all.length;i++) if(all[i].id===id) return all[i]; return null; };
  HC.byCat = function(c){ return all.filter(function(p){return p.category===c;}); };
  HC.cover = function(p){ return p.images[0]; };
  HC.productUrl = function(p){ return 'product.html?p='+encodeURIComponent(p.id); };
  HC.enquiryUrl = function(p){ return 'contact.html?product='+encodeURIComponent(p.id); };
  HC.card = function(p,opts){
    var im=p.images[0], e=HC.esc;
    var count = p.images.length>1 ? '<span class="pcard-count">'+p.images.length+' photos</span>' : '';
    return '<article class="pcard" data-cat="'+p.category+'"><a class="pcard-media" href="'+HC.productUrl(p)+'" aria-label="View details: '+e(p.name)+'" tabindex="-1">'+
      '<img src="'+im.src+'" width="'+im.w+'" height="'+im.h+'" loading="lazy" decoding="async" alt="'+e(p.name)+'">'+count+'</a>'+
      '<div class="pcard-body"><span class="pcard-cat">'+e(HC.catLabel(p.category))+(p.tag?' \u00b7 '+e(p.tag):'')+'</span>'+
      '<h3><a href="'+HC.productUrl(p)+'">'+e(p.name)+'</a></h3>'+
      '<div class="pcard-actions"><a class="btn btn-ghost btn-sm" href="'+HC.productUrl(p)+'">View Details</a><a class="btn btn-primary btn-sm" href="'+HC.enquiryUrl(p)+'">Enquire Now</a></div></div></article>';
  };
  HC.renderGrids = function(){
    document.querySelectorAll('[data-grid]').forEach(function(el){
      var list = el.hasAttribute('data-cat') ? HC.byCat(el.getAttribute('data-cat')) : all.slice();
      var ex = el.getAttribute('data-exclude'); if(ex) list=list.filter(function(p){return p.id!==ex;});
      var lim = parseInt(el.getAttribute('data-limit'),10); if(lim) list=list.slice(0,lim);
      if(!list.length){ el.innerHTML='<p class="empty">No products to show yet.</p>'; return; }
      el.innerHTML = list.map(function(p){return HC.card(p);}).join('');
    });
    document.querySelectorAll('[data-slides]').forEach(function(el){
      var ids=(el.getAttribute('data-slides')||'').split(',').map(function(s){return HC.find(s.trim());}).filter(Boolean);
      if(el.hasAttribute('data-cat')&&!ids.length) ids=HC.byCat(el.getAttribute('data-cat'));
      var ex=el.getAttribute('data-exclude'); if(ex) ids=ids.filter(function(p){return p.id!==ex;});
      el.innerHTML = ids.map(function(p){return '<div class="swiper-slide">'+HC.card(p)+'</div>';}).join('');
    });
    document.querySelectorAll('[data-count]').forEach(function(el){ el.textContent = HC.byCat(el.getAttribute('data-count')).length; });
  };
})();
