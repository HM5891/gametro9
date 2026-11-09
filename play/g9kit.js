/* Gametro9 game kit — shared by every game on the network.
   Gives each game: the "‹ Gametro9" home bar, a start screen with level picker,
   a game-over screen, toasts, saves on this phone, and a crisp canvas helper. */
(function(){
const css=`
.g9bar{position:relative;z-index:70;display:flex;align-items:center;justify-content:space-between;gap:10px;
  padding:calc(8px + env(safe-area-inset-top,0px)) max(14px,env(safe-area-inset-right,0px)) 8px max(14px,env(safe-area-inset-left,0px))}
.g9back{display:inline-flex;align-items:center;gap:4px;text-decoration:none;color:#14163a;background:#fff;border:2.5px solid #14163a;box-shadow:2px 2px 0 #14163a;
  border-radius:99px;padding:4px 12px 4px 8px;font:800 15px/1.2 'Bricolage Grotesque','Arial Black',system-ui,sans-serif}
.g9back svg{width:16px;height:16px}.g9back b{color:#f0412b}
.g9code{font:700 12.5px/1 'Overpass Mono',ui-monospace,monospace;letter-spacing:.06em;color:var(--g9-dim,#9aa0c8);display:flex;align-items:center;gap:6px;white-space:nowrap}
.g9code i{width:10px;height:10px;border-radius:50%;background:var(--g9-line,#f0412b);border:2px solid #14163a}
.g9ov{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(8,10,30,.72);
  padding-bottom:calc(20px + env(safe-area-inset-bottom,0px))}
.g9ov[hidden]{display:none}
.g9card{width:100%;max-width:400px;background:#fff;color:#14163a;border:3px solid #14163a;box-shadow:6px 6px 0 #14163a;border-radius:22px;overflow:hidden;
  font-family:'Figtree',system-ui,sans-serif;animation:g9in .25s ease-out}
@keyframes g9in{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
.g9card .hd{background:#14163a;color:#eef0ff;padding:16px 18px 14px}
.g9card .hd small{display:block;font:700 12px 'Overpass Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:#ffc929}
.g9card .hd h2{margin:6px 0 0;font:800 30px/1 'Bricolage Grotesque','Arial Black',sans-serif;letter-spacing:-.02em}
.g9card .hd p{margin:6px 0 0;color:#a4a9d6;font-weight:600;font-size:15px}
.g9card .bd{padding:14px 18px 18px}
.g9card .how{margin:0 0 12px;font-size:14.5px;color:#565a7e;line-height:1.45}
.g9card .lab{font:700 11.5px 'Overpass Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:#565a7e;margin:4px 0 6px}
.g9lv{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px}
.g9lv button{border:2.5px solid #d4d8f0;background:#fff;border-radius:12px;padding:9px 4px;font:800 15px 'Figtree',sans-serif;color:#14163a;cursor:pointer}
.g9lv button[aria-pressed="true"]{border-color:#14163a;background:#14163a;color:#fff;box-shadow:2px 2px 0 #f0412b}
.g9btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:14px;border:2.5px solid #14163a;box-shadow:3px 3px 0 #14163a;background:#f0412b;color:#fff;
  border-radius:14px;padding:13px;font:800 17px 'Figtree',sans-serif;cursor:pointer}
.g9btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #14163a}
.g9btn.alt{background:#fff;color:#14163a}
.g9best{margin-top:10px;font-size:13.5px;font-weight:700;color:#565a7e;text-align:center}
.g9stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:2px 0 4px}
.g9stats div{background:#f3f5ff;border-radius:12px;padding:10px;text-align:center}
.g9stats b{display:block;font:800 26px 'Bricolage Grotesque',sans-serif}
.g9stats span{font-size:12.5px;font-weight:700;color:#565a7e}
.g9toast{position:fixed;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translate(-50%,16px);z-index:60;background:#14163a;color:#fff;
  padding:9px 16px;border-radius:99px;font:700 14px 'Figtree',sans-serif;opacity:0;transition:.2s;pointer-events:none;max-width:calc(100% - 32px);text-align:center}
.g9toast.on{opacity:1;transform:translate(-50%,0)}
@media (prefers-reduced-motion:reduce){.g9card{animation:none}}`;
const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
if(!document.querySelector('link[href*="Bricolage"]')){ const l=document.createElement('link'); l.rel='stylesheet';
  l.href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Figtree:wght@500;600;700;800&family=Overpass+Mono:wght@700&display=swap'; document.head.appendChild(l); }

const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const G9={esc};
G9.load=(k,d)=>{ try{ const v=localStorage.getItem('g9-'+k); return v?JSON.parse(v):d; }catch(e){ return d; } };
G9.save=(k,v)=>{ try{ localStorage.setItem('g9-'+k,JSON.stringify(v)); }catch(e){} };
G9.bar=({code,line,color})=>{ const n=document.createElement('nav'); n.className='g9bar'; n.style.setProperty('--g9-line',color||'#f0412b');
  n.innerHTML=`<a class="g9back" href="../../" aria-label="Back to Gametro9 home"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Gametro<b>9</b></span></a><span class="g9code"><i></i>${esc(code)} · ${esc(line)}</span>`;
  document.body.prepend(n);
  n.querySelector('.g9back').addEventListener('click',e=>{ try{ if(document.referrer&&new URL(document.referrer).origin===location.origin&&history.length>1){ e.preventDefault(); history.back(); } }catch(x){} });
  return n; };
let tt; G9.toast=m=>{ let t=document.querySelector('.g9toast'); if(!t){ t=document.createElement('div'); t.className='g9toast'; t.setAttribute('role','status'); document.body.appendChild(t); }
  t.textContent=m; t.classList.add('on'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('on'),1800); };
function overlay(html){ let o=document.querySelector('.g9ov'); if(!o){ o=document.createElement('div'); o.className='g9ov'; o.setAttribute('role','dialog'); o.setAttribute('aria-modal','true'); document.body.appendChild(o); }
  o.innerHTML=`<div class="g9card">${html}</div>`; o.hidden=false; return o; }
G9.hide=()=>{ const o=document.querySelector('.g9ov'); if(o) o.hidden=true; };
/* start screen: {id,title,code,hook,how,levels:[..],modes:[{v,t}],best:fn(level)->text, onStart(level,mode)} */
G9.menu=cfg=>{ const last=G9.load(cfg.id+'-lv',cfg.levels&&cfg.levels[0]); let lv=cfg.levels&&cfg.levels.includes(last)?last:(cfg.levels||[])[0]; let md=cfg.modes?cfg.modes[0].v:'';
  const draw=()=>{ const o=overlay(`<div class="hd"><small>${esc(cfg.code)} · Station open</small><h2>${esc(cfg.title)}</h2><p>${esc(cfg.hook||'')}</p></div><div class="bd">
      <p class="how">${cfg.how||''}</p>
      ${cfg.modes?`<div class="lab">Play</div><div class="g9lv" data-k="md">${cfg.modes.map(m=>`<button aria-pressed="${m.v===md}" data-v="${esc(m.v)}">${esc(m.t)}</button>`).join('')}</div>`:''}
      ${cfg.levels&&cfg.levels.length>1?`<div class="lab" style="margin-top:10px">Level</div><div class="g9lv" data-k="lv">${cfg.levels.map(l=>`<button aria-pressed="${l===lv}" data-v="${esc(l)}">${esc(l)}</button>`).join('')}</div>`:''}
      <button class="g9btn" data-go>${esc(cfg.cta||'Play')}</button>
      ${cfg.best&&cfg.best(lv)?`<div class="g9best">${esc(cfg.best(lv))}</div>`:''}</div>`);
    o.querySelectorAll('.g9lv button').forEach(b=>b.onclick=()=>{ if(b.parentElement.dataset.k==='lv') lv=b.dataset.v; else md=b.dataset.v; draw(); });
    o.querySelector('[data-go]').onclick=()=>{ G9.save(cfg.id+'-lv',lv); G9.hide(); cfg.onStart(lv,md); }; };
  draw(); };
/* game over: {title,sub,stats:[[label,value],..],note,onRetry,onMenu} */
G9.over=c=>{ const o=overlay(`<div class="hd"><small>${esc(c.tag||'Trip over')}</small><h2>${esc(c.title)}</h2>${c.sub?`<p>${esc(c.sub)}</p>`:''}</div><div class="bd">
    ${c.stats?`<div class="g9stats">${c.stats.map(([k,v])=>`<div><b>${esc(v)}</b><span>${esc(k)}</span></div>`).join('')}</div>`:''}
    ${c.note?`<p class="how" style="margin:10px 0 0">${esc(c.note)}</p>`:''}
    <button class="g9btn" data-r>${esc(c.retry||'Play again')}</button><button class="g9btn alt" data-m>Change level</button></div>`);
  o.querySelector('[data-r]').onclick=()=>{ G9.hide(); c.onRetry(); }; o.querySelector('[data-m]').onclick=()=>c.onMenu(); };
/* crisp canvas that fills its box: returns {ctx,w,h} and keeps it sized */
G9.canvas=(cv,onResize)=>{ const ctx=cv.getContext('2d'); const S={ctx,w:0,h:0,dpr:1};
  const fit=()=>{ const r=cv.getBoundingClientRect(), d=Math.min(window.devicePixelRatio||1,2); S.w=r.width; S.h=r.height; S.dpr=d; cv.width=Math.round(r.width*d); cv.height=Math.round(r.height*d); ctx.setTransform(d,0,0,d,0,0); onResize&&onResize(S); };
  new ResizeObserver(fit).observe(cv); fit(); return S; };
G9.rand=(a,b)=>a+Math.random()*(b-a);
G9.pick=a=>a[Math.floor(Math.random()*a.length)];
G9.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
G9.vibrate=ms=>{ try{ navigator.vibrate&&navigator.vibrate(ms); }catch(e){} };
window.G9=G9;
})();
