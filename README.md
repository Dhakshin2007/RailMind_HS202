# RailMind — Block Planning Dashboard (SIH26027 prototype)
`npm install && npm run dev` (build: `npm run build`, types: `npm run typecheck`).
**All data is synthetic demo data.** No backend, no AI API, no live Indian Railways data. Not for real operational decisions.
Planner logic (src/logic.ts) is deterministic: tasks per section are co-located into one shared block (departments work in parallel, so block length = longest department load, max 4h), placed in the earliest slot free of train/unavailable windows and other blocks. A baseline where each task gets its own closure is compared with it. Hours/closure counts are illustrative, not measured results.
Future AI: swap src/services/aiService.ts for a server-side proxy; never bundle API keys in the browser.
