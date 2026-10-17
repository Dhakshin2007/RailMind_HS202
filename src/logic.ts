import{Task,Win,Block,Conflict,PlanResult,Priority}from"./types";
export const fmt=(m:number)=>`${String(Math.floor(m/60)).padStart(2,"0")}:${String(Math.round(m%60)).padStart(2,"0")}`;
export const parseT=(s:string)=>{const[h,m]=s.split(":").map(Number);return h*60+m};
export const ov=(a:number,b:number,c:number,d:number)=>a<d&&c<b;
export const rank:Record<Priority,number>={Critical:0,High:1,Medium:2,Low:3};
export const DAY0=360,DAY1=1320,MAXH=4;
export function priorityOf(crit:number,days:number,score:number):Priority{const s=crit*12+Math.min(days,365)/6+(100-score)/3;return s>=75?"Critical":s>=60?"High":s>=45?"Medium":"Low"}
export function conflicts(blocks:Block[],wins:Win[]):Conflict[]{const o:Conflict[]=[];
blocks.forEach((b,i)=>{if(b.status==="Completed")return;
for(const w of wins)if(w.section===b.section&&ov(b.start,b.end,w.start,w.end))o.push({blockId:b.id,type:"Train / unavailable window",from:Math.max(b.start,w.start),to:Math.min(b.end,w.end),msg:`"${b.title}" overlaps "${w.label}" on ${b.section}.`});
blocks.slice(i+1).forEach(c=>{if(c.status==="Completed"||!ov(b.start,b.end,c.start,c.end))return;const f=Math.max(b.start,c.start),t=Math.min(b.end,c.end);
if(b.section===c.section)o.push({blockId:b.id,type:"Section overlap",from:f,to:t,msg:`"${b.title}" and "${c.title}" overlap on ${b.section}.`});
if(b.resource&&b.resource===c.resource)o.push({blockId:b.id,type:"Resource clash",from:f,to:t,msg:`${b.resource} is assigned to "${b.title}" and "${c.title}" at the same time.`})})});return o}
const free=(sec:string,s:number,e:number,bl:Block[],w:Win[])=>!w.some(x=>x.section===sec&&ov(s,e,x.start,x.end))&&!bl.some(x=>x.section===sec&&ov(s,e,x.start,x.end));
export function plan(tasks:Task[],blocks:Block[],wins:Win[]):PlanResult{
const un:PlanResult["un"]=[],nb:Block[]=[],ids=new Set<string>();
let pool=tasks.filter(t=>t.status==="Unscheduled").sort((a,b)=>rank[a.priority]-rank[b.priority]||b.days-a.days||b.dur-a.dur||a.id.localeCompare(b.id));
pool.filter(t=>t.dur>MAXH).forEach(t=>un.push({task:t,reason:`Duration ${t.dur}h exceeds the ${MAXH}h demo block cap; split the task.`}));pool=pool.filter(t=>t.dur<=MAXH);
for(const sec of[...new Set(pool.map(t=>t.section))]){let rest=pool.filter(t=>t.section===sec);
while(rest.length){const grp:Task[]=[],load:Record<string,number>={};
for(const t of rest){const l=(load[t.dept]||0)+t.dur;if(l<=MAXH){load[t.dept]=l;grp.push(t)}}
const len=Math.max(...Object.values(load))*60;let s=DAY0;const all=[...blocks,...nb];
while(s+len<=DAY1&&!free(sec,s,s+len,all,wins))s+=30;
if(s+len>DAY1)grp.forEach(t=>un.push({task:t,reason:`No free ${len/60}h window on ${sec} between ${fmt(DAY0)} and ${fmt(DAY1)}.`}));
else{const d=[...new Set(grp.map(t=>t.dept))];nb.push({id:`PLN-${nb.length+1}`,title:`Joint block ${sec}`,section:sec,dept:d.length>1?"Joint":d[0],taskIds:grp.map(t=>t.id),start:s,end:s+len,status:"Proposed"});grp.forEach(t=>ids.add(t.id))}
rest=rest.filter(t=>!grp.includes(t))}}
const done=tasks.filter(t=>ids.has(t.id));
return{nb,un,ids,base:{closures:done.length,hours:done.reduce((a,t)=>a+t.dur,0)},plan:{closures:nb.length,hours:nb.reduce((a,b)=>a+(b.end-b.start)/60,0)}}}
export function download(name:string,rows:(string|number)[][]){const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=name;a.click()}
