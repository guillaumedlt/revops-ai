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
    logo: "https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_the-sprocket.svg",
    available: true,
    connected: true,
    toolCount: 23,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Docs, databases, knowledge base",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
    available: true,
    connected: false,
    toolCount: 5,
  },
  {
    id: "lemlist",
    name: "Lemlist",
    description: "Cold outreach, sequences, deliverability",
    logo: "https://asset.brandfetch.io/idL0iThUh6/idSGOJwm5y.png",
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
