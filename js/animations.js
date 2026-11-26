/* GSAP + ScrollTrigger + Lenis.
   Rules: layout is fixed by CSS first; motion only changes opacity/transform/clip-path. Everything is optional:
   no JS / no GSAP / reduced motion => content is visible and native scroll is used. */
(function(){
  var HC = window.HC = window.HC || {};
  HC.initAnimations=function(){
    if(HC._anim) return; HC._anim=true;                       // never initialise twice
    var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(typeof gsap==='undefined'||reduce) return;
    var hasST=typeof ScrollTrigger!=='undefined';
    if(hasST) gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('gsap-on');

    // ---- Lenis: one instance, driven by the GSAP ticker; touch keeps native scrolling ----
    if(typeof Lenis!=='undefined' && !HC.lenis){
      try{
        var lenis=HC.lenis=new Lenis({duration:1.05,smoothWheel:true,syncTouch:false,anchors:true});
        if(hasST) lenis.on('scroll',ScrollTrigger.update);
        gsap.ticker.add(function(t){ lenis.raf(t*1000); });
        gsap.ticker.lagSmoothing(0);
        if(document.documentElement.classList.contains('is-locked')) lenis.stop();
      }catch(err){ HC.lenis=null; }
    }

    // ---- Hero intro (opacity / transform / clip-path only; box size never changes) ----
    if(document.querySelector('.hero')){
      var tl=gsap.timeline({defaults:{ease:'power3.out'},delay:.1});
      tl.to('.hero-img',{clipPath:'inset(0 0 0 0%)',duration:1.3,ease:'expo.inOut'},0)
        .fromTo('.hero-img img',{scale:1.2},{scale:1,duration:2,ease:'power2.out'},0)
        .to('.hero .eyebrow',{opacity:1,duration:.7},.3)
        .fromTo('.hero h1 .ln>span',{y:'110%'},{y:'0%',duration:1,stagger:.12},.4)
        .to('.hero .lead',{opacity:1,duration:.8},.9)
        .to('.hero-cta',{opacity:1,duration:.8},1)
        .to('.hero-tag',{opacity:1,duration:.8},1.3);
    }
    gsap.utils.toArray('.phero h1, .c-info h1').forEach(function(h){ gsap.fromTo(h,{y:30,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',delay:.1}); });

    if(!hasST){ gsap.set('[data-reveal],[data-stagger]>*',{opacity:1,y:0}); gsap.set('[data-mask]',{clipPath:'none'}); return; }

    // ---- Scroll reveals (fire once; generous start so nothing stays hidden) ----
    gsap.utils.toArray('[data-reveal]').forEach(function(el){
      gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
    });
    gsap.utils.toArray('[data-stagger]').forEach(function(wrap){
      gsap.to(wrap.children,{opacity:1,y:0,duration:.8,stagger:{each:.07,amount:.7},ease:'power3.out',scrollTrigger:{trigger:wrap,start:'top 92%',once:true}});
    });
    gsap.utils.toArray('[data-mask]').forEach(function(el){
      gsap.to(el,{clipPath:'inset(0 0 0% 0)',duration:1.2,ease:'expo.inOut',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
    });

    // Layout can change after fonts / lazy images settle: refresh once, debounced.
    var t; var refresh=function(){ clearTimeout(t); t=setTimeout(function(){ ScrollTrigger.refresh(); },150); };
    window.addEventListener('load',refresh);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('orientationchange',refresh);
    // Safety net: anything still hidden long after load is revealed instead of left invisible.
    setTimeout(function(){ document.querySelectorAll('[data-reveal],[data-stagger]>*').forEach(function(el){
      var r=el.getBoundingClientRect(); if(r.top<innerHeight&&r.bottom>0&&parseFloat(getComputedStyle(el).opacity)===0) gsap.to(el,{opacity:1,y:0,duration:.5});
    }); },4000);
  };
})();
