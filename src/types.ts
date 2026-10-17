export type Dept="Engineering"|"TRD"|"S&T";
export type Priority="Critical"|"High"|"Medium"|"Low";
export type Status="Unscheduled"|"Proposed"|"Scheduled"|"Completed"|"Needs Review";
export interface Task{id:string;asset:string;section:string;dept:Dept;type:string;priority:Priority;dur:number;days:number;crit:number;score:number;status:Status;notes?:string}
export interface Win{id:string;section:string;start:number;end:number;label:string}
export interface Block{id:string;title:string;section:string;dept:Dept|"Joint";taskIds:string[];start:number;end:number;resource?:string;status:"Proposed"|"Scheduled"|"Completed"}
export interface Conflict{blockId:string;type:string;from:number;to:number;msg:string}
export interface PlanResult{nb:Block[];un:{task:Task;reason:string}[];ids:Set<string>;base:{closures:number;hours:number};plan:{closures:number;hours:number}}
