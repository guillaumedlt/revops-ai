import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/login" className="flex items-center gap-2 mb-10">
          <div className="h-6 w-6 rounded bg-[#111] flex items-center justify-center"><span className="text-white text-[9px] font-bold">K</span></div>
          <span className="text-[14px] font-semibold text-[#111]">Kairo</span>
        </Link>

        <h1 className="text-2xl font-bold text-[#111] mb-2">Privacy Policy</h1>
        <p className="text-[13px] text-[#999] mb-8">Last updated: March 31, 2026</p>

        <div className="prose prose-sm max-w-none text-[#333] space-y-6 text-[13px] leading-relaxed">

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">1. Company Information</h2>
            <p>Kairo is a product developed and operated by <strong>Ceres Growth Marketing</strong>.</p>
            <p>
              Ceres Growth Marketing<br />
              128 rue du Laboratoire<br />
              Monaco, 98000<br />
              Contact: guillaume@ceres.agency
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">2. Data We Collect</h2>
            <p>When you use Kairo, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account information</strong>: email address, name, company name (provided during signup)</li>
              <li><strong>Usage data</strong>: conversations with the AI assistant, dashboard configurations, actions created</li>
              <li><strong>Connected service data</strong>: data retrieved from HubSpot, Notion, or Lemlist via your authorized API connections</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">3. How We Use Your Data</h2>
            <p>Your data is used exclusively to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide the Kairo AI assistant service</li>
              <li>Generate analytics, reports, and insights from your connected tools</li>
              <li>Send you weekly briefing emails (if enabled)</li>
              <li>Process billing and manage your subscription</li>
            </ul>
            <p><strong>We do NOT:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sell your data to third parties</li>
              <li>Use your data to train AI models</li>
              <li>Share your CRM data with other Kairo users</li>
              <li>Access your data for purposes other than providing the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">4. Data from Connected Services</h2>
            <p>When you connect HubSpot, Notion, or Lemlist:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We access your data <strong>only through your authorized OAuth tokens or API keys</strong></li>
              <li>Data is queried <strong>in real-time</strong> and not permanently stored, except for cached analytics</li>
              <li>OAuth tokens are encrypted and stored securely in our database</li>
              <li>You can disconnect any service at any time from Settings, which immediately revokes our access</li>
              <li><strong>We never modify or delete your CRM data</strong> unless you explicitly ask Kairo to do so</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">5. API Keys Security</h2>
            <p>If you provide your own API keys (OpenAI, Google AI, Anthropic):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Keys are stored <strong>encrypted</strong> in our database (Supabase with Row Level Security)</li>
              <li>Keys are <strong>never exposed</strong> in API responses — we only return whether a key is configured</li>
              <li>Keys are used <strong>exclusively</strong> to process your requests to the respective AI providers</li>
              <li>You can delete your keys at any time from Settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">6. Data Storage & Security</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Database</strong>: Supabase (PostgreSQL) with Row Level Security — each tenant can only access their own data</li>
              <li><strong>Hosting</strong>: Vercel (serverless, no persistent servers)</li>
              <li><strong>Encryption</strong>: All data in transit is encrypted via HTTPS/TLS</li>
              <li><strong>Authentication</strong>: Supabase Auth with secure session cookies</li>
              <li><strong>Payments</strong>: Processed by Stripe — we never store credit card information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">7. Data Retention</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Conversation history is retained for the duration of your account</li>
              <li>You can delete individual conversations at any time</li>
              <li>If you close your account, all data is deleted within 30 days</li>
              <li>Billing records are retained as required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">8. Third-Party Services</h2>
            <p>Kairo uses the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Anthropic (Claude)</strong>: AI processing for Kairo AI mode</li>
              <li><strong>OpenAI / Google AI</strong>: AI processing when you use your own keys</li>
              <li><strong>Supabase</strong>: Database and authentication</li>
              <li><strong>Vercel</strong>: Application hosting</li>
              <li><strong>Stripe</strong>: Payment processing</li>
              <li><strong>Resend</strong>: Email delivery</li>
            </ul>
            <p>Each service has its own privacy policy. Your data sent to AI providers (Anthropic, OpenAI, Google) is subject to their respective data processing terms.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">9. Your Rights</h2>
            <p>In accordance with GDPR and applicable regulations, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Access</strong> your personal data</li>
              <li><strong>Rectify</strong> inaccurate data</li>
              <li><strong>Delete</strong> your data ("right to be forgotten")</li>
              <li><strong>Export</strong> your data in a portable format</li>
              <li><strong>Object</strong> to data processing</li>
              <li><strong>Withdraw consent</strong> at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us at <strong>guillaume@ceres.agency</strong>.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">10. Cookies</h2>
            <p>Kairo uses only <strong>essential cookies</strong> for authentication (session management). We do not use tracking cookies, analytics cookies, or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">11. Changes to This Policy</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes via email or in-app notification. Continued use of Kairo after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">12. Contact</h2>
            <p>For any questions about this privacy policy or your data:</p>
            <p>
              Ceres Growth Marketing<br />
              128 rue du Laboratoire, Monaco 98000<br />
              Email: guillaume@ceres.agency
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
