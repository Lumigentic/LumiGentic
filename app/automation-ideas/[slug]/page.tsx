import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, TrendingUp, ExternalLink, Calendar, Zap } from 'lucide-react';
import { AutomationIdeaNav } from './AutomationIdeaNav';
import { getAllAutomationIdeaSlugs, getAutomationIdeaBySlug } from '@/lib/supabase';

// Generate static params for all automation ideas
export async function generateStaticParams() {
  const slugs = await getAllAutomationIdeaSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = await getAutomationIdeaBySlug(slug);

  if (!idea) {
    return {
      title: 'Automation Idea Not Found | LumiGentic',
    };
  }

  return {
    title: `${idea.title} | LumiGentic`,
    description: idea.timeSaved + ' - ' + idea.costSavings,
  };
}

export default async function AutomationIdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = await getAutomationIdeaBySlug(slug);

  if (!idea) {
    notFound();
  }

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
            <span className="px-4 py-2 text-sm font-semibold bg-black text-white rounded-sm">
              {idea.industry}
            </span>
            <span className="px-4 py-2 text-sm font-medium border border-black/20 rounded-sm">
              {idea.difficulty}
            </span>
            <div className="flex items-center gap-1.5 bg-black/5 px-3 py-2 rounded-sm">
              <Zap className="w-4 h-4 text-black" strokeWidth={2} />
              <span className="text-sm font-bold text-black">{idea.roiScore}/10</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            {idea.title}
          </h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-black/5 rounded-sm border border-black/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-black" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-gray-600">Time Saved</span>
              </div>
              <p className="font-bold text-base">{idea.timeSaved}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-black" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-gray-600">Annual Impact</span>
              </div>
              <p className="font-bold text-base">{idea.costSavings}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-black" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-gray-600">Payback Period</span>
              </div>
              <p className="font-bold text-base">{idea.paybackPeriod}</p>
            </div>
            {idea.productivityGain && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-black" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-gray-600">Productivity Gain</span>
                </div>
                <p className="font-bold text-base">{idea.productivityGain}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MDX Content */}
      <article className="pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-black prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={idea.content} />
        </div>

        {/* Metadata Footer */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-black/10 text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              Published {new Date(idea.publishedDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <span className="hidden sm:inline">•</span>
          <Link href="/automation-ideas" className="hover:text-black transition-colors">
            Part of the LumiGentic Automation Idea Browser
          </Link>
          {idea.sourceUrl && (
            <>
              <span className="hidden sm:inline">•</span>
              <a
                href={idea.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-black transition-colors"
              >
                <span>Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Want to implement this automation?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
            Get a bespoke automation report tailored to your business with ROI projections and implementation roadmaps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@lumigentic.com?subject=Discovery Call Request&body=I'm interested in discussing automation opportunities for my organisation."
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-sm hover:bg-gray-100 transition-colors text-center"
            >
              Book a Discovery Call
            </a>
            <a
              href="mailto:info@lumigentic.com?subject=Bespoke Automation Report Request&body=I would like to receive a bespoke automation report for my organisation."
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-sm hover:bg-white/10 transition-colors text-center"
            >
              Get a Bespoke Report
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 LumiGentic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
