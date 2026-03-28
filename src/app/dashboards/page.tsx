"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, LayoutDashboard, X, Trash2 } from "lucide-react";

interface Dashboard {
  id: string;
  name: string;
  description: string | null;
  widget_count: number;
  updated_at: string;
}

function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string, desc: string) => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    onCreate(name, description);
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#111]">Create Dashboard</h2>
          <button onClick={onClose} className="text-[#BBB] hover:text-[#111]">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#555] mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekly Pipeline Review"
              autoFocus
              className="w-full h-10 px-3 text-[13px] rounded-lg border border-[#EAEAEA] bg-white text-[#111] placeholder:text-[#BBB] focus:outline-none focus:ring-1 focus:ring-[#111]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#555] mb-1">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this dashboard for?"
              className="w-full h-10 px-3 text-[13px] rounded-lg border border-[#EAEAEA] bg-white text-[#111] placeholder:text-[#BBB] focus:outline-none focus:ring-1 focus:ring-[#111]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-[13px] text-[#555] hover:bg-[#F5F5F5] rounded-lg">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="bg-[#111] text-white rounded-lg px-4 py-2 text-[13px] font-medium disabled:opacity-50 hover:bg-[#262626] transition-colors"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return hours + "h ago";
  const days = Math.floor(hours / 24);
  if (days < 7) return days + "d ago";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function DashboardsPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();

  async function fetchDashboards() {
    const res = await fetch("/api/dashboards");
    if (res.ok) {
      const json = await res.json();
      setDashboards(json.data?.dashboards ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDashboards();
  }, []);

  async function handleDelete(id: string) {
    var prev = dashboards;
    setDashboards(function(p) { return p.filter(function(d) { return d.id !== id; }); });
    var res = await fetch("/api/dashboards/" + id, { method: "DELETE" });
    if (!res.ok) {
      setDashboards(prev); // Rollback on failure
    }
  }

  async function handleCreate(name: string, description: string) {
    const res = await fetch("/api/dashboards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: description || undefined }),
    });
    if (res.ok) {
      const json = await res.json();
      setShowCreate(false);
      router.push("/dashboards/" + json.data.dashboard.id);
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-[#EAEAEA] border-t-[#111] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[#111]">Dashboards</h1>
            <p className="text-[13px] text-[#999] mt-0.5">Pin reports and metrics from chat into custom dashboards.</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-[#111] text-white rounded-lg px-4 py-2 text-[13px] font-medium flex items-center gap-1.5 hover:bg-[#262626] transition-colors"
          >
            <Plus size={16} />
            Create Dashboard
          </button>
        </div>

        {/* Grid */}
        {dashboards.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-12 w-12 rounded-lg bg-[#F5F5F5] flex items-center justify-center mx-auto mb-3">
              <LayoutDashboard size={24} className="text-[#BBB]" />
            </div>
            <p className="text-[13px] text-[#555] font-medium">No dashboards yet</p>
            <p className="text-[13px] text-[#BBB] mt-1">Create one to start pinning reports.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {dashboards.map(function(d) {
              return (
                <div
                  key={d.id}
                  className="group relative text-left border border-[#EAEAEA] rounded-lg p-5 hover:border-[#D4D4D4] hover:shadow-sm transition-all cursor-pointer"
                  onClick={function() { router.push("/dashboards/" + d.id); }}
                >
                  <button
                    onClick={function(e) {
                      e.stopPropagation();
                      if (confirm("Supprimer le dashboard \"" + d.name + "\" ?")) {
                        handleDelete(d.id);
                      }
                    }}
                    className="absolute top-3 right-3 hidden group-hover:flex h-7 w-7 items-center justify-center rounded-lg text-[#BBB] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                  <h3 className="text-base font-medium text-[#111] pr-6">{d.name}</h3>
                  {d.description && (
                    <p className="text-[13px] text-[#999] mt-1 line-clamp-2">{d.description}</p>
                  )}
                  <p className="text-xs text-[#BBB] mt-3">
                    {d.widget_count} widget{d.widget_count !== 1 ? "s" : ""} &middot; {formatDate(d.updated_at)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showCreate && <CreateModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
    </div>
  );
}
