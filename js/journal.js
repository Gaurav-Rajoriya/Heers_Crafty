/* The Heer's Edit: editorial articles (original copy) + list/article rendering. */
(function(){
  var HC = window.HC = window.HC || {};
  var CATS = {bedroom:'Bedroom & Textile Inspiration', fashion:'Fashion & Everyday Style', candles:'Candle Styling & Gifting', decor:'Home Decor & Living Spaces'};
  HC.JOURNAL_CATS = CATS;
  var A = [
   {id:'a-calm-bedroom-starts-with-the-bed', cat:'bedroom', title:'A calm bedroom starts with the bed', cover:['jaipuri-mandala',0],
    intro:'The bed is the largest surface in the room, so the print you choose on it quietly sets the mood for everything else.',
    sections:[
     {h:'Let one pattern lead',p:['Printed bedsheets do a lot of talking. A bold medallion or a border design can anchor a bedroom on its own, so it helps to keep the rest of the room \u2013 walls, curtains, rugs \u2013 simple and let the bedsheet be the focal point.','If you love a busier print, look at where the pattern sits. All-over repeats feel relaxed and even; designs with a defined border or a central motif feel more composed and \u201Cdressed\u201D.']},
     {h:'Borrow colours from the room',p:['Hold a photo of your bedroom next to the colourways you like. A wooden bedside table, a cane headboard or a woven rug already carries warm tones, and many printed sets look settled when they echo one of them.','Several of our bedsheet designs are shown in more than one colourway, which makes it easier to compare how a single pattern behaves in softer or deeper tones.']},
     {h:'Do not forget the pillow covers',p:['Matching pillow covers pull the bed together at a glance. If you are enquiring about a set, mention how many pillows you usually use so we can help you with the right details.']}],
    products:['jaipuri-mandala','jaipuri-print-cotton-king-size','jaipuri-floral-stem']},
   {id:'everyday-style-in-printed-kurta-sets', cat:'fashion', title:'Everyday style, in print', cover:['womens-navy-blue',0],
    intro:'A printed kurta set or a tiered dress can carry an outfit by itself. The trick is knowing what to leave out.',
    sections:[
     {h:'Let the print do the work',p:['When the fabric already has a strong pattern, accessories can stay quiet. A pair of simple earrings and neutral footwear, as in many of our catalogue photographs, keeps attention on the garment.','A kurta, pant and dupatta set is a complete outfit in one go, which makes dressing for a busy day much easier.']},
     {h:'Think about the occasion',p:['Deeper shades such as maroon and navy tend to feel dressier, while a yellow floral or a light patchwork print feels more relaxed. Neither is a rule \u2013 it is simply a useful starting point when you are choosing.','Tiered dresses move beautifully and are easy to wear for a casual outing, which is why they appear so often in our clothing collection.']},
     {h:'Ask before you decide',p:['If you would like to know about available sizes or colours for a particular piece, send us an enquiry from its product page and we will be happy to help.']}],
    products:['womens-navy-blue','womens-cotton-printed-kurta','printed-tiered-dress-in-yellow']},
   {id:'candle-styling-and-gifting-ideas', cat:'candles', title:'Candle styling and gifting ideas', cover:['seashell-gel',0],
    intro:'A candle can be a centrepiece, a gift or a small finishing touch. Here is how to think about each.',
    sections:[
     {h:'Group candles in odd numbers',p:['A set of three candles at different heights almost always looks intentional. Place them on a tray so the arrangement reads as one group and is easy to move.','Mixing shapes \u2013 a flower-shaped candle beside a gel candle in glass, for example \u2013 adds interest without needing extra decoration.']},
     {h:'Match the candle to the moment',p:['Terracotta diya candles suit festive tables. A candle in glass with a floating flower looks lovely on a dining table or a bedside shelf. Seasonal designs, like our Christmas gel candle, make easy gifts.','Always burn candles on a stable, heat-safe surface and never leave a flame unattended.']},
     {h:'Gifting',p:['Candles travel well as gifts because they suit almost any home. If you are choosing for someone else, think about their room first \u2013 a bright festive piece for a living area, something softer for a bedroom.']}],
    products:['floral-wax-filled','melting-night-lavender','christmas-gel']},
   {id:'styling-living-spaces-with-resin-decor', cat:'decor', title:'Styling living spaces with resin and decorative d\u00e9cor', cover:['handmade-epoxy-resin-geode',0],
    intro:'Wall clocks, trays and side tables are the quiet workhorses of a room. Chosen well, they give a space its character.',
    sections:[
     {h:'Start with the wall',p:['A statement wall clock is both useful and decorative. Geode-style designs bring deep colour and a little drama, while the tree of life and evil-eye designs have a more symbolic feel.','Leave breathing room around it \u2013 one strong piece on a plain wall usually looks better than several competing ones.']},
     {h:'Use trays to organise small things',p:['A decorative tray gathers keys, candles or small keepsakes into one tidy spot. Seashell-shaped trinket trays suit a dressing table or entryway shelf.']},
     {h:'Add one surface piece',p:['A resin side table or coffee table can become the centre of a seating area. Keep the styling simple on top \u2013 a candle and a small plant are enough.']}],
    products:['handmade-epoxy-resin-geode','seashell-trinket','resin-ocean-side']}
  ];
  A.forEach(function(a){ a.slug=a.id; });
  HC.articles=A;
  var e=HC.esc;
  function cover(a){ var p=HC.find(a.cover[0]); return p?p.images[a.cover[1]]:null; }
  function card(a){ var c=cover(a); return '<article class="story-card" data-cat="'+a.cat+'"><a class="m" href="article.html?a='+a.id+'" tabindex="-1" aria-hidden="true">'+(c?'<img src="'+c.src+'" alt="" loading="lazy" width="'+c.w+'" height="'+c.h+'">':'')+'</a><span class="tagline">'+e(CATS[a.cat])+'</span><h3><a href="article.html?a='+a.id+'">'+e(a.title)+'</a></h3><p>'+e(a.intro)+'</p><a class="link-arrow" href="article.html?a='+a.id+'">Read more '+HC.icon('arrow')+'</a></article>'; }
  HC.initJournal=function(){
    var pv=document.getElementById('edit-prev'); if(pv) pv.innerHTML=A.slice(0,3).map(card).join('');
    var ft=document.getElementById('j-feature');
    if(ft){ var a=A[0], c=cover(a); ft.classList.add('on-dark'); ft.innerHTML='<div class="frame"><img src="'+c.src+'" alt="'+e(a.title)+'" width="'+c.w+'" height="'+c.h+'"></div><div class="body"><span class="eyebrow">Featured story</span><h2>'+e(a.title)+'</h2><p class="lead">'+e(a.intro)+'</p><a class="btn btn-primary" href="article.html?a='+a.id+'">Read More</a></div>'; }
    var ls=document.getElementById('j-list');
    if(ls){
      var chips=document.getElementById('j-chips');
      chips.innerHTML='<button class="chip" aria-pressed="true" data-f="all">All stories</button>'+Object.keys(CATS).map(function(k){return '<button class="chip" aria-pressed="false" data-f="'+k+'">'+e(CATS[k])+'</button>';}).join('');
      var draw=function(f){ ls.innerHTML=A.filter(function(a){return f==='all'||a.cat===f;}).map(card).join(''); };
      draw('all');
      chips.addEventListener('click',function(ev){ var b=ev.target.closest('.chip'); if(!b) return; chips.querySelectorAll('.chip').forEach(function(x){x.setAttribute('aria-pressed',x===b);}); draw(b.dataset.f); });
    }
    var root=document.getElementById('article-root');
    if(root){
      var id=new URLSearchParams(location.search).get('a'), art=A.filter(function(x){return x.id===id;})[0];
      if(!art){ document.title='Story not found \u2013 The Heer\u2019s Edit'; root.innerHTML='<div class="wrap empty"><h1>We couldn\u2019t find that story.</h1><a class="btn btn-primary" href="journal.html">Back to The Heer\u2019s Edit</a></div>'; return; }
      var cv=cover(art);
      document.title=art.title+' | The Heer\u2019s Edit \u2013 Heer\u2019s-crafty';
      var m=document.querySelector('meta[name=description]'); if(m) m.setAttribute('content',art.intro);
      var og=document.querySelector('meta[property="og:title"]'); if(og) og.setAttribute('content',art.title+' | The Heer\u2019s Edit');
      var prods=art.products.map(function(s){return HC.find(s);}).filter(Boolean);
      var related=A.filter(function(x){return x.id!==art.id;}).slice(0,2);
      root.innerHTML='<div class="wrap"><div class="article"><nav class="crumbs" aria-label="Breadcrumb"><a href="journal.html">The Heer\u2019s Edit</a> / '+e(CATS[art.cat])+'</nav><span class="eyebrow">'+e(CATS[art.cat])+'</span><h1>'+e(art.title)+'</h1><p class="lead">'+e(art.intro)+'</p>'+
        '<div class="cover" data-mask><img src="'+cv.src+'" alt="'+e(art.title)+'" width="'+cv.w+'" height="'+cv.h+'"></div>'+
        art.sections.map(function(s){return '<h2>'+e(s.h)+'</h2>'+s.p.map(function(t){return '<p>'+e(t)+'</p>';}).join('');}).join('')+'</div></div>'+
        '<section class="section"><div class="wrap"><div class="sec-head"><h2>From the collection</h2></div><div class="pgrid">'+prods.map(function(p){return HC.card(p);}).join('')+'</div></div></section>'+
        '<section class="section tint-sage"><div class="wrap"><div class="sec-head"><h2>More stories</h2><a class="link-arrow" href="journal.html">All stories '+HC.icon('arrow')+'</a></div><div class="j-grid">'+related.map(card).join('')+'</div></div></section>';
    }
  };
})();
