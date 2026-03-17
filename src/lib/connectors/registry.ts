export interface Connector {
  id: string;
  name: string;
  category: "crm" | "marketing" | "sales" | "support" | "analytics" | "communication" | "productivity" | "finance" | "data";
  description: string;
  logo: string;
  available: boolean;
  connected?: boolean;
  enabled?: boolean;
}

export const CONNECTOR_REGISTRY: Connector[] = [
  // CRM
  { id: "hubspot", name: "HubSpot", category: "crm", description: "CRM, deals, contacts, companies", logo: "https://www.google.com/s2/favicons?domain=hubspot.com&sz=32", available: true },
  { id: "salesforce", name: "Salesforce", category: "crm", description: "CRM, opportunities, leads", logo: "https://www.google.com/s2/favicons?domain=salesforce.com&sz=32", available: false },
  { id: "pipedrive", name: "Pipedrive", category: "crm", description: "Sales CRM and pipeline", logo: "https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32", available: false },
  { id: "zoho_crm", name: "Zoho CRM", category: "crm", description: "CRM and sales automation", logo: "https://www.google.com/s2/favicons?domain=zoho.com&sz=32", available: false },
  { id: "close", name: "Close", category: "crm", description: "Inside sales CRM", logo: "https://www.google.com/s2/favicons?domain=close.com&sz=32", available: false },

  // Marketing
  { id: "google_analytics", name: "Google Analytics", category: "marketing", description: "Web analytics and traffic", logo: "https://www.google.com/s2/favicons?domain=analytics.google.com&sz=32", available: false },
  { id: "google_ads", name: "Google Ads", category: "marketing", description: "Ad campaigns and spend", logo: "https://www.google.com/s2/favicons?domain=ads.google.com&sz=32", available: false },
  { id: "meta_ads", name: "Meta Ads", category: "marketing", description: "Facebook & Instagram ads", logo: "https://www.google.com/s2/favicons?domain=facebook.com&sz=32", available: false },
  { id: "linkedin_ads", name: "LinkedIn Ads", category: "marketing", description: "LinkedIn advertising", logo: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=32", available: false },
  { id: "mailchimp", name: "Mailchimp", category: "marketing", description: "Email marketing", logo: "https://www.google.com/s2/favicons?domain=mailchimp.com&sz=32", available: false },
  { id: "brevo", name: "Brevo", category: "marketing", description: "Email, SMS, marketing automation", logo: "https://www.google.com/s2/favicons?domain=brevo.com&sz=32", available: false },
  { id: "semrush", name: "Semrush", category: "marketing", description: "SEO and marketing analytics", logo: "https://www.google.com/s2/favicons?domain=semrush.com&sz=32", available: false },

  // Sales
  { id: "lemlist", name: "Lemlist", category: "sales", description: "Cold outreach and sequences", logo: "https://www.google.com/s2/favicons?domain=lemlist.com&sz=32", available: false },
  { id: "apollo", name: "Apollo.io", category: "sales", description: "Sales intelligence and outreach", logo: "https://www.google.com/s2/favicons?domain=apollo.io&sz=32", available: false },
  { id: "outreach", name: "Outreach", category: "sales", description: "Sales engagement platform", logo: "https://www.google.com/s2/favicons?domain=outreach.io&sz=32", available: false },
  { id: "salesloft", name: "SalesLoft", category: "sales", description: "Sales engagement", logo: "https://www.google.com/s2/favicons?domain=salesloft.com&sz=32", available: false },
  { id: "gong", name: "Gong", category: "sales", description: "Revenue intelligence", logo: "https://www.google.com/s2/favicons?domain=gong.io&sz=32", available: false },
  { id: "linkedin_sales", name: "LinkedIn Sales Nav", category: "sales", description: "Sales prospecting", logo: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=32", available: false },

  // Support
  { id: "intercom", name: "Intercom", category: "support", description: "Customer messaging and support", logo: "https://www.google.com/s2/favicons?domain=intercom.com&sz=32", available: false },
  { id: "zendesk", name: "Zendesk", category: "support", description: "Customer support and ticketing", logo: "https://www.google.com/s2/favicons?domain=zendesk.com&sz=32", available: false },
  { id: "freshdesk", name: "Freshdesk", category: "support", description: "Customer support", logo: "https://www.google.com/s2/favicons?domain=freshdesk.com&sz=32", available: false },
  { id: "crisp", name: "Crisp", category: "support", description: "Live chat and messaging", logo: "https://www.google.com/s2/favicons?domain=crisp.chat&sz=32", available: false },

  // Analytics
  { id: "mixpanel", name: "Mixpanel", category: "analytics", description: "Product analytics", logo: "https://www.google.com/s2/favicons?domain=mixpanel.com&sz=32", available: false },
  { id: "amplitude", name: "Amplitude", category: "analytics", description: "Product analytics", logo: "https://www.google.com/s2/favicons?domain=amplitude.com&sz=32", available: false },
  { id: "segment", name: "Segment", category: "analytics", description: "Customer data platform", logo: "https://www.google.com/s2/favicons?domain=segment.com&sz=32", available: false },

  // Communication
  { id: "slack", name: "Slack", category: "communication", description: "Team messaging", logo: "https://www.google.com/s2/favicons?domain=slack.com&sz=32", available: false },
  { id: "gmail", name: "Gmail", category: "communication", description: "Email", logo: "https://www.google.com/s2/favicons?domain=gmail.com&sz=32", available: false },
  { id: "outlook", name: "Outlook", category: "communication", description: "Email and calendar", logo: "https://www.google.com/s2/favicons?domain=outlook.com&sz=32", available: false },
  { id: "calendly", name: "Calendly", category: "communication", description: "Meeting scheduling", logo: "https://www.google.com/s2/favicons?domain=calendly.com&sz=32", available: false },

  // Productivity
  { id: "google_sheets", name: "Google Sheets", category: "productivity", description: "Spreadsheets and data", logo: "https://www.google.com/s2/favicons?domain=sheets.google.com&sz=32", available: false },
  { id: "notion", name: "Notion", category: "productivity", description: "Docs and knowledge base", logo: "https://www.google.com/s2/favicons?domain=notion.so&sz=32", available: false },
  { id: "airtable", name: "Airtable", category: "productivity", description: "Database and spreadsheet", logo: "https://www.google.com/s2/favicons?domain=airtable.com&sz=32", available: false },

  // Finance
  { id: "stripe_connector", name: "Stripe", category: "finance", description: "Payments and billing", logo: "https://www.google.com/s2/favicons?domain=stripe.com&sz=32", available: false },
  { id: "chargebee", name: "Chargebee", category: "finance", description: "Subscription billing", logo: "https://www.google.com/s2/favicons?domain=chargebee.com&sz=32", available: false },
  { id: "qonto", name: "Qonto", category: "finance", description: "Business banking", logo: "https://www.google.com/s2/favicons?domain=qonto.com&sz=32", available: false },

  // Data
  { id: "bigquery", name: "BigQuery", category: "data", description: "Data warehouse", logo: "https://www.google.com/s2/favicons?domain=cloud.google.com&sz=32", available: false },
  { id: "snowflake", name: "Snowflake", category: "data", description: "Data cloud", logo: "https://www.google.com/s2/favicons?domain=snowflake.com&sz=32", available: false },
];

export const CATEGORIES: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "crm", label: "CRM" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "support", label: "Support" },
  { id: "analytics", label: "Analytics" },
  { id: "communication", label: "Communication" },
  { id: "productivity", label: "Productivity" },
  { id: "finance", label: "Finance" },
  { id: "data", label: "Data" },
];
