import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, DollarSign, TrendingUp, Wrench, ExternalLink, Calendar } from 'lucide-react';
import { AutomationIdeaNav } from './AutomationIdeaNav';

// Static data for now - will be replaced with dynamic MDX content
const automationIdeasData: Record<string, any> = {
  'automate-patient-referral-processing-nhs': {
    title: 'Automate Patient Referral Processing with Microsoft Power Platform',
    industry: 'Healthcare',
    difficulty: 'Medium',
    roiScore: 9,
    timeSaved: '17 minutes per referral',
    costSavings: '226 days of work annually',
    paybackPeriod: '4-6 months',
    tools: ['Microsoft Power Platform', 'Power Automate', 'Power Apps'],
    publishedDate: '2025-01-24',
    sourceUrl: 'https://www.digpacks.co.uk/resources/nhs-case-study-with-microsoft',
    content: {
      problem: 'NHS Berkshire Healthcare Trust was processing hundreds of patient referrals each week, with each referral taking an average of 20 minutes to complete manually. Staff had to navigate multiple systems, manually enter data across platforms, and ensure accuracy whilst managing high volumes. This created significant administrative burden, taking clinicians and administrators away from patient care.',
      solution: [
        'Microsoft Power Platform Assessment - Evaluated existing workflows',
        'Power Automate Workflow Design - Built automated workflows',
        'Power Apps Interface Creation - Developed custom app',
        'System Integration - Connected to existing NHS systems',
        'Automated Data Capture - Implemented automatic observation recording',
        'Testing and Deployment - Piloted and scaled Trust-wide'
      ],
      considerations: [
        'NHS data standards and Information Governance compliance required',
        'Integration with existing patient management systems (8-12 weeks)',
        'Staff training and change management essential',
        'GDPR and NHS Digital Technology Assessment Criteria compliance'
      ],
      proof: 'NHS Berkshire Healthcare Trust reduced processing time from 20 minutes to 2 minutes 20 seconds per referral, saving 226 days of work annually and recording 65,000+ patient observations with improved accuracy.',
    }
  },
  'ai-chatbot-customer-service-cost-reduction': {
    title: 'AI Chatbot for Customer Service - Reduce Costs by 30%',
    industry: 'Contact Center',
    difficulty: 'Medium',
    roiScore: 9,
    timeSaved: '70-85% of routine queries automated',
    costSavings: '30% reduction in operational costs',
    paybackPeriod: '6-9 months',
    productivityGain: 'Equivalent to 700 FTE agents (Klarna)',
    tools: ['AI Chatbot Platform', 'Natural Language Processing', 'RAG', 'CRM Integration'],
    publishedDate: '2025-01-24',
    sourceUrl: 'https://www.fullview.io/blog/ai-customer-service-stats',
    content: {
      problem: 'Contact centres face relentless pressure with 60-70% of budgets spent on staffing. Agents are overwhelmed with repetitive queries whilst customers wait 11+ minutes for simple answers. During peak seasons, businesses struggle with 68% higher staffing needs, dramatically inflating costs.',
      solution: [
        'AI Platform Selection - Choose RAG-enabled chatbot platform',
        'Knowledge Base Integration - Connect to existing documentation',
        'Conversational Flow Design - Map common customer journeys',
        'Multi-Channel Deployment - Deploy across website, mobile, WhatsApp',
        'Human Handoff Configuration - Set intelligent escalation rules',
        'Continuous Learning - Implement feedback loops for AI improvement'
      ],
      considerations: [
        'Initial training requires 2-4 weeks to build knowledge base',
        'Quality assurance essential for customer experience',
        'Human oversight needed during first 3-6 months',
        'GDPR compliance required for customer data',
        'Change management for agents transitioning roles'
      ],
      proof: 'Klarna: AI performs equivalent work of 700 FTE agents, £40M profit improvement, resolution time from 11min to <2min. Walmart: 70% of cases processed, 50% reduction in handling times. Industry average: 30% operational cost reduction.',
    }
  },
  'intelligent-invoice-processing-finance-automation': {
    title: 'Intelligent Invoice Processing - Save 25,000 Hours Annually',
    industry: 'Finance',
    difficulty: 'Medium',
    roiScore: 9,
    timeSaved: '25,000 hours annually',
    costSavings: '£878,000 per year',
    paybackPeriod: '6-8 months',
    productivityGain: 'Equivalent to 12 full-time employees',
    tools: ['Intelligent Document Processing (IDP)', 'OCR', 'Machine Learning', 'ERP Integration'],
    publishedDate: '2025-01-24',
    sourceUrl: 'https://www.docsumo.com/blogs/intelligent-document-processing/intelligent-document-processing-market-report-2025',
    content: {
      problem: 'Finance teams drown in invoice chaos. A typical mid-sized organisation processes hundreds to thousands of invoices monthly with manual data entry that is painfully slow (48 hours per batch), error-prone, and soul-crushing. Gartner research shows a 40-person finance team wastes 25,000 hours annually—equivalent to 12 full-time employees doing nothing but data entry.',
      solution: [
        'IDP Platform Selection - Choose AI-powered OCR solution',
        'Invoice Capture Automation - Set up automatic ingestion',
        'Data Extraction with AI - Deploy ML models for extraction',
        'Validation and Matching - Automatically match invoices to POs',
        'Approval Workflow Automation - Route to appropriate approvers',
        'ERP System Integration - Push data to accounting systems',
        'Exception Handling - Flag anomalies for human review'
      ],
      considerations: [
        'Initial AI training requires 500-1,000 sample invoices (2-4 weeks)',
        'ERP integration complexity varies (QuickBooks=2wks, SAP=6-8wks)',
        'Change management crucial to address job security concerns',
        'Data security essential for sensitive financial information',
        'Hybrid approach recommended: automate 85-90%, human review for complex invoices'
      ],
      proof: 'Gartner: 40-person finance teams save 25,000 hours annually (£878k). Healthcare data aggregator: 70% cost savings, processing from 48hrs to <1 second. 93% of CFOs report shorter processing times with automation. McKinsey: 60%+ of finance activities can be automated.',
    }
  }
};

