import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/login" className="flex items-center gap-2 mb-10">
          <div className="h-6 w-6 rounded bg-[#111] flex items-center justify-center"><span className="text-white text-[9px] font-bold">K</span></div>
          <span className="text-[14px] font-semibold text-[#111]">Kairo</span>
        </Link>

        <h1 className="text-2xl font-bold text-[#111] mb-2">Terms of Service</h1>
        <p className="text-[13px] text-[#999] mb-8">Last updated: March 31, 2026</p>

        <div className="prose prose-sm max-w-none text-[#333] space-y-6 text-[13px] leading-relaxed">

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">1. Service Provider</h2>
            <p>Kairo is provided by <strong>Ceres Growth Marketing</strong>, located at 128 rue du Laboratoire, Monaco 98000. By using Kairo, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">2. Service Description</h2>
            <p>Kairo is an AI-powered RevOps assistant that connects to your business tools (HubSpot, Notion, Lemlist) to provide analytics, insights, and recommendations. The service includes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>AI-powered chat interface for data analysis</li>
              <li>Dashboard creation and management</li>
              <li>Proactive alerts and monitoring</li>
              <li>Action tracking and management</li>
              <li>Report generation and export</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">3. Account & Access</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must provide a valid professional email address to create an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must not share your account with unauthorized users</li>
              <li>We reserve the right to suspend accounts that violate these terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">4. Pricing & Credits</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Free plan</strong>: 50 AI credits per month, no payment required</li>
              <li><strong>Pro plan</strong>: 500 credits/month at 49€/month</li>
              <li><strong>Business plan</strong>: 2,000 credits/month at 149€/month</li>
              <li>Credit packs can be purchased for additional usage</li>
              <li>Unused credits do not roll over to the next billing period</li>
              <li>Subscriptions are billed monthly via Stripe</li>
              <li>You can cancel your subscription at any time from Settings</li>
              <li>Refunds are handled on a case-by-case basis — contact us within 14 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">5. Connected Services</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You authorize Kairo to access your connected tools (HubSpot, Notion, Lemlist) on your behalf</li>
              <li>You are responsible for having proper authorization to connect your company's tools</li>
              <li>Kairo accesses your data in read-only mode by default — write actions (updating deals, creating tasks) require explicit user confirmation</li>
              <li>We are not responsible for data accuracy from connected services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">6. AI-Generated Content</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kairo provides AI-generated insights and recommendations based on your data</li>
              <li>AI outputs are <strong>not financial, legal, or professional advice</strong></li>
              <li>You should verify important decisions with qualified professionals</li>
              <li>We do not guarantee the accuracy of AI-generated analysis</li>
              <li>Kairo may occasionally produce incorrect or incomplete information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">7. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use Kairo for any illegal or unauthorized purpose</li>
              <li>Attempt to bypass credit limits or authentication</li>
              <li>Reverse engineer, decompile, or extract the source code</li>
              <li>Resell or redistribute the service without authorization</li>
              <li>Use the service to harm, harass, or exploit others</li>
              <li>Attempt to manipulate the AI into producing harmful content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">8. Limitation of Liability</h2>
            <p>Kairo is provided "as is" without warranties of any kind. Ceres Growth Marketing is not liable for:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Data loss or corruption in connected services</li>
              <li>Business decisions made based on AI recommendations</li>
              <li>Service interruptions or downtime</li>
              <li>Actions taken by the AI on your behalf (deal updates, task creation)</li>
              <li>Indirect, incidental, or consequential damages</li>
            </ul>
            <p>Our total liability is limited to the amount you paid for the service in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">9. Data Ownership</h2>
            <p>You retain full ownership of your data. Kairo does not claim any rights over your CRM data, conversations, or business information. See our <Link href="/legal/privacy" className="text-[#6366F1] underline">Privacy Policy</Link> for details on data handling.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">10. Termination</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You can close your account at any time</li>
              <li>We may terminate accounts that violate these terms</li>
              <li>Upon termination, your data is deleted within 30 days</li>
              <li>Active subscriptions are canceled with no further charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">11. Governing Law</h2>
            <p>These terms are governed by the laws of the Principality of Monaco. Any disputes will be resolved in the courts of Monaco.</p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#111] mb-2">12. Contact</h2>
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
