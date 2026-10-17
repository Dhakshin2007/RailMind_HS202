import{Task}from"../types";
// Deterministic MOCK service. Replace internals with a server-side proxy later; never ship API keys in the browser.
export interface Factor{feature:string;impact:"High"|"Medium"|"Low";explanation:string}
export interface Prediction{required:boolean;confidence:number;label:string;factors:Factor[];explanation:string}
export const predictMaintenance=(t:Task):Prediction=>{
const p=Math.min(0.97,Math.max(0.05,0.1+t.days/450+t.crit*0.07+(100-t.score)/220));const required=p>=0.5;
const factors:Factor[]=[{feature:"Days since last maintenance",impact:t.days>150?"High":t.days>80?"Medium":"Low",explanation:`${t.days} days since last service (illustrative).`},
{feature:"Asset criticality",impact:t.crit>=4?"High":t.crit==3?"Medium":"Low",explanation:`Criticality ${t.crit}/5.`},
{feature:"Inspection score",impact:t.score<50?"High":t.score<70?"Medium":"Low",explanation:`Sample score ${t.score}/100 (not live telemetry).`}];
return{required,confidence:Math.round(p*100),label:required?"Maintenance Required":"No Immediate Maintenance",factors,
explanation:`Demo model estimates ${Math.round(p*100)}% likelihood of need. This is advisory only: availability and conflict checks are done separately in the Block Planner.`}};
export const getDemoInsights=(ts:Task[])=>{const ps=ts.map(t=>({t,p:predictMaintenance(t)}));return{rows:ps,required:ps.filter(x=>x.p.required).length,critical:ts.filter(t=>t.priority==="Critical").length,highRisk:ps.filter(x=>x.p.confidence>=75).length}};
export const featureImportance=[{f:"Days since maintenance",v:34},{f:"Inspection score",v:27},{f:"Asset criticality",v:21},{f:"Maintenance type",v:11},{f:"Section load",v:7}];
