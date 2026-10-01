// The landing page's interactions (gateway diagram, card deck, quiz preview, outcome cards,
// scroll reveals), scoped to the page root. Returns a cleanup that removes every window and
// document listener, timer and observer, so navigating away leaves nothing running.
/* eslint-disable */
// @ts-nocheck
export function initLanding(root: HTMLElement): () => void {
  const offs: Array<() => void> = []
  const winOn = (t, f, o?) => { window.addEventListener(t, f, o); offs.push(() => window.removeEventListener(t, f, o)) }
  const docOn = (t, f, o?) => { document.addEventListener(t, f, o); offs.push(() => document.removeEventListener(t, f, o)) }
  const every = (f, ms) => { const id = window.setInterval(f, ms); offs.push(() => window.clearInterval(id)); return id }
  const NativeIO = window.IntersectionObserver
  const IntersectionObserver = function (cb, opts) { const io = new NativeIO(cb, opts); offs.push(() => io.disconnect()); return io }
  const cleanup = () => offs.forEach((off) => off())

  ;(function () {
  
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    /* ── THE FIELD ───────────────────────────────────────────
       One piece of shared state for the whole page: which
       dimension is currently being read. The gateway, the hero
       card, the deck and the wallet all write to it; the ground,
       the hub ring and every card shadow read from it. It holds
       after you scroll away, so the page keeps the colour of the
       last thing you looked at. */
    var css = getComputedStyle(root);
    var DTOK = ['--d-oral','--d-sleep','--d-nutrition','--d-family','--d-longevity'];
    var DIM  = DTOK.map(function(t){ return css.getPropertyValue(t).trim(); });
    var BLUE = css.getPropertyValue('--blue').trim() || '#24A7E0';
    var fieldNow = BLUE;
  
    function setField(c){
      if(!c || c === fieldNow) return;
      fieldNow = c;
      root.style.setProperty('--dcur', c);
    }
    function setDim(i){ setField(DIM[i] || BLUE); }
    function colOf(el){
      var v = getComputedStyle(el).getPropertyValue('--dc').trim();
      return /^#|^rgb/.test(v) ? v : '';
    }
  
    /* ── GATEWAY ─────────────────────────────────────────── */
    var flows = [].slice.call(root.querySelectorAll('.flow'));
    flows.forEach(function(f,i){
      var p=f.querySelector('.path'), len=p.getTotalLength();
      if(!reduce){
        p.style.strokeDasharray=len; p.style.strokeDashoffset=len;
        p.style.transition='stroke-dashoffset .9s cubic-bezier(.4,.1,.2,1) '+(i*0.12)+'s, stroke .3s ease, stroke-width .3s ease';
      }
      var idx=+f.dataset.i;
      function on(){ flows.forEach(function(g){ g.classList.toggle('on', +g.dataset.i===idx); }); setDim(idx); }
      f.addEventListener('mouseenter',on); f.addEventListener('focus',on); f.addEventListener('click',on);
      f.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); on(); } });
    });
    /* the rings build outward from the mouth, each one bringing its line with it */
    var rings=[].slice.call(root.querySelectorAll('.ring'));
    if(!reduce) rings.forEach(function(r){
      var len=2*Math.PI*r.r.baseVal.value;
      r.style.strokeDasharray=len; r.style.strokeDashoffset=len;
      r.style.transform='rotate(-90deg)'; r.style.transformOrigin='185px 300px';
      r.style.transition='stroke-dashoffset 1.05s var(--ease-emph), opacity var(--t-out) var(--ease-exit), stroke-width var(--t-out) var(--ease-exit)';
    });
  
    var gwDrawn=false;
    function drawGw(){
      if(gwDrawn||reduce) return;
      var d=root.querySelector('.diagram'); if(!d) return;
      if(d.getBoundingClientRect().top < innerHeight*0.85){
        gwDrawn=true;
        rings.forEach(function(r,i){ setTimeout(function(){ r.style.strokeDashoffset=0; }, i*190); });
        flows.forEach(function(f,i){ setTimeout(function(){ f.querySelector('.path').style.strokeDashoffset=0; }, 300+i*190); });
      }
    }
  
    /* your mouth · your smile — the disc keeps changing its mind */
    var hub=root.querySelector('#hub'),
        hubnoun=root.querySelector('#hubnoun'),
        smile=root.querySelector('#smile'), smileLen=0, grinning=false;
    if(smile){
      smileLen=smile.getTotalLength();
      smile.style.strokeDasharray=smileLen; smile.style.strokeDashoffset=smileLen; smile.style.opacity=0;
    }
    function cycleHub(){
      if(!hub||reduce) return;
      hub.classList.add('swapping');
      setTimeout(function(){
        grinning=!grinning;
        hubnoun.textContent = grinning ? 'wellbeing' : 'mouth';
        hub.classList.remove('swapping');
        smile.style.opacity = grinning ? 1 : 0;
        smile.style.strokeDashoffset = grinning ? 0 : smileLen;
      },260);
    }
    if(!reduce) every(cycleHub, 4200);
  
    /* ── "ALREADY TALKING" SLIDER ────────────────────────── */
    var tslides=[].slice.call(root.querySelectorAll('.tslide'));
    if(tslides.length){
      var tdots=root.querySelector('#tdots'),
          tlabel=root.querySelector('#tlabel'),
          thead=root.querySelector('#talkhead'),
          tword=root.querySelector('#swapw'),
          tstage=root.querySelector('.talkstage'),
          ti=0, timg={};
      tslides.forEach(function(s){ timg[s.dataset.k]=root.querySelector('#i-'+s.dataset.k); });
      tslides.forEach(function(s,i){
        var b=document.createElement('button');
        b.className='tdot'; b.type='button'; b.setAttribute('role','tab');
        b.setAttribute('aria-selected', i===0?'true':'false');
        b.setAttribute('aria-label', s.dataset.k);
        b.dataset.go=i; tdots.appendChild(b);
      });
      function goTalk(n){
        ti=((n%tslides.length)+tslides.length)%tslides.length;
        var s=tslides[ti];
        tslides.forEach(function(x,i){ x.classList.toggle('on', i===ti); });
        Object.keys(timg).forEach(function(k){ if(timg[k]) timg[k].classList.toggle('on', k===s.dataset.k); });
        [].forEach.call(tdots.children,function(d,i){ d.setAttribute('aria-selected', String(i===ti)); });
        tlabel.textContent='0'+(ti+1)+' / 0'+tslides.length;
        setField(css.getPropertyValue(s.dataset.c).trim());
        thead.classList.add('out');
        setTimeout(function(){ tword.textContent=s.dataset.w; thead.classList.remove('out'); }, reduce?0:290);
      }
      root.querySelector('#tprev').addEventListener('click',function(){ goTalk(ti-1); });
      root.querySelector('#tnext').addEventListener('click',function(){ goTalk(ti+1); });
      tdots.addEventListener('click',function(e){ var b=e.target.closest('.tdot'); if(b) goTalk(+b.dataset.go); });
      winOn('keydown',function(e){
        if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight') return;
        var r=tstage.getBoundingClientRect();
        if(r.top>innerHeight*0.75||r.bottom<innerHeight*0.25) return;
        e.preventDefault(); goTalk(ti+(e.key==='ArrowRight'?1:-1));
      });
      var tx0=null;
      tstage.addEventListener('pointerdown',function(e){ tx0=e.clientX; });
      tstage.addEventListener('pointerup',function(e){
        if(tx0===null) return;
        var dxx=e.clientX-tx0; tx0=null;
        if(Math.abs(dxx)>60) goTalk(ti+(dxx<0?1:-1));
      });
    }
  
    /* ── THE DECK ────────────────────────────────────────── */
    var deck=root.querySelector('#deck');
    if(deck){
      var kards=[].slice.call(deck.querySelectorAll('.kard')),
          tabs=[].slice.call(root.querySelectorAll('.dtab')),
          N=kards.length, active=0, barsDone=false,
          dealt=reduce, dragging=false, x0=0, dx=0, tiltX=0, tiltY=0;
  
      // stash each ring's target arc so it can animate in on arrival
      kards.forEach(function(k){
        var fl=k.querySelector('.kring .fl');
        if(fl){ k._arc=fl.getAttribute('stroke-dasharray'); fl.setAttribute('stroke-dasharray','0 264'); }
      });
  
      function layout(){
        var prog = dragging ? Math.min(Math.abs(dx)/150,1) : 0;
        kards.forEach(function(k,i){
          var d=(i-active+N)%N, front=(d===0);
          k.classList.toggle('front',front);
          k.classList.toggle('behind',!front);
          k.classList.toggle('dragging',dragging&&front);
  
          var y,s,o,tx=0,rot=0,tilt='';
          if(!dealt){                       // pre-deal: squared-up stack
            y=0; s=1; o=0;
          } else if(front){
            y=0; s=1; o=1; tx=dx; rot=dx*0.035;
            if(!dragging&&!reduce) tilt=' rotateY('+tiltY+'deg) rotateX('+tiltX+'deg)';
          } else {
            var dd = d - (d===1?prog:0);    // next card rises as you drag
            y=28+(dd-1)*19; s=1-dd*0.038; o=d>4?0:1-dd*0.09;
          }
          k.style.transform='translateX(calc(-50% + '+tx+'px)) translateY('+y+'px) scale('+s+') rotate('+rot+'deg)'+tilt;
          k.style.opacity=o;
          k.style.zIndex=String(60-d);
          k.style.pointerEvents=d>4?'none':'auto';
          k.setAttribute('aria-hidden',front?'false':'true');
  
          var fl=k.querySelector('.kring .fl');
          if(fl&&k._arc) fl.setAttribute('stroke-dasharray', front?k._arc:'0 264');
        });
        tabs.forEach(function(t){ t.setAttribute('aria-selected',String(+t.dataset.go===active)); });
        if(active===0&&dealt) fillHome();
      }
      function go(i){
        kards.forEach(function(k){ k.classList.remove('flipped'); });   // a card you leave turns back over
        active=((i%N)+N)%N; dx=0; layout();
        setField(active===0 ? BLUE : DIM[active-1]);
      }
  
      /* turning a card over — capture phase, so it never reaches the card's own click */
      deck.addEventListener('click',function(e){
        var fb=e.target.closest&&e.target.closest('.flipbtn');
        if(!fb) return;
        e.stopPropagation(); e.preventDefault();
        var k=fb.closest('.kard');
        if(k&&k.classList.contains('front')) k.classList.toggle('flipped');
      },true);
  
      /* deal-in: fan the squared stack open, staggered */
      function deal(){
        if(dealt) return; dealt=true;
        kards.forEach(function(k,i){
          var d=(i-active+N)%N;
          k.style.transitionDelay=(d*0.075)+'s';
        });
        layout();
        setTimeout(function(){ kards.forEach(function(k){ k.style.transitionDelay=''; }); },1000);
        setTimeout(peek,900);
      }
  
      /* First landing: the top card turns over and comes back, so you learn there
         is a back without being told. Once per session. The listeners arm at deck
         setup, not inside peek() — otherwise an early tap loses the race and the
         demo fires on top of the person. */
      var peeked=false, acted=false, owned=false;
      function markActed(e){
        if(e&&e.target&&e.target.closest&&e.target.closest('.flipbtn')){ owned=true; return; }
        acted=true;
      }
      deck.addEventListener('pointerdown',markActed,true);
      tabs.forEach(function(t){ t.addEventListener('click',markActed); });
  
      function peek(){
        if(peeked||reduce||acted) return;
        peeked=true;
        var k=kards[active];
        if(!k||!k.classList.contains('flip')) return;
        setTimeout(function(){ if(!acted&&!owned) k.classList.add('flipped'); },500);
        setTimeout(function(){ if(!owned) k.classList.remove('flipped'); },2300);
      }
      var dealIO=new IntersectionObserver(function(es){
        es.forEach(function(en){ if(en.isIntersecting){ deal(); dealIO.disconnect(); } });
      },{threshold:.3});
      dealIO.observe(deck);
  
      /* selection */
      kards.forEach(function(k){
        k.addEventListener('click',function(){ if(Math.abs(dx)<6&&!k.classList.contains('front')) go(+k.dataset.i); });
      });
      tabs.forEach(function(t){ t.addEventListener('click',function(){ go(+t.dataset.go); }); });
      deck.querySelectorAll('.hrow').forEach(function(r){
        r.addEventListener('click',function(e){ e.stopPropagation(); go(+r.dataset.go); });
        r.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); e.stopPropagation(); go(+r.dataset.go); } });
      });
  
      /* keyboard, when the deck is on screen */
      winOn('keydown',function(e){
        if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight') return;
        var r=deck.getBoundingClientRect();
        if(r.top>innerHeight*0.8||r.bottom<innerHeight*0.2) return;
        e.preventDefault(); go(active+(e.key==='ArrowRight'?1:-1));
      });
  
      /* swipe / drag — the front card follows your finger */
      /* Capture only once a real drag begins. Capturing on pointerdown retargets the
         subsequent click to the deck, which silently ate every button and link on the
         front card — including "Get your score". */
      var pend=false, pid=null;
      deck.addEventListener('pointerdown',function(e){
        if(!dealt) return;
        if(e.target.closest&&e.target.closest('button,a')) return;   // controls stay controls
        pend=true; pid=e.pointerId; x0=e.clientX; dx=0;
      });
      deck.addEventListener('pointermove',function(e){
        if(pend&&!dragging&&Math.abs(e.clientX-x0)>6){
          dragging=true; deck.classList.add('grabbing');
          deck.setPointerCapture&&deck.setPointerCapture(pid);
        }
        if(dragging){ dx=e.clientX-x0; layout(); return; }
        if(reduce||!dealt) return;
        /* hold the tilt steady over a control. Otherwise the card keeps moving
           out from under the cursor and the button becomes impossible to hit. */
        if(e.target.closest&&e.target.closest('.flipbtn,.go')) return;
        var r=deck.getBoundingClientRect();               // idle parallax tilt
        tiltY=((e.clientX-(r.left+r.width/2))/r.width)*5;
        tiltX=-((e.clientY-(r.top+r.height/2))/r.height)*3.5;
        layout();
      });
      deck.addEventListener('pointerleave',function(){
        if(dragging) return; tiltX=0; tiltY=0; layout();
      });
      function endDrag(){
        pend=false;
        if(!dragging) return;
        var moved=dx; dragging=false; deck.classList.remove('grabbing');
        if(Math.abs(moved)>70){ go(active+(moved<0?1:-1)); }
        else { dx=0; layout(); }
        setTimeout(function(){ dx=0; },50);
      }
      deck.addEventListener('pointerup',endDrag);
      deck.addEventListener('pointercancel',endDrag);
  
      function fillHome(){
        if(barsDone) return; barsDone=true;
        deck.querySelectorAll('.hf').forEach(function(el,i){
          setTimeout(function(){ el.style.width=el.dataset.w+'%'; }, reduce?0:260+i*95);
        });
      }
      layout();
      if(reduce) deal();
    }
  
    /* ── THE FOUR LENSES — one card, read four ways ──────── */
    var lenses=[].slice.call(root.querySelectorAll('.lens')),
        lcards=[].slice.call(root.querySelectorAll('.lcard'));
    if(lenses.length){
      var li=0;
      function goLens(n){
        li=((n%lenses.length)+lenses.length)%lenses.length;
        lenses.forEach(function(b,i){ b.classList.toggle('on',i===li); b.setAttribute('aria-selected',String(i===li)); });
        lcards.forEach(function(c,i){ c.classList.toggle('on',i===li); });
      }
      lenses.forEach(function(b){
        b.addEventListener('click',function(){ goLens(+b.dataset.l); });
        b.addEventListener('pointerenter',function(){ goLens(+b.dataset.l); });
      });
      var lstage=root.querySelector('.lensgrid');
      winOn('keydown',function(e){
        if(e.key!=='ArrowUp'&&e.key!=='ArrowDown') return;
        var r=lstage.getBoundingClientRect();
        if(r.top>innerHeight*0.7||r.bottom<innerHeight*0.3) return;
        e.preventDefault(); goLens(li+(e.key==='ArrowDown'?1:-1));
      });
    }
  
    /* ── HERO CARD ───────────────────────────────────────── */
    function fillHero(){
      root.querySelectorAll('.idcard .fill').forEach(function(el,i){
        setTimeout(function(){ el.style.width=el.dataset.w+'%'; }, reduce?0:260+i*110);
      });
    }
  
    /* the card sits in the light, and turns a little toward you */
    var idcard=root.querySelector('.idcard'), idstage=root.querySelector('.idstage');
    if(idcard&&idstage&&!reduce){
      idstage.addEventListener('pointermove',function(e){
        var r=idcard.getBoundingClientRect();
        var ry=((e.clientX-(r.left+r.width/2))/r.width)*6.5;
        var rx=-((e.clientY-(r.top+r.height/2))/r.height)*5;
        idcard.style.transitionDuration='var(--t-in)';
        idcard.style.transform='rotateY('+ry+'deg) rotateX('+rx+'deg)';
      });
      idstage.addEventListener('pointerleave',function(){
        idcard.style.transitionDuration='var(--t-out)';
        idcard.style.transform='';
      });
    }
  
    /* every dimension name on the page writes to the field */
    root.querySelectorAll('.idrow').forEach(function(r,i){
      r.addEventListener('pointerenter',function(){ setDim(i); });
    });
    root.querySelectorAll('.hrow').forEach(function(r){
      r.addEventListener('pointerenter',function(){ setDim(+r.dataset.go-1); });
    });
    root.querySelectorAll('.wrow').forEach(function(r){
      r.addEventListener('pointerenter',function(){ setField(colOf(r)); });
    });
  
    /* ── TRY IT — three live questions ─────────────────────────────── */
    (function(){
      var stage=root.querySelector('#qstage');
      if(!stage) return;
      var panels=[].slice.call(stage.querySelectorAll('.qpanel')),
          card=root.querySelector('#livecard'),
          num=root.querySelector('#livenum'),
          cap=root.querySelector('#livecap'),
          tag=root.querySelector('#livetag'),
          lever=root.querySelector('#livelever'),
          cont=root.querySelector('#qcontinue'),
          rows={}, ans={}, at=0;
      card.querySelectorAll('.idrow').forEach(function(r){ rows[r.dataset.dim]=r; });
  
      var CAPS=['Answer the first question and this starts filling in.',
                'Oral health, opening up. Two more and the airway comes in.',
                'Two of eight oral items in. One more question.',
                'Two dimensions started. Three still dark.'];
  
      function show(i){
        at=i;
        panels.forEach(function(p,n){ p.classList.toggle('on', n===i); });
        var d=panels[i].dataset.dim;
        if(d) setDim(['oral','sleep','nutrition','family','longevity'].indexOf(d));
        else setField(BLUE);
        cap.textContent = CAPS[Math.min(i,3)];
      }
  
      function paint(dim,val){
        var r=rows[dim]; if(!r) return;
        r.classList.remove('ghost');
        r.querySelector('.rs').textContent=Math.round(val);
        var f=r.querySelector('.fill');
        // force a reflow so the width transition actually runs on first paint
        f.getBoundingClientRect();
        f.style.width=Math.round(val)+'%';
      }
  
      function countTo(target){
        var from = parseInt(num.textContent,10); if(isNaN(from)) from=0;
        if(reduce){ num.textContent=Math.round(target); return; }
        var t0=null, dur=700;
        requestAnimationFrame(function step(ts){
          if(t0===null) t0=ts;
          var k=Math.min((ts-t0)/dur,1), e=1-Math.pow(1-k,3);
          num.textContent=Math.round(from+(target-from)*e);
          if(k<1) requestAnimationFrame(step);
        });
      }
  
      function recompute(){
        var oral=[], sleep=[];
        if(ans[0]!=null) oral.push(ans[0]);
        if(ans[1]!=null) oral.push(ans[1]);
        if(ans[2]!=null) sleep.push(ans[2]);
        var avg=function(a){ return a.reduce(function(x,y){return x+y;},0)/a.length; };
        var parts=[];
        if(oral.length){ var o=avg(oral); paint('oral',o); parts.push(o); }
        if(sleep.length){ var sl=avg(sleep); paint('sleep',sl); parts.push(sl); }
        if(parts.length){ tag.textContent='Preview'; num.classList.remove('pending'); countTo(avg(parts)); }
        if(oral.length===2 && sleep.length===1){
          var o2=avg(oral), s2=avg(sleep);
          var low = s2 <= o2 ? {n:'Sleep & airway', v:s2} : {n:'Oral health', v:o2};
          lever.innerHTML='<b>Lowest so far: '+low.n+', '+Math.round(low.v)+'.</b> '+
            'On the full assessment this is the line the plan would open on.';
          card.classList.add('settled');
          if(cont) cont.setAttribute('href','/primary-id/?preview='+
            encodeURIComponent([ans[0],ans[1],ans[2]].join(',')));
        }
      }
  
      stage.addEventListener('click',function(e){
        var b=e.target.closest('.qback');
        if(b){
          var to=+b.dataset.back;
          if(to===0){ ans={}; card.classList.remove('settled'); lever.innerHTML='';
            num.textContent='··'; num.classList.add('pending'); tag.textContent='In progress';
            card.querySelectorAll('.idrow').forEach(function(r){
              r.classList.add('ghost'); r.querySelector('.rs').innerHTML='&mdash;';
              r.querySelector('.fill').style.width='0'; });
            panels.forEach(function(p){ p.querySelectorAll('.qopt').forEach(function(o){ o.classList.remove('picked'); }); });
            if(cont) cont.setAttribute('href','/primary-id/');
          }
          show(to); return;
        }
        var o=e.target.closest('.qopt');
        if(!o) return;
        var panel=o.closest('.qpanel'), qi=+panel.dataset.q;
        panel.querySelectorAll('.qopt').forEach(function(x){ x.classList.toggle('picked', x===o); });
        ans[qi]=+o.dataset.s;
        recompute();
        setTimeout(function(){ if(at===qi) show(Math.min(qi+1, panels.length-1)); }, reduce?0:420);
      });
    })();
  
    /* ── OUTCOME CARDS ─────────────────────────────────────────────── */
    (function(){
      var cards=[].slice.call(root.querySelectorAll('.oc'));
      if(!cards.length) return;
      var openCard=null;
  
      // --dc is set to var(--blue) etc, so reading the custom property gives the
      // token text, not a colour. Read a child that actually paints with it.
      function tint(card){
        var probe=card.querySelector('.ocroot');
        return probe ? getComputedStyle(probe).color : '';
      }
      function shut(card){
        if(!card) return;
        card.classList.remove('open');
        var b=card.querySelector('.ocopen');
        if(b) b.setAttribute('aria-expanded','false');
        if(openCard===card) openCard=null;
        setField(BLUE);
      }
      function open(card){
        if(openCard && openCard!==card) shut(openCard);
        card.classList.add('open');
        var b=card.querySelector('.ocopen');
        if(b) b.setAttribute('aria-expanded','true');
        openCard=card;
        setField(tint(card) || BLUE);
      }
  
      cards.forEach(function(card){
        var btn=card.querySelector('.ocopen'), x=card.querySelector('.ocshut');
        if(btn) btn.addEventListener('click',function(){
          card.classList.contains('open') ? shut(card) : open(card);
        });
        if(x) x.addEventListener('click',function(e){ e.stopPropagation(); shut(card); });
        // hover tints the field only while nothing is pinned open
        card.addEventListener('mouseenter',function(){ if(!openCard) setField(tint(card)||BLUE); });
        card.addEventListener('mouseleave',function(){ if(!openCard) setField(BLUE); });
      });
  
      docOn('keydown',function(e){
        if(e.key==='Escape' && openCard){
          var b=openCard.querySelector('.ocopen'); shut(openCard); if(b) b.focus();
        }
      });
      docOn('click',function(e){
        if(openCard && !e.target.closest('.oc')) shut(openCard);
      });
    })();
  
    if(reduce){
      root.querySelectorAll('.reveal').forEach(function(e){e.style.opacity=1;e.style.transform='none';});
      fillHero(); return;
    }
  
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){
          en.target.style.transition='opacity .6s var(--ease-enter), transform .6s var(--ease-enter)';
          en.target.style.opacity=1; en.target.style.transform='none';
          io.unobserve(en.target);
        }
      });
    },{threshold:.14});
    root.querySelectorAll('.reveal').forEach(function(e){ io.observe(e); });
    root.querySelectorAll('.hero .reveal').forEach(function(e,i){ e.style.transitionDelay=(i*0.09)+'s'; });
  
    fillHero();
    drawGw(); winOn('scroll',drawGw,{passive:true});
  
  
  })()

  return cleanup
}