// Generate static paths for all automation ideas
export function generateStaticParams() {
  return Object.keys(automationIdeasData).map((slug) => ({
    slug,
  }));
}

export default function AutomationIdeaPage({ params }: { params: { slug: string } }) {
  const idea = automationIdeasData[params.slug];

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Automation idea not found</h1>
          <Link href="/automation-ideas" className="text-blue-600 hover:underline">
            ← Back to all ideas
          </Link>
        </div>
      </div>
    );
  }

  const difficultyColor = {
    Easy: 'text-green-600 bg-green-50',
    Medium: 'text-yellow-600 bg-yellow-50',
    Hard: 'text-red-600 bg-red-50',
  }[idea.difficulty] || 'text-gray-600 bg-gray-50';

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navigation */}
      <AutomationIdeaNav />

      {/* Back Button */}
      <div className="pt-24 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/automation-ideas"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all automation ideas</span>
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <span className="px-4 py-2 text-sm font-medium bg-black text-white rounded">
              {idea.industry}
            </span>
            <span className={`px-4 py-2 text-sm font-medium rounded ${difficultyColor}`}>
              {idea.difficulty}
            </span>
            <div className="flex items-center gap-1 text-amber-600">
              <span className="text-sm font-medium mr-1">ROI Score:</span>
              {Array.from({ length: Math.min(5, Math.ceil(idea.roiScore / 2)) }).map((_, i) => (
                <TrendingUp key={i} className="w-4 h-4" />
              ))}
              <span className="text-sm font-medium ml-1">{idea.roiScore}/10</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            {idea.title}
          </h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-lg">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Time Saved</span>
              </div>
              <p className="font-semibold">{idea.timeSaved}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Annual Impact</span>
              </div>
              <p className="font-semibold">{idea.costSavings}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Payback Period</span>
              </div>
              <p className="font-semibold">{idea.paybackPeriod}</p>
            </div>
            {idea.productivityGain && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Productivity Gain</span>
                </div>
                <p className="font-semibold text-sm">{idea.productivityGain}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
          {/* Problem */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">🎯 The Problem</h2>
            <p className="text-gray-700 leading-relaxed">{idea.content.problem}</p>
          </section>

          {/* Solution */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">💡 The Automation</h2>
            <p className="text-gray-700 mb-4">How this automation works:</p>
            <ol className="space-y-3">
              {idea.content.solution.map((step: string, index: number) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{step.split(' - ')[0]}</span>
                  {step.includes(' - ') && <span> - {step.split(' - ')[1]}</span>}
                </li>
              ))}
            </ol>
          </section>

          {/* Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">🔧 Tools Required</h2>
            <div className="flex flex-wrap gap-3">
              {idea.tools.map((tool: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium inline-flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {/* Implementation Considerations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">⚠️ Implementation Considerations</h2>
            <ul className="space-y-2">
              {idea.content.considerations.map((consideration: string, index: number) => (
                <li key={index} className="text-gray-700 flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Proof & Signals */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">✅ Proof & Signals</h2>
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-gray-800 leading-relaxed">{idea.content.proof}</p>
              <a
                href={idea.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:underline font-medium"
              >
                <span>View Source</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 p-8 bg-black text-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to explore this for your organisation?</h2>
            <p className="text-gray-300 mb-6">
              Get a bespoke automation report tailored to your business with detailed ROI projections and implementation roadmaps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#contact"
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                Book a Discovery Call
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
              >
                Get a Bespoke Report
              </Link>
            </div>
          </section>

          {/* Metadata */}
          <div className="mt-8 pt-8 border-t border-black/10 text-sm text-gray-600 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Published {new Date(idea.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <span>•</span>
            <Link href="/automation-ideas" className="hover:text-black transition-colors">
              Part of the LumiGentic Automation Idea Browser
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 LumiGentic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
