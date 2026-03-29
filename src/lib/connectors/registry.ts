export interface Connector {
  id: string;
  name: string;
  description: string;
  logo: string;
  available: boolean;
  connected?: boolean;
  toolCount: number;
}

export const CONNECTOR_REGISTRY: Connector[] = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM, deals, contacts, pipeline analytics",
    logo: "https://www.google.com/s2/favicons?domain=hubspot.com&sz=64",
    available: true,
    connected: true,
    toolCount: 23,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Docs, databases, knowledge base",
    logo: "https://www.google.com/s2/favicons?domain=notion.so&sz=64",
    available: true,
    connected: false,
    toolCount: 5,
  },
  {
    id: "lemlist",
    name: "Lemlist",
    description: "Cold outreach, sequences, deliverability",
    logo: "https://www.google.com/s2/favicons?domain=lemlist.com&sz=64",
    available: true,
    connected: false,
    toolCount: 5,
  },
];

// No categories needed with only 4 connectors
export const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All" },
];
// ICP scoring tools included
