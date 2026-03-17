"use client";

import { useState } from "react";

interface Connector {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  enabled: boolean;
}

const DEFAULT_CONNECTORS: Connector[] = [
  { id: "hubspot", name: "HubSpot", icon: "\ud83d\udfe0", connected: true, enabled: true },
  { id: "salesforce", name: "Salesforce", icon: "\u2601\ufe0f", connected: false, enabled: false },
  { id: "google_sheets", name: "Google Sheets", icon: "\ud83d\udcca", connected: false, enabled: false },
  { id: "google_analytics", name: "Google Analytics", icon: "\ud83d\udcc8", connected: false, enabled: false },
  { id: "slack", name: "Slack", icon: "\ud83d\udcac", connected: false, enabled: false },
];

interface ConnectorPopoverProps {
  onClose: () => void;
}

export default function ConnectorPopover({ onClose }: ConnectorPopoverProps) {
  const [connectors, setConnectors] = useState<Connector[]>(DEFAULT_CONNECTORS);

  const toggleConnector = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) =>
        c.id === id && c.connected ? { ...c, enabled: !c.enabled } : c
      )
    );
  };

  return (
    <div className="w-[280px] rounded-xl border border-[#E5E5E5] bg-white shadow-lg p-2">
      <div className="px-3 py-2 text-xs font-medium text-[#737373] uppercase tracking-wider">
        Connecteurs
      </div>
      {connectors.map((connector) => (
        <div
          key={connector.id}
          className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#FAFAFA] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{connector.icon}</span>
            <span className="text-sm text-[#0A0A0A]">{connector.name}</span>
          </div>
          {connector.connected ? (
            <button
              onClick={() => toggleConnector(connector.id)}
              className={`w-8 h-4 rounded-full transition-colors relative ${
                connector.enabled ? "bg-green-500" : "bg-[#D4D4D4]"
              }`}
            >
              <div
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                  connector.enabled ? "translate-x-4" : "translate-x-0.5"
                }`}
              />
            </button>
          ) : (
            <a
              href="/settings?tab=connectors"
              className="text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors"
            >
              Connecter
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
