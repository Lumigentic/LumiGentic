'use client';

import Image from "next/image";
import { Clock, DollarSign, Clipboard, Map, Shuffle, Search, Route, Rocket, BarChart3, Users, Hospital, Wrench, TrendingUp, Car, Calendar, Coins, Target, Zap, Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Image
            src="/lumigentic-logo.svg"
            alt="LumiGentic"
            width={280}
            height={64}
            priority
            className="w-[200px] h-auto sm:w-[280px]"
          />
          <div className="hidden md:flex gap-8 text-base font-medium">
            <a href="#how-it-works" className="hover:text-gray-700 transition-colors">How It Works</a>
            <a href="#case-studies" className="hover:text-gray-700 transition-colors">Case Studies</a>
            <a href="#market-signals" className="hover:text-gray-700 transition-colors">Market Signals</a>
            <a href="#services" className="hover:text-gray-700 transition-colors">Services</a>
            <a href="#why" className="hover:text-gray-700 transition-colors">Why Us</a>
            <a href="#contact" className="hover:text-gray-700 transition-colors">Contact</a>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-black/10 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-t border-black/10">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#how-it-works"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#case-studies"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </a>
              <a
                href="#market-signals"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Market Signals
              </a>
              <a
                href="#services"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#why"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us
              </a>
              <a
                href="#contact"
                className="block py-3 px-4 bg-black text-black font-semibold rounded hover:bg-gray-800 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="max-w-4xl order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                High-impact automation.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl">
                Solutions that cut wasted time, reduce costs, and scale your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-semibold rounded-sm hover:bg-gray-800 transition-colors text-center"
                >
                  Start Your Journey
                </a>
                <a
                  href="#how-it-works"
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-black/20 font-semibold rounded-sm hover:bg-black/10 transition-colors text-center"
                >
                  See How It Works
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="/digitaltransformation1.webp"
                alt="Digital Transformation"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">The Problem</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">
              Manual processes, bottlenecks, and inefficiencies drain capacity, slow growth, and frustrate teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-6 rounded-sm border border-black/10">
              <Clock className="w-10 h-10 mb-3 text-black" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Manual Admin Barrier</h3>
              <p className="text-gray-600 text-sm">
                40% of UK SMEs cite manual admin as their #1 barrier to growth
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-black/10">
              <DollarSign className="w-10 h-10 mb-3 text-black" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Hidden Costs</h3>
              <p className="text-gray-600 text-sm">
                Storage, errors, delays, and lost revenue pile up
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-black/10">
              <Clipboard className="w-10 h-10 mb-3 text-black" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Wasted Time</h3>
              <p className="text-gray-600 text-sm">
                The average SME employee wastes 6+ hours/week on avoidable tasks
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-black/10">
              <Map className="w-10 h-10 mb-3 text-black" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Inefficient Journeys</h3>
              <p className="text-gray-600 text-sm">
                Bookings, enquiries, or sales processes are inefficient
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-black/10">
              <Shuffle className="w-10 h-10 mb-3 text-black" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Siloed Systems</h3>
              <p className="text-gray-600 text-sm">
                Tools don&apos;t talk to each other, causing duplication and errors
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-black">
              80% of automation ROI is realised in &lt;12 months
            </p>
            <p className="text-lg text-gray-700 mt-4">
              LumiGentic cuts the waste and turns inefficiencies into productivity gains
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Workflow */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">From Bottlenecks to Working Automation</h2>
            <p className="text-base sm:text-lg text-gray-600 italic">
              &quot;We diagnose. We design. We build. We optimise. We empower.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Search,
                title: "Discover inefficiencies",
                subtitle: "Find wasted time, expose efficiencies & bottlenecks",
                deliverable: "Pain point map + immediate action list"
              },
              {
                icon: Route,
                title: "Roadmap",
                subtitle: "Build an automation roadmap",
                deliverable: "Investment case with ROI"
              },
              {
                icon: Rocket,
                title: "Build Fast",
                subtitle: "Deliver working solutions fast",
                deliverable: "Booking systems, invoicing, dashboards, AI copilots"
              },
              {
                icon: BarChart3,
                title: "Scale Impact",
                subtitle: "Scale and Optimise",
                deliverable: "Savings and productivity gains"
              },
              {
                icon: Users,
                title: "Empower Teams",
                subtitle: "Train your team to own it",
                deliverable: "Workshops, training, toolkits"
              }
            ].map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="bg-black/5 p-6 rounded-sm border border-black/10 hover:bg-black/10 transition-colors">
                  <IconComponent className="w-12 h-12 mb-4 text-black" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{step.subtitle}</p>
                  <div className="pt-4 border-t border-black/10">
                    <p className="text-xs text-gray-500 font-semibold">DELIVERABLE</p>
                    <p className="text-sm text-gray-700 mt-1">{step.deliverable}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-gray-600">
              Expose the inefficiencies. Quick wins in weeks. Sharp, prioritised roadmap with ROI case.
              Live systems in weeks, not months. Track ROI, cut errors, expand impact.
              Make your team automation-ready, no consultant dependency.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Case Studies</h2>
            <p className="text-base sm:text-lg text-gray-600">Real impact, delivered.</p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* NHS Case Study */}
            <div className="bg-white rounded-sm border border-black/10 overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Hospital className="w-12 h-12 sm:w-14 sm:h-14 text-black flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">NHS Autism Diagnostic Pathway</h3>
                    <p className="text-sm sm:text-base text-gray-600">Transforming diagnostic efficiency with AI automation</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">Challenge</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-gray-500">•</span>
                        <span>Autism Spectrum Disease diagnostic waits escalating, with ~1,000+ children on list</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500">•</span>
                        <span>Current pathway running at ~2× gold standard (5.8h vs 2.5–3.5h per assessment)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500">•</span>
                        <span>Clinicians doing admin; non-standard reporting</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500">•</span>
                        <span>Core capacity and skill-mix misaligned</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">Solution</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-black">✓</span>
                        <span>Re-engineered pathway to gold standard with AI tools</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-black">✓</span>
                        <span>Speech-to-text, auto-scoring, templated reporting integrated with EHR</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-black">✓</span>
                        <span>Reallocated tasks to Bands 3–5, standardised templates/SOPs</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-black">✓</span>
                        <span>Optimised clinic flow</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-black/10">
                  <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-black">Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="text-center">
                      <Clock className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">~60%</p>
                      <p className="text-sm text-gray-600">Time reduction per assessment (5.8h → ~2.25h)</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">~2.5×</p>
                      <p className="text-sm text-gray-600">Throughput increase with existing workforce</p>
                    </div>
                    <div className="text-center">
                      <Target className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">Hub Model</p>
                      <p className="text-sm text-gray-600">Foundation for Neurodiversity Hub (ASD/ADHD)</p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">£1.5m</p>
                      <p className="text-sm text-gray-600">Net annual contribution (scalable to £4.5m)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SME Case Study */}
            <div className="bg-white rounded-sm border border-black/10 overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Wrench className="w-12 h-12 sm:w-14 sm:h-14 text-black flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Auto Garage - Smart Booking System</h3>
                    <p className="text-sm sm:text-base text-gray-600">Unlocking capacity through intelligent scheduling</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">Challenge</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-gray-500">•</span>
                        <span>Manual booking system limited garage throughput</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500">•</span>
                        <span>2 bays fully utilised, overflow stock of cars waiting</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500">•</span>
                        <span>Storage and cost pressures mounting</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-black">Solution</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-black">✓</span>
                        <span>Bespoke digital booking system aligned demand with capacity</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-black">✓</span>
                        <span>Introduced a third bay through optimised scheduling</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-black">✓</span>
                        <span>Reduced waiting stock and storage costs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-black/10">
                  <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-black">Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="text-center">
                      <TrendingUp className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">40%</p>
                      <p className="text-sm text-gray-600">Efficiency increase in service throughput</p>
                    </div>
                    <div className="text-center">
                      <Car className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">Reduced</p>
                      <p className="text-sm text-gray-600">Car storage costs and improved site safety</p>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">Better</p>
                      <p className="text-sm text-gray-600">Customer experience with predictable turnaround</p>
                    </div>
                    <div className="text-center">
                      <Coins className="w-10 h-10 mb-2 text-black mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-black">Smoother</p>
                      <p className="text-sm text-gray-600">Cash flow and reduced admin load</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Signals */}
      <section id="market-signals" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Market Signals</h2>
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

      {/* What We Do Best */}
      <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-12 sm:mb-16">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">What We Do Best</h2>
              <p className="text-base sm:text-lg text-gray-600">Automation that delivers real results</p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="/digitalautomation1.jpg"
                alt="Digital Automation"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">Process Redesign & Mapping</h3>
              <p className="text-gray-600">Uncover inefficiencies and restructure workflows</p>
            </div>

            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">Automation Strategy</h3>
              <p className="text-gray-600">Define the ROI and prioritise the quick wins</p>
            </div>

            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">AI Integration</h3>
              <p className="text-gray-600">Apply speech-to-text, auto-scoring, and generative AI to real processes</p>
            </div>

            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">Bespoke Automation Builds</h3>
              <p className="text-gray-600">Booking, invoicing, reporting, scheduling systems</p>
            </div>

            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">Custom Dashboards & Analytics</h3>
              <p className="text-gray-600">Real-time performance visibility</p>
            </div>

            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">AI Copilots & Agents</h3>
              <p className="text-gray-600">Handling repetitive tasks and decisions</p>
            </div>

            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">Workflow Integrations</h3>
              <p className="text-gray-600">Connecting tools like Airtable, Power Automate, Python builds</p>
            </div>

            <div className="bg-black/5 p-6 rounded-sm border border-black/10">
              <h3 className="text-xl font-bold mb-3">Training & Capability Uplift</h3>
              <p className="text-gray-600">So clients aren&apos;t dependent on consultants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why LumiGentic */}
      <section id="why" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Why LumiGentic?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed">
              We consult and co-create AI-powered systems that transform processes and shape the future of business.
            </p>
            <p className="text-base text-gray-600 italic">
              Innovation and intelligent optimisation are in our DNA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <div className="bg-white p-6 sm:p-8 rounded-sm border border-black/10">
              <Target className="w-12 h-12 mb-4 text-black" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Proven Track Record</h3>
              <p className="text-gray-700">
                15+ years delivering large-scale transformation and complex AI automation in the public and private sector
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-black/10">
              <DollarSign className="w-12 h-12 mb-4 text-black" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Real Results</h3>
              <p className="text-gray-700">
                £3m+ savings delivered, supply chains built, digital solutions implemented
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-black/10">
              <Zap className="w-12 h-12 mb-4 text-black" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Boutique Scale</h3>
              <p className="text-gray-700">
                Hands-on expertise and rapid delivery - no corporate bureaucracy, just results
              </p>
            </div>

            <div className="bg-white p-8 rounded-sm border border-black/10">
              <Globe className="w-12 h-12 mb-4 text-black" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Scalable Network</h3>
              <p className="text-gray-700">
                Network of developers and automation specialists ready to scale with client needs
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 italic">
              &quot;We build high-impact automation that frees time, reduces costs, and unlocks growth&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-black/10 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Business?</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Let&apos;s discuss how AI automation can drive efficiency and growth in your organization.
          </p>
          <a
            href="mailto:info@lumigentic.com"
            className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-black text-white text-base sm:text-lg font-semibold rounded-sm hover:bg-gray-800 transition-colors"
          >
            Get in Touch
          </a>
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
