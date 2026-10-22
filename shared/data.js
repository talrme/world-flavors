import { groups } from './dishes.mjs';

const sectors = {
  'Germany':[350,375], 'Spain':[15,30], 'Italy':[30,47], 'France':[47,63],
  'United Kingdom':[63,72], 'United States':[72,88], 'Canada':[72,88], 'Mexico':[88,98],
  'Central America':[98,108], 'Caribbean':[108,121], 'Argentina':[121,134], 'Uruguay':[121,134],
  'Peru':[134,143], 'Bolivia':[134,143], 'Chile':[143,152], 'Brazil':[152,169],
  'Mediterranean (Levant examples)':[169,188], 'Iran':[188,200], 'India':[200,216],
  'Vietnam':[216,229], 'Thailand':[229,242], 'Korea':[242,250], 'Japan':[250,263],
  'China':[263,280], 'Horn of Africa':[280,292], 'North Africa':[292,304],
  'West Africa':[304,317], 'Greece':[317,328], 'Cyprus':[317,328],
  'Scandinavia':[328,340], 'Eastern Europe':[340,350]
};
const flags = {'Brazil':'🇧🇷','China':'🇨🇳','Japan':'🇯🇵','Korea':'🇰🇷','Thailand':'🇹🇭','Vietnam':'🇻🇳','India':'🇮🇳','Iran':'🇮🇷','Greece':'🇬🇷','Cyprus':'🇨🇾','Germany':'🇩🇪','Spain':'🇪🇸','Italy':'🇮🇹','France':'🇫🇷','United Kingdom':'🇬🇧','United States':'🇺🇸','Canada':'🇨🇦','Mexico':'🇲🇽','Argentina':'🇦🇷','Uruguay':'🇺🇾','Chile':'🇨🇱','Peru':'🇵🇪','Bolivia':'🇧🇴'};
const ipRecipeNames = ['Feijoada','Misir wot','Red-braised pork belly','Japanese chicken curry','Pho bo','Dal tadka','Chana masala','Ghormeh sabzi','Hungarian goulash','Rouladen','Chili','Macaroni and cheese','Split pea soup','Chicken tinga','Chicken tagine'];
const slowRecipeNames = ['Groundnut stew (maafe)','Ragu bolognese','Beef bourguignon','Carnitas','Ropa vieja'];
export const countries = groups.map(([name])=>name).sort((a,b)=>a.localeCompare(b));
export const dishes = groups.flatMap(([country,items])=>items.map(d=>{
  const [original,description,recommendation,difficulty,active,total,appliance,ingredients,reason]=d;
  const isHome = recommendation==='Make at home';
  const ipRecipe = ipRecipeNames.includes(original);
  const slowRecipe = slowRecipeNames.includes(original);
  return {
    id:(country+'-'+original).toLowerCase().replace(/[^a-z0-9]+/g,'-'),
    original, name:original==='Empanadas saltenas'?'Beef empanadas (Mendoza style)':original,
    description:original==='Empanadas saltenas'?'Argentine beef-and-onion pastry pockets':description,
    country, flag:flags[country]||'🌍', recommendation, difficulty, active,total,appliance,ingredients,reason,isHome,
    method:ipRecipe?'Instant Pot recipe':slowRecipe?'Slow cooker recipe':isHome?'Stovetop / other':'Order out',
    ipRecipe,slowRecipe,sector:sectors[country]
  };
}));
export { sectors,flags };
