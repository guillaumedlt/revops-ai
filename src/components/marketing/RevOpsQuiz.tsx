"use client";

import { useState } from "react";
import Badge from "./Badge";

const questions = [
  { text: "Vos forecasts ne collent jamais au réel", category: "pipeline" },
  { text: "Marketing et Sales n'ont pas la même définition d'un lead qualifié", category: "silos" },
  { text: "Votre CRM est mal rempli ou sous-exploité", category: "data" },
  { text: "Chaque équipe utilise des outils différents qui ne communiquent pas", category: "stack" },
  { text: "Vous passez plus de 2h par semaine sur du reporting manuel", category: "process" },
  { text: "Vos commerciaux passent du temps sur des tâches qui ne génèrent pas de revenu", category: "process" },
  { text: "Le customer success n'a pas de visibilité sur ce qui a été vendu", category: "silos" },
  { text: "Vous n'avez pas de scoring ni de priorisation des leads", category: "data" },
  { text: "Personne ne sait combien de temps un deal met à closer", category: "pipeline" },
  { text: "L'IA n'est pas encore intégrée dans vos process commerciaux", category: "ia" },
];

const results = [
  { min: 0, max: 2, level: "Bonne base", color: "#22C55E", desc: "Votre organisation revenue est plutôt saine. Quelques optimisations ponctuelles pourraient encore améliorer vos performances.", cta: "Un audit flash pour identifier les quick wins" },
  { min: 3, max: 5, level: "Axes d'amélioration", color: "#F59E0B", desc: "Vous avez des fondations mais des silos persistent. Un accompagnement ciblé permettrait de débloquer votre croissance.", cta: "Un audit RevOps pour prioriser les chantiers" },
  { min: 6, max: 8, level: "RevOps nécessaire", color: "#FF7A59", desc: "Vos équipes fonctionnent en silos et vous perdez du revenu chaque mois. Il est temps de structurer vos opérations.", cta: "Un RevOps Part-Time pour tout structurer" },
  { min: 9, max: 10, level: "Urgence RevOps", color: "#EF4444", desc: "Votre organisation revenue a besoin d'une refonte complète. Chaque semaine sans action vous coûte des deals.", cta: "Un appel pour cadrer un plan d'action" },
];

export default function RevOpsQuiz() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const score = checked.size;
  const result = results.find((r) => score >= r.min && score <= r.max) || results[0];

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setShowResult(false);
  }

  if (!open) {
    return (
      <div className="text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E8E8E8] bg-white text-[13px] font-medium text-[#111] hover:border-[#CCC] hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] transition-all cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#6D00CC]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Tester mon score RevOps
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
      {/* Header with close */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="mb-3"><Badge>Auto-diagnostic</Badge></div>
          <h3 className="text-[17px] font-semibold text-[#111] tracking-[-0.02em] mb-1">Avez-vous besoin de RevOps ?</h3>
          <p className="text-[12px] text-[#999]">Cochez ce qui vous parle. Résultat instantané.</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="p-1 text-[#CCC] hover:text-[#999] transition-colors cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      {/* Questions — compact 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-6">
        {questions.map((q, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={"flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer " +
              (checked.has(i) ? "border-[#111] bg-[#FAFAFA]" : "border-[#F2F2F2] hover:border-[#E0E0E0]")}
          >
            <div className={"w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors " +
              (checked.has(i) ? "bg-[#111] border-[#111]" : "border-[#DDD]")}>
              {checked.has(i) && (
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[11px] text-[#555] leading-[1.4]">{q.text}</span>
          </button>
        ))}
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score * 10}%`, backgroundColor: result.color }} />
        </div>
        <span className="text-[12px] font-semibold text-[#111] shrink-0">{score}/10</span>
      </div>

      {/* Show result */}
      {score > 0 && !showResult && (
        <button type="button" onClick={() => setShowResult(true)}
          className="w-full py-2 rounded-md bg-[#111] text-white text-[12px] font-medium hover:bg-[#222] transition-colors cursor-pointer">
          Voir mon diagnostic
        </button>
      )}

      {showResult && (
        <div className="rounded-lg p-4" style={{ backgroundColor: result.color + "08", borderLeft: `3px solid ${result.color}` }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[13px] font-bold" style={{ color: result.color }}>{result.level}</span>
          </div>
          <p className="text-[12px] text-[#555] leading-[1.6] mb-3">{result.desc}</p>
          <a href="#contact" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111] text-white text-[11px] font-medium hover:bg-[#222] transition-colors">
            <span className="w-1.5 h-1.5 rounded-sm bg-[#22C55E]" />
            {result.cta}
          </a>
        </div>
      )}
    </div>
  );
}
