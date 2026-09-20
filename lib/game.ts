export const NEED_KEYS=['hunger','thirst','energy','hygiene','fun','social','comfort'] as const;
export function decayNeeds(needs:Record<string,number>,minutes:number){return Object.fromEntries(NEED_KEYS.map((k,i)=>[k,Math.max(0,Math.round((needs[k]??80)-minutes*(i===1?.16:.09)))]))}
export function mood(n:Record<string,number>){const avg=NEED_KEYS.reduce((a,k)=>a+(n[k]??0),0)/NEED_KEYS.length;if(n.energy<20)return'tired';if(n.hunger<20)return'hungry';return avg>80?'happy':avg>55?'content':'sad'}
export const actionEffects:Record<string,Record<string,number>>={bed:{energy:35,comfort:12},fridge:{hunger:28,thirst:10},shower:{hygiene:38},tv:{fun:30,comfort:8},pc:{fun:16},chair:{comfort:18},plant:{fun:5}};
export function applyAction(n:Record<string,number>,kind:string){const out={...n};for(const [k,v] of Object.entries(actionEffects[kind]||{}))out[k]=Math.min(100,(out[k]||0)+v);return out}
export function dailyReward(streak:number){return[100,140,180,230,300,400,650][Math.max(0,Math.min(6,streak))]}
