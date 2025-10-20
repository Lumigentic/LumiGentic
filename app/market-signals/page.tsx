'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MarketSignals() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <Image
              src="/lumigentic-logo.svg"
              alt="LumiGentic"
              width={280}
              height={64}
              priority
              className="w-[200px] h-auto sm:w-[280px]"
            />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Market Signals</h1>
            <p className="text-lg sm:text-xl text-gray-600 italic mb-6">
              Where data meets disruption - insights from the front lines of AI adoption.
            </p>
            <p className="text-base sm:text-lg text-gray-700 max-w-4xl">
              From customer service copilots to process automation in logistics and finance, we track how AI adoption drives measurable impact. These market cases highlight the patterns shaping intelligent business today.
            </p>
          </div>

          {/* Stories */}
          <div className="space-y-8">
            {/* Story 1: Contact-centre Copilot */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Contact-centre Copilot: &quot;Assist, don&apos;t replace&quot;
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Imagine a large global enterprise with dozens of call-centres handling thousands of chats and calls daily. Their biggest bottleneck: junior agents who are slower, more error-prone, and need intensive ramping. To close the gap, the company deployed an AI &quot;agent assist&quot; tool: as agents chat or talk with customers, the system listens, surfaces relevant policies and past cases, drafts response suggestions, and recommends next steps.
                </p>

                <p>
                  The result? Agents, especially newer ones, start working closer to &quot;expert mode.&quot; In the field, that translated to <strong>~14% higher issue resolution per hour</strong>, with <strong>&gt;30% gains for novices</strong>. (The study is documented in an NBER working paper.)
                </p>

                <p>
                  <strong>Why it worked:</strong> The AI doesn&apos;t replace the agent—it <strong>amplifies</strong> them by reducing lookup time, easing context switching, and embedding best practices in real time.
                </p>

                <div>
                  <p className="font-bold mb-2">Key points:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>&quot;Assist, not replace&quot; is safer and trustable.</li>
                    <li>ROI comes from time saved + fewer escalations + lower hiring/training overhead.</li>
                    <li>Control and measure via staged rollouts + A/B testing.</li>
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Automation
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Augmentation
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Efficiency
                </div>
              </div>
              </div>
            </div>

            {/* Story 2: Klarna Support Automation */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                End-to-End Support Automation (Klarna)
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Klarna&apos;s vision was bold: could their AI take over the bulk of support inquiries <em>across markets</em>? They launched a generative assistant that understood order systems, refunds, return logic, SKU mapping, policy rules—and could reply autonomously for many cases.
                </p>

                <p>
                  Within its first month, it handled <strong>two out of every three chats</strong>. Behind the scenes, each chat required orchestration: LLM layers for intent, retrieval of order/support history, and fallback to human agents for edge cases.
                </p>

                <div>
                  <p className="font-bold mb-2">Impact:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Equivalent capacity of ~700 human agents.</li>
                    <li>Response times collapsed from ~11 minutes to &lt;2 minutes.</li>
                    <li>Repeat contact rates dropped by ~25%.</li>
                  </ul>
                </div>

                <p>
                  <strong>Why it worked:</strong> Klarna had access to rich structured and unstructured data (orders, customer history, policy docs), and they carefully scoped to only automate the <em>frequent, well-understood cases</em> first.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Autonomy
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Orchestration
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Speed
                </div>
              </div>
              </div>
            </div>

            {/* Story 3: Developer Copilot */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Developer Copilot: Keeping devs in the flow
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Dev teams deployed GitHub Copilot (or equivalent) to help with boilerplate, scaffolding, test generation, doc comments, and patch refactors. Because devs often lose flow when switching between code, tests and docs, the headroom is big. User studies and telemetry show <strong>up to 55% faster performance</strong> on repeated tasks; in many teams, 30–50% of code is being touched or suggested by Copilot.
                </p>

                <p>
                  <strong>Core insight:</strong> much of software work is repetitive pattern recognition. By training on open repos + private internal repo fine-tuning, Copilot learns what <em>you</em> expect.
                </p>

                <div>
                  <p className="font-bold mb-2">Key takeaways:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Productivity gains stack over time (less context switching).</li>
                    <li>It works best when your org has consistent coding standards and conventions.</li>
                    <li>Monitor for hallucination or security drift; wrap with code review and policy checks.</li>
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Productivity
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Flow
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Precision
                </div>
              </div>
              </div>
            </div>

            {/* Story 4: Microsoft 365 Copilot */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Microsoft 365 Copilot for Government
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  In a UK government pilot involving ~20,000 civil servants, Microsoft inserted Copilot into Word, Excel, PowerPoint, and Outlook. Tasks ranged from summarising meeting notes, drafting responses, generating slide decks, to email triage. According to the report, users saved <strong>~26 minutes per day</strong> — equivalent to <strong>2 weeks of work per year</strong> per person. Over time, the knock-on effect is less overtime, fewer handoffs, better consistency.
                </p>

                <div>
                  <p className="font-bold mb-2">Why this was effective:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>It attacks the &quot;office drag&quot; of summarising, formatting, searching.</li>
                    <li>Because it&apos;s embedded in day-to-day tools, adoption friction is low.</li>
                    <li>The pilot also gauged adoption via logs, surveys, and qualitative feedback.</li>
                  </ul>
                </div>

                <p className="italic">
                  &quot;Liberating knowledge workers from administrative drag using tools they already love.&quot;
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Productivity
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Adoption
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Insight
                </div>
              </div>
              </div>
            </div>

            {/* Story 5: Amazon AI + Robotics */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Amazon&apos;s Next-Gen AI + Robotics
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Amazon keeps pushing the envelope: combining computer vision, path optimization, AI slotting, robots, and worker interfaces to streamline fulfillment center throughput. Cameras identify items, robots shuttle goods, and the system continuously adjusts slot assignments based on demand patterns.
                </p>

                <p>
                  They report up to <strong>25% reductions in processing time</strong> in upgraded sites, higher accuracy, and faster shipping windows.
                </p>

                <div>
                  <p className="font-bold mb-2">Key points:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>This isn&apos;t just more robots—it&apos;s <strong>AI orchestration</strong> that ties robotics + vision + demand forecasting into a feedback loop.</li>
                    <li>The investment is heavy, but the delta per order is high in high-volume operations.</li>
                    <li>It&apos;s defensible: once integrated, switching costs (data, process, robotics) are high.</li>
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Orchestration
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Precision
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Scale
                </div>
              </div>
              </div>
            </div>

            {/* Story 6: John Lewis DC Modernisation */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                John Lewis DC Modernisation
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  John Lewis deployed goods-to-person systems, automated vertical storage, and robotics in its distribution center. The story: ahead of Christmas, they needed to scale without simply hiring a ton of seasonal staff. The automation enabled <strong>75% more storage density</strong> and smoothed throughput peaks.
                </p>

                <p>
                  This kind of case is powerful to show: <strong>retailers can modernise not just for cost, but for capacity and resilience in peak seasons</strong>.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Capacity
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Resilience
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Optimisation
                </div>
              </div>
              </div>
            </div>

            {/* Story 7: Lemonade's Instant Claims */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Lemonade&apos;s Instant Claims
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Lemonade built &quot;Jim,&quot; an AI claims bot that ingests a customer&apos;s submission (photos, policy data, text), runs instant fraud/eligibility checks, and — in many cases — approves and pays the claim in seconds. While the headline &quot;3-second claim&quot; is attention-grabbing, the deeper value is in <strong>cost of service</strong> reduction and building trust via transparent AI.
                </p>

                <p>
                  They report ~30–40% of claims as instantly approved: every one you don&apos;t have to staff reduces cost and friction.
                </p>

                <div>
                  <p className="font-bold mb-2">Why it worked:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>The domain is narrow (simple, predictable claims).</li>
                    <li>Users accept digital interactions.</li>
                    <li>The ROI is in reduced manual review, fraud catch, and happier customers.</li>
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Trust
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Speed
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Transparency
                </div>
              </div>
              </div>
            </div>

            {/* Story 8: Zurich's CAT Claims Triage */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Zurich&apos;s CAT Claims Triage (CATIA)
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Zurich built a system to ingest catastrophe (CAT) claims (surge events) and automatically classify them in minutes. Using NLP over customer descriptions, photos, geospatial data, and policy metadata, CATIA flags which claims are &quot;high severity,&quot; routes them to the right adjusters, and accelerates reserve decisions and reinsurance processes.
                </p>

                <div>
                  <p className="font-bold mb-2">Impact:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Minutes-level triage saves days of delay in disaster zones.</li>
                    <li>Better accuracy early reduces over- or under-reserving.</li>
                    <li>More consistent handling across geographies.</li>
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Accuracy
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Speed
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Consistency
                </div>
              </div>
              </div>
            </div>

            {/* Story 9: Process Mining + Automation */}
            <div className="relative overflow-hidden text-white rounded-lg shadow-lg">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/casestudybackground.jpg"
                  alt=""
                  fill
                  className="object-cover blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
              <div className="relative z-10 p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Process Mining + Automation in Finance Ops
              </h3>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                <p>
                  Using tools like Celonis or Process Intelligence (PI), organizations feed execution logs (ERP, CRM, workflow engines) into a miner. The miner reveals rework loops, bottlenecks, manual deviations, and exception paths. The team then prioritises high-leverage nodes (e.g. invoice exceptions, credit holds, multi-touch orders) and automates or semi-automates them with bots, microservices, or workflow logic.
                </p>

                <p>
                  In studies, such firms saw <strong>~383% 3-year ROI</strong> and typical payback in ~6 months. Many cite <strong>millions in annual savings</strong> and working capital release via lower processing times. (These are in vendor TEI studies and independent clients.)
                </p>

                <p>
                  <strong>Lessons:</strong> start with &quot;where you leak value,&quot; not shiny tools.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Insight
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  Optimisation
                </div>
                <div className="bg-[#e5e5e5] text-[#0d0d0d] px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium flex-1 sm:flex-initial min-w-0 sm:min-w-[120px] text-center">
                  ROI
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} LumiGentic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
