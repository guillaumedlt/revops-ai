"use client";

import { useState, useEffect } from "react";
import ChartCard from "@/components/ui/ChartCard";
import StatusBadge from "@/components/ui/StatusBadge";

interface Note {
  id: string;
  content: string;
  note_type: string;
  created_at: string;
  is_pinned: boolean;
}

interface Action {
  id: string;
  title: string;
  status: string;
  priority: string;
  created_at: string;
  due_date: string | null;
}

function actionStatusToBadge(status: string): "good" | "warning" | "critical" {
  if (status === "done") return "good";
  if (status === "in_progress") return "warning";
  return "critical";
}

export default function CockpitPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/pilot/notes").then((r) => r.json()),
      fetch("/api/pilot/actions").then((r) => r.json()),
    ])
      .then(([notesRes, actionsRes]) => {
        setNotes(notesRes.data?.items ?? []);
        setActions(actionsRes.data?.items ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-medium text-foreground tracking-tight">Cockpit</h1>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Notes">
          {notes.length > 0 ? (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {notes.map((note) => (
                <div key={note.id} className="border border-border rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {note.note_type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-3">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
              Aucune note
            </div>
          )}
        </ChartCard>

        <ChartCard title="Actions">
          {actions.length > 0 ? (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {actions.map((action) => (
                <div key={action.id} className="border border-border rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{action.title}</span>
                    <StatusBadge
                      status={actionStatusToBadge(action.status)}
                      label={action.status}
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{new Date(action.created_at).toLocaleDateString("fr-FR")}</span>
                    {action.due_date && (
                      <span>Echeance: {new Date(action.due_date).toLocaleDateString("fr-FR")}</span>
                    )}
                    <span className="uppercase">{action.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
              Aucune action
            </div>
          )}
        </ChartCard>
      </div>

      <ChartCard title="Objectifs">
        <div className="flex items-center justify-center h-[150px] text-sm text-muted-foreground">
          Bientot disponible
        </div>
      </ChartCard>
    </div>
  );
}
