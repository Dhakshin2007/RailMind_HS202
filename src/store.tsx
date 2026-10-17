import{createContext,useContext,useState,ReactNode}from"react";
import{Task,Block,Win,PlanResult}from"./types";
import{seedTasks,seedBlocks,seedWins}from"./data";
import{plan}from"./logic";
interface S{tasks:Task[];blocks:Block[];wins:Win[];queue:string[];res:PlanResult|null;canUndo:boolean;
saveTask:(t:Task)=>void;addBlock:(b:Block)=>void;enqueue:(id:string)=>void;generate:()=>void;undo:()=>void;reset:()=>void}
const C=createContext<S>(null!);export const useStore=()=>useContext(C);
export function Provider({children}:{children:ReactNode}){
const[tasks,setTasks]=useState(seedTasks),[blocks,setBlocks]=useState(seedBlocks),[queue,setQ]=useState<string[]>([]),[res,setRes]=useState<PlanResult|null>(null),[snap,setSnap]=useState<{t:Task[];b:Block[]}|null>(null);
const v:S={tasks,blocks,wins:seedWins,queue,res,canUndo:!!snap,
saveTask:t=>setTasks(p=>p.some(x=>x.id===t.id)?p.map(x=>x.id===t.id?t:x):[...p,t]),
addBlock:b=>{setBlocks(p=>[...p,b]);setTasks(p=>p.map(t=>b.taskIds.includes(t.id)?{...t,status:"Proposed"}:t));setQ(q=>q.filter(i=>!b.taskIds.includes(i)))},
enqueue:id=>setQ(q=>q.includes(id)?q:[...q,id]),
generate:()=>{const r=plan(tasks,blocks,seedWins);setSnap({t:tasks,b:blocks});setBlocks([...blocks,...r.nb]);setTasks(tasks.map(t=>r.ids.has(t.id)?{...t,status:"Proposed"}:t));setRes(r)},
undo:()=>{if(snap){setTasks(snap.t);setBlocks(snap.b);setSnap(null);setRes(null)}},
reset:()=>{setTasks(seedTasks);setBlocks(seedBlocks);setQ([]);setRes(null);setSnap(null)}};
return<C.Provider value={v}>{children}</C.Provider>}
