import React from"react";import{createRoot}from"react-dom/client";import{HashRouter,Routes,Route,Navigate,NavLink}from"react-router-dom";
import{LayoutDashboard,Wrench,CalendarRange,Sparkles,FileBarChart,Settings as Cog,Train}from"lucide-react";
import"./index.css";import{Provider}from"./store";import{Demo}from"./ui";
import{Dashboard,Maintenance,Planner,Insights,Reports,SettingsPage}from"./pages";
const nav=[["/dashboard","Dashboard",LayoutDashboard],["/maintenance","Maintenance Tasks",Wrench],["/planner","Block Planner",CalendarRange],["/ai-insights","AI Insights",Sparkles],["/reports","Reports",FileBarChart],["/settings","Settings / About",Cog]] as const;
const App=()=><Provider><HashRouter><div className="min-h-screen bg-slate-50 md:flex">
<aside className="bg-ink text-slate-200 md:w-56 md:shrink-0"><div className="flex items-center gap-2 p-4 font-semibold text-white"><Train className="h-5 w-5 text-teal-400"/>RailMind</div>
<nav aria-label="Primary" className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col">{nav.map(([to,l,I])=><NavLink key={to} to={to} className={({isActive})=>`flex items-center gap-2 whitespace-nowrap rounded px-3 py-2 text-sm ${isActive?"bg-teal-700 text-white":"hover:bg-white/10"}`}><I className="h-4 w-4"/>{l}</NavLink>)}</nav>
<p className="hidden p-4 text-xs text-slate-400 md:block">Smarter maintenance blocks. More assets available.</p></aside>
<div className="min-w-0 flex-1"><header className="flex flex-wrap items-center justify-between gap-2 border-b bg-white px-5 py-2.5 text-sm"><span className="text-slate-600">Demo planning date: <b>Mon 19 Oct 2026</b> (fixed)</span><span className="flex gap-2"><Demo>Demo Environment · Prototype, not for real operations</Demo></span></header>
<main className="mx-auto max-w-[1400px] p-5"><Routes><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/maintenance" element={<Maintenance/>}/><Route path="/planner" element={<Planner/>}/><Route path="/ai-insights" element={<Insights/>}/><Route path="/reports" element={<Reports/>}/><Route path="/settings" element={<SettingsPage/>}/></Routes></main></div></div></HashRouter></Provider>;
createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
