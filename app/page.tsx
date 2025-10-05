import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image
            src="/edgelabs-logo.png"
            alt="EdgeLabs"
            width={180}
            height={40}
            priority
            className="invert"
          />
          <div className="flex gap-8 text-sm">
            <a href="#services" className="hover:text-gray-300 transition-colors">Services</a>
            <a href="#approach" className="hover:text-gray-300 transition-colors">Approach</a>
            <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              AI Automation
              <br />
              <span className="text-gray-400">That Actually Works</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
              We combine consultancy expertise with scalable SaaS solutions to transform your business processes through intelligent automation.
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-black font-semibold rounded-sm hover:bg-gray-200 transition-colors"
              >
                Start Your Journey
              </a>
              <a
                href="#services"
                className="px-8 py-4 border border-white/20 font-semibold rounded-sm hover:bg-white/10 transition-colors"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Model */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Operating Model</h2>
            <p className="text-xl text-gray-400">Consultancy + SaaS</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="aspect-square bg-white/5 rounded-sm p-8 border border-white/10">
                <div className="text-6xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold mb-4">Dual Revenue Engine</h3>
                <p className="text-gray-400">
                  Leverages consultancy for high-value, upfront revenue and SaaS for scalable, recurring income — creating resilience and flexibility in business operations.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-square bg-white/5 rounded-sm p-8 border border-white/10">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold mb-4">Structured Client Journey</h3>
                <p className="text-gray-400">
                  Every client moves from discovery to strategy, custom build, and into ongoing value — creating a natural upsell path into support or SaaS offerings.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-square bg-white/5 rounded-sm p-8 border border-white/10">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-2xl font-bold mb-4">Repeatable Innovation</h3>
                <p className="text-gray-400">
                  Insights and demand patterns from consultancy projects feed into SaaS product ideation — enabling validated, low-risk product development.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="aspect-square bg-white/5 rounded-sm p-8 border border-white/10">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-2xl font-bold mb-4">Scalable without Overhead</h3>
                <p className="text-gray-400">
                  SaaS spin-offs scale without needing proportional increases in delivery effort — decoupling growth from headcount and time.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-300 leading-relaxed">
              This operating model is built to combine the best of both worlds: consultancy cash flow and SaaS scalability.
              By starting with service-based engagements, the business can secure revenue while building trust and deeply understanding client pain points.
              Each project follows a structured flow — from discovery workshops to automation strategy, then into solution delivery and long-term support.
              When patterns emerge, those custom solutions become the seedbed for SaaS offerings that are already validated by real demand.
            </p>
          </div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section id="services" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Revenue Streams</h2>
            <p className="text-xl text-gray-400">From Consultancy to SaaS</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 rounded-sm p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-3">Discovery & Process Mapping</h3>
              <p className="text-gray-400 mb-4">
                Entry-level engagement to diagnose workflows and identify pain points. Formats include workshops and interviews.
              </p>
              <p className="text-sm text-gray-500">Priced from £2K (SME) to £40K (mid-size)</p>
            </div>

            <div className="bg-white/5 rounded-sm p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-3">Automation Roadmap & AI Strategy</h3>
              <p className="text-gray-400 mb-4">
                Develops prioritised automation plans with cost/benefit models. Delivered as a roadmap report.
              </p>
              <p className="text-sm text-gray-500">Fees range from £5K to £50K+</p>
            </div>

            <div className="bg-white/5 rounded-sm p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-3">AI Architecture & Custom Build</h3>
              <p className="text-gray-400 mb-4">
                Design and build bespoke automation tools (e.g., booking systems, dashboards) using platforms like Python, Bubble, Airtable.
              </p>
              <p className="text-sm text-gray-500">Priced up to £100K+</p>
            </div>

            <div className="bg-white/5 rounded-sm p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-3">Support & Retainers</h3>
              <p className="text-gray-400 mb-4">
                Ongoing client support, training, and optimisation on monthly retainers.
              </p>
              <p className="text-sm text-gray-500">From £1K to £20K</p>
            </div>

            <div className="bg-white/5 rounded-sm p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <h3 className="text-2xl font-bold mb-3">SaaS Productisation</h3>
              <p className="text-gray-400 mb-4">
                Repeatable solutions are spun off into subscription-based SaaS products, generating scalable recurring income.
              </p>
              <p className="text-sm text-gray-500">From £50 to £1,000/month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section id="approach" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Client Journey</h2>
            <p className="text-xl text-gray-400">From Consulting to Scalable SaaS</p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Acquire Client",
                desc: "Begin with a consultancy engagement — setting expectations and opening up the value journey."
              },
              {
                step: "2",
                title: "Discovery",
                desc: "Paid discovery phase involving deep-dive workshops and process mapping to reveal automation opportunities."
              },
              {
                step: "3",
                title: "Strategy Roadmap",
                desc: "Deliver a prioritised automation strategy, with ROI models and tool recommendations."
              },
              {
                step: "4",
                title: "Build & Deliver",
                desc: "Custom automation or product development based on roadmap priorities, delivered via agile cycles."
              },
              {
                step: "5",
                title: "Retain or Productise",
                desc: "Clients either enter support retainers or get offered SaaS solutions derived from repeatable builds."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-white text-black rounded-sm flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how AI automation can drive efficiency and growth in your organization.
          </p>
          <a
            href="mailto:hello@edgelabs.io"
            className="inline-block px-12 py-5 bg-white text-black text-lg font-semibold rounded-sm hover:bg-gray-200 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EdgeLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
