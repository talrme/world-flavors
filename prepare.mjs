import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import sharp from '/Users/talg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs';
const root=new URL('.',import.meta.url);
const names=['Field Notes','Supper Club','Flavor Passport','The Flavor Wheel','Kitchen Counter'];
await sharp('/Users/talg/Downloads/PXL_20261022_053616883 (1).jpg').rotate().resize({width:1824,withoutEnlargement:true}).webp({quality:88}).toFile(fileURLToPath(new URL('assets/flavor-wheel.webp',root)));
const bowl=await sharp(fileURLToPath(new URL('assets/food-source.svg',root)),{density:500}).resize(382,382).png().toBuffer();
const app=await sharp({create:{width:512,height:512,channels:4,background:'#edf4e9'}}).composite([{input:bowl,left:65,top:65}]).png().toBuffer();
await fs.writeFile(new URL('assets/food-icon.png',root),app);
for(const size of [32,180,192])await sharp(app).resize(size,size).png().toFile(fileURLToPath(new URL(`assets/food-${size}.png`,root)));
for(let i=1;i<=5;i++){
 const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>World Flavors · ${names[i-1]}</title><meta name="description" content="93 dishes, 31 countries and regions. Easy home cooking, Instant Pot and slow-cooker recipes, and extraordinary takeout."><meta name="theme-color" content="#fbfcfa"><meta name="apple-mobile-web-app-title" content="World Flavors"><link rel="icon" href="../assets/food-32.png" type="image/png"><link rel="apple-touch-icon" href="../assets/food-180.png"><link rel="manifest" href="manifest.webmanifest"><link rel="stylesheet" href="../shared/styles.css"></head><body data-variant="${i}" data-theme="original"><div id="app"><p class="load-error">Opening the menu…</p></div><script src="../shared/lucide.min.js"></script><script type="module" src="../shared/app.js"></script></body></html>`;
 await fs.writeFile(new URL(`staging-${i}/index.html`,root),html);
 await fs.writeFile(new URL(`staging-${i}/manifest.webmanifest`,root),JSON.stringify({name:'World Flavors',short_name:'World Flavors',id:`./`,start_url:'./',scope:'./',display:'standalone',background_color:'#fbfcfa',theme_color:'#31734b',icons:[{src:'../assets/food-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'../assets/food-icon.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]},null,2));
}
console.log('Prepared five pages, five install manifests, compressed wheel and four PNG icons.');
