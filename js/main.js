(function(){
  // menu mobilne
  var b=document.querySelector('.burger'),n=document.getElementById('menu');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';});}

  // przeciąganie myszą pasów i galerii
  document.querySelectorAll('.pas,.galeria').forEach(function(el){
    var x0,s0,ruch=false,wcisniety=false;
    el.addEventListener('mousedown',function(e){wcisniety=true;ruch=false;x0=e.pageX;s0=el.scrollLeft;});
    window.addEventListener('mousemove',function(e){if(!wcisniety)return;var d=e.pageX-x0;if(Math.abs(d)>5){ruch=true;el.classList.add('ciagniety');}if(ruch){el.scrollLeft=s0-d;e.preventDefault();}});
    window.addEventListener('mouseup',function(){if(!wcisniety)return;wcisniety=false;el.classList.remove('ciagniety');});
    el.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false;}},true);
    el.addEventListener('dragstart',function(e){e.preventDefault();});
  });
  document.querySelectorAll('.nawig-pasa').forEach(function(nv){
    var p=document.getElementById(nv.dataset.pas);if(!p)return;
    nv.querySelectorAll('button').forEach(function(bt){bt.addEventListener('click',function(){var k=p.firstElementChild;var w=k?k.getBoundingClientRect().width+20:300;p.scrollBy({left:(bt.dataset.k==='n'?1:-1)*w,behavior:'smooth'});});});
  });

  // podgląd zdjęć
  var lb=document.querySelector('.lb');
  if(lb){
    var im=lb.querySelector('img'),lista=[],i=0;
    function pokaz(){im.src=lista[i].dataset.duze;im.alt=lista[i].querySelector('img').alt;}
    document.querySelectorAll('[data-duze]').forEach(function(t){
      t.addEventListener('click',function(){var g=t.closest('[data-grupa]');lista=Array.prototype.slice.call((g||document).querySelectorAll('[data-duze]'));i=lista.indexOf(t);pokaz();lb.classList.add('on');document.body.style.overflow='hidden';lb.querySelector('.x').focus();});
    });
    function zamknij(){lb.classList.remove('on');document.body.style.overflow='';im.src='';}
    lb.querySelector('.x').addEventListener('click',zamknij);
    lb.querySelector('.pop').addEventListener('click',function(){i=(i-1+lista.length)%lista.length;pokaz();});
    lb.querySelector('.nast').addEventListener('click',function(){i=(i+1)%lista.length;pokaz();});
    lb.addEventListener('click',function(e){if(e.target===lb)zamknij();});
    document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')zamknij();if(e.key==='ArrowLeft')lb.querySelector('.pop').click();if(e.key==='ArrowRight')lb.querySelector('.nast').click();});
    var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;},{passive:true});
    lb.addEventListener('touchend',function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50){(d<0?lb.querySelector('.nast'):lb.querySelector('.pop')).click();}tx=null;});
  }

  // mapa Google ładowana przy przewinięciu
  var m=document.querySelector('.mapa[data-src]');
  if(m){
    var wstaw=function(){if(m.querySelector('iframe'))return;var f=document.createElement('iframe');f.src=m.dataset.src;f.title='Mapa dojazdu: Słutowo 11, 73-210 Recz';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';f.allowFullscreen=true;m.appendChild(f);};
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(w){if(w[0].isIntersecting){wstaw();io.disconnect();}},{rootMargin:'300px'});io.observe(m);}else wstaw();
  }

  // formularz w wersji podglądowej
  document.querySelectorAll('form.form').forEach(function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var i=f.querySelector('.info');if(i){i.classList.add('on');i.focus();}});
  });

  // pasek telefonu po przewinięciu (telefony)
  var pt=document.querySelector('.pasek-tel');
  if(pt){var spr=function(){pt.classList.toggle('on',window.scrollY>window.innerHeight*.7);};var t=false;window.addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(function(){spr();t=false;});}},{passive:true});}

  // zgody cookies
  var c=document.querySelector('.cookies');
  function zapisz(v){try{localStorage.setItem('zgoda-cookies',JSON.stringify({v:v,t:Date.now()}));}catch(e){}if(c)c.hidden=true;}
  if(c){
    c.querySelector('.tak').addEventListener('click',function(){zapisz('wszystkie');});
    c.querySelector('.nie').addEventListener('click',function(){zapisz('niezbedne');});
  }
  document.querySelectorAll('.ust-cookies').forEach(function(x){x.addEventListener('click',function(){if(c)c.hidden=false;});});
})();
