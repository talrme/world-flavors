import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const failures=[];const checks=[];
function assert(condition,message){if(!condition)throw new Error(message)}
await fs.mkdir(new URL('test-results/',root),{recursive:true});
async function close(page){await page.keyboard.press('Escape');await page.waitForTimeout(220);}
async function run(variant,mobile){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},isMobile:mobile,hasTouch:mobile});
 const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(`http://127.0.0.1:5178/world-flavors/staging-${variant}/`);
 await page.locator('[data-open]').first().waitFor();
 assert((await page.locator('#result-count').textContent()).startsWith('93'),'93 dishes initially');
 assert(await page.locator('[data-open]').count()===24,'24 initial dishes');
 let width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
 assert(width.scroll<=width.width+1,`Horizontal overflow ${JSON.stringify(width)}`);
 await page.locator('[data-action="more"]').click();assert(await page.locator('[data-open]').count()===48,'Pagination shows 48');
 await page.locator('#search').fill('carnitas');assert(await page.locator('[data-open]').count()===1,'Search returns carnitas');
 await page.locator('[data-open]').click();await page.locator('#dish-note').fill('Try with Sophie. Extra lime.');
 await page.locator('.detail-choices [data-save]').click();await page.locator('[data-tried]').click();
 const recipe=await page.locator('.recipe-link').getAttribute('href');assert(recipe.includes('recipetineats.com/pork-carnitas'),'Recipe is a real dish URL');
 await page.mouse.click(4,4);await page.waitForTimeout(220);assert(await page.locator('#modal').isHidden(),'Outside closes dish modal');
 await page.locator('#search').fill('');await page.locator('[data-view="saved"]').click();assert(await page.locator('[data-open]').count()===1,'Saved dishes work');
 await page.reload();await page.locator('[data-open]').first().waitFor();await page.locator('[data-view="saved"]').click();assert(await page.locator('[data-open]').count()===1,'Bookmarks persist');
 await page.locator('[data-open]').click();assert(await page.locator('#dish-note').inputValue()==='Try with Sophie. Extra lime.','Notes persist');
 await close(page);await page.locator('[data-view="tried"]').click();assert(await page.locator('[data-open]').count()===1,'Tried list works');
 await page.locator('[data-view="all"]').click();await page.locator('#method').selectOption('instant');assert((await page.locator('#result-count').textContent()).startsWith('15'),'15 specific Instant Pot recipes');
 await page.locator('#method').selectOption('slow');assert((await page.locator('#result-count').textContent()).startsWith('5'),'5 specific slow cooker recipes');
 await page.locator('#method').selectOption('all');await page.locator('#country').selectOption('Germany');assert(await page.locator('[data-open]').count()===3,'Country filtering works');
 assert(await page.locator('.wheel-aside path.active').count()===1,'Selected country highlights wheel');
 await page.locator('[data-action="wheel"]:visible').first().click();
 await page.locator('#modal [data-wheel-country="India"]').click({force:true});await page.waitForTimeout(220);
 assert(await page.locator('#country').inputValue()==='India','Photo sector changes country');
 await page.locator('#country').selectOption('');
 await page.locator('[data-action="settings"]').click();
 for(const theme of ['night','garden','cherry','original']){
  await page.locator(`[data-theme="${theme}"]`).click();assert(await page.locator('body').getAttribute('data-theme')===theme,'Immediate theme switch');
  const closeColor=await page.locator('.close-button').evaluate(el=>getComputedStyle(el).color);assert(closeColor!=='rgba(0, 0, 0, 0)','Visible modal close');
 }
 await page.locator('[data-pref="compact"]').check();assert(await page.locator('body').evaluate(el=>el.classList.contains('compact')),'Compact setting applies');
 await page.locator('[data-pref="compact"]').uncheck();await page.locator('[data-pref="wheel"]').uncheck();assert(await page.locator('.wheel-aside').isHidden(),'Wheel setting hides image');
 await page.locator('[data-pref="wheel"]').check();await close(page);
 await page.locator('[data-action="share"]').click();assert((await page.locator('#share-link').inputValue()).includes(`staging-${variant}`),'Share keeps selected option');
 assert(await page.locator('.install-section').isVisible(),'Install instructions');await close(page);
 await page.locator('[data-view="all"]').click();await page.locator('#search').fill('nothing matches qqqqq');assert(await page.locator('.empty-state').isVisible(),'Empty state');await page.locator('[data-action="reset-filters"]').click();
 await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:fileURLToPath(new URL(`test-results/${variant}-${mobile?'phone':'desktop'}.png`,root)),fullPage:false});
 if(mobile){
  const buffer=await page.screenshot({fullPage:false});await fs.writeFile(new URL(`assets/preview-${variant}.png`,root),buffer);
  await page.setViewportSize({width:320,height:760});width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));assert(width.scroll<=width.width+1,`320px overflow ${JSON.stringify(width)}`);
 }
 const manifest=await(await context.request.get(`http://127.0.0.1:5178/world-flavors/staging-${variant}/manifest.webmanifest`)).json();assert(manifest.start_url==='./','Manifest preserves option');
 for(const icon of manifest.icons){const r=await context.request.get(new URL(icon.src,`http://127.0.0.1:5178/world-flavors/staging-${variant}/`).href);assert(r.ok(),'App icon resolves')}
 assert(errors.length===0,`JavaScript errors: ${errors.join(',')}`);
 checks.push({variant,viewport:mobile?'phone 390 + 320':'desktop 1440',status:'passed'});await context.close();
}
try{for(let variant=1;variant<=5;variant++)for(const mobile of [true,false]){try{await run(variant,mobile)}catch(error){failures.push({variant,mobile,error:error.stack});console.error(variant,mobile,error.message)}}}finally{await browser.close()}
await fs.writeFile(new URL('test-results/report.json',root),JSON.stringify({checks,failures},null,2));console.log(JSON.stringify({checks,failures},null,2));if(failures.length)process.exitCode=1;
