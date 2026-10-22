import { groups } from './dishes.mjs?v=20261022';

export const regions = [
  ['Europe', 'europe', ['Germany','Spain','Italy','France','United Kingdom','Greece','Cyprus','Scandinavia','Eastern Europe']],
  ['Asia', 'asia', ['China','Japan','Korea','Thailand','Vietnam','India','Iran','Mediterranean (Levant examples)']],
  ['Africa', 'africa', ['West Africa','North Africa','Horn of Africa']],
  ['North America', 'north-america', ['United States','Canada','Mexico','Central America','Caribbean']],
  ['South America', 'south-america', ['Brazil','Argentina','Uruguay','Chile','Peru','Bolivia']]
];

const flags = {'Brazil':'🇧🇷','China':'🇨🇳','Japan':'🇯🇵','Korea':'🇰🇷','Thailand':'🇹🇭','Vietnam':'🇻🇳','India':'🇮🇳','Iran':'🇮🇷','Greece':'🇬🇷','Cyprus':'🇨🇾','Germany':'🇩🇪','Spain':'🇪🇸','Italy':'🇮🇹','France':'🇫🇷','United Kingdom':'🇬🇧','United States':'🇺🇸','Canada':'🇨🇦','Mexico':'🇲🇽','Argentina':'🇦🇷','Uruguay':'🇺🇾','Chile':'🇨🇱','Peru':'🇵🇪','Bolivia':'🇧🇴'};
const ipRecipeNames = ['Misir wot','Chinese beef and daikon stew','Japanese chicken curry','Pho bo','Dal tadka','Chana masala','Ghormeh sabzi','Hungarian goulash','Chili','Macaroni and cheese','Vegetarian split pea soup','Chicken tinga','Chicken tagine'];
const slowRecipeNames = ['Groundnut stew (maafe)','Beef barbacoa','Ropa vieja','Vegetarian split pea soup'];
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
    ipRecipe,slowRecipe
  };
}));
export { flags };
