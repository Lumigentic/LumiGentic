'use client';

import Image from "next/image";
import { Clock, DollarSign, Clipboard, Map, Shuffle, Search, Route, Rocket, BarChart3, Users, Hospital, Wrench, TrendingUp, Car, Calendar, Coins, Target, Zap, Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Image
            src="/edgelabs-logo.png"
            alt="EdgeLabs"
            width={140}
            height={32}
            priority
            className="invert sm:w-[180px] sm:h-[40px]"
          />
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#how-it-works" className="hover:text-gray-300 transition-colors">How It Works</a>
            <a href="#case-studies" className="hover:text-gray-300 transition-colors">Case Studies</a>
            <a href="#services" className="hover:text-gray-300 transition-colors">Services</a>
            <a href="#why" className="hover:text-gray-300 transition-colors">Why Us</a>
            <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#how-it-works"
                className="block py-3 px-4 hover:bg-white/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#case-studies"
                className="block py-3 px-4 hover:bg-white/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </a>
              <a
                href="#services"
                className="block py-3 px-4 hover:bg-white/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#why"
                className="block py-3 px-4 hover:bg-white/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Us
              </a>
              <a
                href="#contact"
                className="block py-3 px-4 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-40 md:pt-48 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              High-impact automation.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl">
              Solutions that cut wasted time, reduce costs, and scale your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-sm hover:bg-gray-200 transition-colors text-center"
              >
                Start Your Journey
              </a>
              <a
                href="#how-it-works"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 font-semibold rounded-sm hover:bg-white/10 transition-colors text-center"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">The Problem</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">
              Manual processes, bottlenecks, and inefficiencies drain capacity, slow growth, and frustrate teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <div className="bg-black/50 p-6 rounded-sm border border-white/10">
              <Clock className="w-10 h-10 mb-3 text-white" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Manual Admin Barrier</h3>
              <p className="text-gray-400 text-sm">
                40% of UK SMEs cite manual admin as their #1 barrier to growth
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-sm border border-white/10">
              <DollarSign className="w-10 h-10 mb-3 text-white" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Hidden Costs</h3>
              <p className="text-gray-400 text-sm">
                Storage, errors, delays, and lost revenue pile up
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-sm border border-white/10">
              <Clipboard className="w-10 h-10 mb-3 text-white" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Wasted Time</h3>
              <p className="text-gray-400 text-sm">
                The average SME employee wastes 6+ hours/week on avoidable tasks
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-sm border border-white/10">
              <Map className="w-10 h-10 mb-3 text-white" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Inefficient Journeys</h3>
              <p className="text-gray-400 text-sm">
                Bookings, enquiries, or sales processes are inefficient
              </p>
            </div>

            <div className="bg-black/50 p-6 rounded-sm border border-white/10">
              <Shuffle className="w-10 h-10 mb-3 text-white" strokeWidth={1.5} />
              <h3 className="text-lg font-bold mb-2">Siloed Systems</h3>
              <p className="text-gray-400 text-sm">
                Tools don&apos;t talk to each other, causing duplication and errors
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              80% of automation ROI is realised in &lt;12 months
            </p>
            <p className="text-lg text-gray-300 mt-4">
              EdgeLab cuts the waste and turns inefficiencies into productivity gains
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Workflow */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">From Bottlenecks to Working Automation</h2>
            <p className="text-lg sm:text-xl text-gray-400 italic">
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
                <div key={idx} className="bg-white/5 p-6 rounded-sm border border-white/10 hover:bg-white/10 transition-colors">
                  <IconComponent className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{step.subtitle}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 font-semibold">DELIVERABLE</p>
                    <p className="text-sm text-gray-300 mt-1">{step.deliverable}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-gray-400">
              Expose the inefficiencies. Quick wins in weeks. Sharp, prioritised roadmap with ROI case.
              Live systems in weeks, not months. Track ROI, cut errors, expand impact.
              Make your team automation-ready, no consultant dependency.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/10 bg-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Case Studies</h2>
            <p className="text-lg sm:text-xl text-gray-400">Real impact, delivered.</p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* NHS Case Study */}
            <div className="bg-black/50 rounded-sm border border-white/10 overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Hospital className="w-12 h-12 sm:w-14 sm:h-14 text-white flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">NHS Autism Diagnostic Pathway</h3>
                    <p className="text-sm sm:text-base text-gray-400">Transforming diagnostic efficiency with AI automation</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Challenge</h4>
                    <ul className="space-y-2 text-gray-300">
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
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Solution</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex gap-2">
                        <span className="text-white">✓</span>
                        <span>Re-engineered pathway to gold standard with AI tools</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-white">✓</span>
                        <span>Speech-to-text, auto-scoring, templated reporting integrated with EHR</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-white">✓</span>
                        <span>Reallocated tasks to Bands 3–5, standardised templates/SOPs</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-white">✓</span>
                        <span>Optimised clinic flow</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="text-center">
                      <Clock className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">~60%</p>
                      <p className="text-sm text-gray-400">Time reduction per assessment (5.8h → ~2.25h)</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">~2.5×</p>
                      <p className="text-sm text-gray-400">Throughput increase with existing workforce</p>
                    </div>
                    <div className="text-center">
                      <Target className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">Hub Model</p>
                      <p className="text-sm text-gray-400">Foundation for Neurodiversity Hub (ASD/ADHD)</p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">£1.5m</p>
                      <p className="text-sm text-gray-400">Net annual contribution (scalable to £4.5m)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SME Case Study */}
            <div className="bg-black/50 rounded-sm border border-white/10 overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Wrench className="w-12 h-12 sm:w-14 sm:h-14 text-white flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">Auto Garage - Smart Booking System</h3>
                    <p className="text-sm sm:text-base text-gray-400">Unlocking capacity through intelligent scheduling</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Challenge</h4>
                    <ul className="space-y-2 text-gray-300">
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
                    <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Solution</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex gap-2">
                        <span className="text-white">✓</span>
                        <span>Bespoke digital booking system aligned demand with capacity</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-white">✓</span>
                        <span>Introduced a third bay through optimised scheduling</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-white">✓</span>
                        <span>Reduced waiting stock and storage costs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="text-center">
                      <TrendingUp className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">40%</p>
                      <p className="text-sm text-gray-400">Efficiency increase in service throughput</p>
                    </div>
                    <div className="text-center">
                      <Car className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">Reduced</p>
                      <p className="text-sm text-gray-400">Car storage costs and improved site safety</p>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">Better</p>
                      <p className="text-sm text-gray-400">Customer experience with predictable turnaround</p>
                    </div>
                    <div className="text-center">
                      <Coins className="w-10 h-10 mb-2 text-white mx-auto" strokeWidth={1.5} />
                      <p className="text-2xl font-bold text-white">Smoother</p>
                      <p className="text-sm text-gray-400">Cash flow and reduced admin load</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Best */}
      <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">What We Do Best</h2>
            <p className="text-lg sm:text-xl text-gray-400">Automation that delivers real results</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">Process Redesign & Mapping</h3>
              <p className="text-gray-400">Uncover inefficiencies and restructure workflows</p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">Automation Strategy</h3>
              <p className="text-gray-400">Define the ROI and prioritise the quick wins</p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">AI Integration</h3>
              <p className="text-gray-400">Apply speech-to-text, auto-scoring, and generative AI to real processes</p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">Bespoke Automation Builds</h3>
              <p className="text-gray-400">Booking, invoicing, reporting, scheduling systems</p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">Custom Dashboards & Analytics</h3>
              <p className="text-gray-400">Real-time performance visibility</p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">AI Copilots & Agents</h3>
              <p className="text-gray-400">Handling repetitive tasks and decisions</p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">Workflow Integrations</h3>
              <p className="text-gray-400">Connecting tools like Airtable, Power Automate, Python builds</p>
            </div>

            <div className="bg-white/5 p-6 rounded-sm border border-white/10">
              <h3 className="text-xl font-bold mb-3">Training & Capability Uplift</h3>
              <p className="text-gray-400">So clients aren&apos;t dependent on consultants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why EdgeLabs */}
      <section id="why" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/10 bg-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Why EdgeLabs?</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed">
              We consult and co-create AI-powered systems that transform processes and shape the future of business.
            </p>
            <p className="text-lg text-gray-400 italic">
              Innovation and intelligent optimisation are in our DNA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            <div className="bg-black/50 p-6 sm:p-8 rounded-sm border border-white/10">
              <Target className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Proven Track Record</h3>
              <p className="text-gray-300">
                15+ years delivering large-scale transformation and complex AI automation in the public and private sector
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-sm border border-white/10">
              <DollarSign className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Real Results</h3>
              <p className="text-gray-300">
                £3m+ savings delivered, supply chains built, digital solutions implemented
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-sm border border-white/10">
              <Zap className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Boutique Scale</h3>
              <p className="text-gray-300">
                Hands-on expertise and rapid delivery - no corporate bureaucracy, just results
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-sm border border-white/10">
              <Globe className="w-12 h-12 mb-4 text-white" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-3">Scalable Network</h3>
              <p className="text-gray-300">
                Network of developers and automation specialists ready to scale with client needs
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 italic">
              &quot;We build high-impact automation that frees time, reduces costs, and unlocks growth&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 border-t border-white/10 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8">
            Let&apos;s discuss how AI automation can drive efficiency and growth in your organization.
          </p>
          <a
            href="mailto:hello@edgelabs.io"
            className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-white text-black text-base sm:text-lg font-semibold rounded-sm hover:bg-gray-200 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EdgeLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
