import fs from 'node:fs/promises';
import {dishes} from '../shared/data.js';
const sources=JSON.parse(await fs.readFile(new URL('../shared/sources.json',import.meta.url),'utf8'));
const quote=value=>'"'+String(value).replaceAll('"','""')+'"';
const rows=[['Country / Region','Dish','Description','Recommendation','Difficulty','Active minutes','Total time','Appliance fit','Ingredients / flavors','Why / preparation notes','Recipe URL'],...dishes.map(d=>[d.country,d.name,d.description,d.recommendation,d.difficulty,d.active,d.total,d.appliance,d.ingredients,d.reason,sources[d.original].url])];
await fs.writeFile(new URL('../assets/world-of-flavor.csv',import.meta.url),rows.map(row=>row.map(quote).join(',')).join('\r\n')+'\r\n');
console.log('Exported '+dishes.length+' dishes.');
