import{Task,Win,Block,Dept,Priority,Status}from"./types";
const T=(id:string,asset:string,section:string,dept:Dept,type:string,priority:Priority,dur:number,days:number,crit:number,score:number,status:Status):Task=>({id,asset,section,dept,type,priority,dur,days,crit,score,status});
export const SECTIONS=["SEC-A","SEC-B","SEC-C"];
export const DEPTS:Dept[]=["Engineering","TRD","S&T"];
export const seedTasks:Task[]=[
T("T-101","ASSET-104 Rail weld","SEC-A","Engineering","Ultrasonic flaw test","Critical",3,240,5,38,"Unscheduled"),
T("T-102","ASSET-211 OHE mast","SEC-A","TRD","Contact wire inspection","High",2,160,4,52,"Unscheduled"),
T("T-103","ASSET-317 Signal S12","SEC-A","S&T","Lamp & relay check","Medium",1.5,90,3,66,"Unscheduled"),
T("T-104","ASSET-118 Points 7B","SEC-B","Engineering","Point machine overhaul","High",3,200,4,48,"Unscheduled"),
T("T-105","ASSET-225 Catenary section","SEC-B","TRD","Tension adjustment","Medium",2,120,3,60,"Unscheduled"),
T("T-106","ASSET-330 Axle counter","SEC-B","S&T","Calibration","Critical",1,260,5,35,"Unscheduled"),
T("T-107","ASSET-141 Track ballast","SEC-C","Engineering","Tamping","Low",3.5,60,2,80,"Unscheduled"),
T("T-108","ASSET-232 Substation feeder","SEC-C","TRD","Insulator cleaning","Medium",2,110,3,62,"Unscheduled"),
T("T-109","ASSET-344 Interlocking panel","SEC-C","S&T","Fault diagnosis","High",2.5,170,4,50,"Unscheduled"),
T("T-110","ASSET-152 Level crossing","SEC-A","Engineering","Gate mechanism service","Low",1,45,2,85,"Scheduled"),
T("T-111","ASSET-246 OHE mast","SEC-B","TRD","Foundation check","Medium",1.5,95,3,70,"Scheduled"),
T("T-112","ASSET-358 Cable route","SEC-C","S&T","Cable test","Low",1,30,2,90,"Completed"),
T("T-113","ASSET-163 Bridge bearing","SEC-B","Engineering","Bearing inspection","High",2,190,5,55,"Needs Review"),
T("T-114","ASSET-259 Neutral section","SEC-A","TRD","Isolator service","Medium",6,100,3,64,"Unscheduled")];
export const seedWins:Win[]=[
{id:"W1",section:"SEC-A",start:360,end:480,label:"Morning peak trains"},{id:"W2",section:"SEC-A",start:1020,end:1140,label:"Evening peak trains"},
{id:"W3",section:"SEC-B",start:540,end:660,label:"Freight movement"},{id:"W4",section:"SEC-B",start:900,end:1020,label:"Express path"},
{id:"W5",section:"SEC-C",start:420,end:540,label:"Passenger service"},{id:"W6",section:"SEC-C",start:1080,end:1200,label:"Unavailable: shunting"}];
export const seedBlocks:Block[]=[
{id:"B-1",title:"Level crossing service",section:"SEC-A",dept:"Engineering",taskIds:["T-110"],start:600,end:660,resource:"Crew-1",status:"Scheduled"},
{id:"B-2",title:"OHE foundation check",section:"SEC-B",dept:"TRD",taskIds:["T-111"],start:700,end:790,resource:"Crew-2",status:"Scheduled"},
{id:"B-3",title:"Proposed: bearing inspection",section:"SEC-B",dept:"Engineering",taskIds:["T-113"],start:560,end:680,resource:"Crew-3",status:"Proposed"},
{id:"B-4",title:"Proposed: cable work",section:"SEC-C",dept:"S&T",taskIds:[],start:780,end:840,resource:"Crew-2",status:"Proposed"},
{id:"B-5",title:"Completed cable test",section:"SEC-C",dept:"S&T",taskIds:["T-112"],start:360,end:420,resource:"Crew-4",status:"Completed"}];
export const availability=[{d:"D-6",v:91},{d:"D-5",v:92},{d:"D-4",v:90},{d:"D-3",v:89},{d:"D-2",v:91},{d:"D-1",v:92},{d:"Demo day",v:90}];
