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
    logo: "https://www.hubspot.com/favicon.ico",
    available: true,
    connected: true,
    toolCount: 12,
  },
  {
    id: "notion",
    name: "Notion",
    description: "Docs, databases, knowledge base",
    logo: "https://www.notion.so/favicon.ico",
    available: true,
    connected: false,
    toolCount: 0,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team messaging, channels, notifications",
    logo: "https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png",
    available: true,
    connected: false,
    toolCount: 0,
  },
  {
    id: "lemlist",
    name: "Lemlist",
    description: "Cold outreach, sequences, deliverability",
    logo: "https://www.lemlist.com/favicon.ico",
    available: true,
    connected: false,
    toolCount: 5,
  },
];

// No categories needed with only 4 connectors
export const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All" },
];
