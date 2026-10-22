import {countries} from './data.js?v=20261022';

const regions = [
  ['Europe', 'europe', ['Germany','Spain','Italy','France','United Kingdom','Greece','Cyprus','Scandinavia','Eastern Europe']],
  ['Asia', 'asia', ['China','Japan','Korea','Thailand','Vietnam','India','Iran','Mediterranean (Levant examples)']],
  ['Africa', 'africa', ['West Africa','North Africa','Horn of Africa']],
  ['Americas', 'americas', ['United States','Canada','Mexico','Central America','Caribbean','Brazil','Argentina','Uruguay','Chile','Peru','Bolivia']]
];
const labels={'Mediterranean (Levant examples)':'Levant','United Kingdom':'United Kingdom','United States':'United States','Eastern Europe':'Eastern Europe','Central America':'Central America'};
const step=360/countries.length;
const polar=(r,a)=>{const t=(a-90)*Math.PI/180;return [380+r*Math.cos(t),380+r*Math.sin(t)]};
function arc(r,start,end){return `M ${polar(r,start)} A ${r} ${r} 0 ${end-start>180?1:0} 1 ${polar(r,end)}`;}
function wedge(inner,outer,start,end){return `${arc(outer,start,end)} L ${polar(inner,end)} A ${inner} ${inner} 0 ${end-start>180?1:0} 0 ${polar(inner,start)} Z`;}
const ordered=regions.flatMap(([region,tone,items])=>items.map(country=>({country,region,tone})));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;');
let sequence=0;
export function wheelMarkup(iconURL){
 const id=`flavor-${++sequence}`;
 let offset=0;
 const bands=regions.map(([region,tone,items])=>{
  const start=offset*step;offset+=items.length;const end=offset*step;
  const lower=(start+end)/2>90&&(start+end)/2<270;
  const textArc=lower?`M ${polar(215,end-2)} A 215 215 0 ${end-start>180?1:0} 0 ${polar(215,start+2)}`:arc(215,start+2,end-2);
  return `<path class="region-band ${tone}" d="${wedge(195,236,start+.6,end-.6)}"/><path id="${id}-${tone}" d="${textArc}" fill="none"/><text class="region-label" dy="4"><textPath href="#${id}-${tone}" startOffset="50%" text-anchor="middle">${region}</textPath></text>`;
 }).join('');
 return `<div class="flavor-orbit"><svg class="flavor-dial" viewBox="0 0 760 760" aria-label="Explore cuisines by country"><circle class="dial-paper" cx="380" cy="380" r="359"/>${bands}${ordered.map(({country,tone},i)=>{
  const start=i*step,mid=start+step/2,flip=mid>180;
  return `<g class="country-sector ${tone}" data-dial-country="${escape(country)}"><path data-wheel-country="${escape(country)}" data-sector="${i}" role="button" tabindex="0" aria-label="Explore ${escape(country)}" aria-pressed="false" d="${wedge(243,350,start+.45,start+step-.45)}"><title>${escape(country)}</title></path><g transform="rotate(${mid} 380 380)"><text class="country-label" transform="translate(380 84) rotate(${flip?90:-90})" text-anchor="middle" dominant-baseline="middle">${labels[country]||country}</text></g></g>`;
 }).join('')}<path class="dial-selection" d="${wedge(241,353,.4,step-.4)}" opacity="0"/><circle class="dial-center" cx="380" cy="380" r="180"/><image href="${iconURL}" x="341" y="284" width="78" height="78"/><text class="dial-center-label" x="380" y="399" text-anchor="middle">A world of flavor</text><text class="dial-center-detail" x="380" y="429" text-anchor="middle">31 countries &amp; regions</text><g class="dial-pointer"><circle cx="380" cy="20" r="5"/></g></svg></div>`;
}

const states=new WeakMap();
export function highlightWheel(country,animate=true){
 const index=ordered.findIndex(c=>c.country===country);
 document.querySelectorAll('.flavor-dial').forEach(dial=>{
  const active=index>=0;
  dial.querySelectorAll('.country-sector').forEach(g=>{const selected=g.dataset.dialCountry===country;g.classList.toggle('active',selected);g.querySelector('path').setAttribute('aria-pressed',selected);});
  dial.querySelector('.dial-center-label').textContent=active?(labels[country]||country):'A world of flavor';
  dial.querySelector('.dial-center-detail').textContent=active?'3 dishes to discover':'31 countries & regions';
  const ring=dial.querySelector('.dial-selection'),pointer=dial.querySelector('.dial-pointer');
  let state=states.get(dial)||{angle:0,frame:0};cancelAnimationFrame(state.frame);
  ring.style.opacity=active?'1':'0';pointer.style.opacity=active?'1':'0';
  if(!active){states.set(dial,state);return;}
  const target=index*step;const delta=((target-state.angle+540)%360)-180;
  const start=state.angle,time=performance.now();
  const reduce=!animate||document.body.classList.contains('still')||matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick(now){const progress=reduce?1:Math.min(1,(now-time)/520);const eased=1-Math.pow(1-progress,4);state.angle=start+delta*eased;ring.setAttribute('d',wedge(241,353,state.angle+.4,state.angle+step-.4));pointer.setAttribute('transform',`rotate(${state.angle+step/2} 380 380)`);if(progress<1)state.frame=requestAnimationFrame(tick);else state.angle=((target%360)+360)%360;}
  states.set(dial,state);state.frame=requestAnimationFrame(tick);
 });
}
