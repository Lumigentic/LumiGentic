import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, TrendingUp, ExternalLink, Calendar } from 'lucide-react';
import { AutomationIdeaNav } from './AutomationIdeaNav';
import { getAllIdeaSlugs, getSerializedIdea } from '@/lib/mdx';

// Generate static params for all automation ideas
export async function generateStaticParams() {
  const slugs = getAllIdeaSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = await getSerializedIdea(slug);

  if (!idea) {
    return {
      title: 'Automation Idea Not Found | LumiGentic',
    };
  }

  return {
    title: `${idea.frontmatter.title} | LumiGentic`,
    description: idea.frontmatter.timeSaved + ' - ' + idea.frontmatter.costSavings,
  };
}

export default async function AutomationIdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = await getSerializedIdea(slug);

  if (!idea) {
    notFound();
  }

  const { frontmatter, mdxSource } = idea;

  const difficultyColor = {
    Easy: 'text-green-600 bg-green-50',
    Medium: 'text-yellow-600 bg-yellow-50',
    Hard: 'text-red-600 bg-red-50',
  }[frontmatter.difficulty] || 'text-gray-600 bg-gray-50';

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
              {frontmatter.industry}
            </span>
            <span className={`px-4 py-2 text-sm font-medium rounded ${difficultyColor}`}>
              {frontmatter.difficulty}
            </span>
            <div className="flex items-center gap-1 text-amber-600">
              <span className="text-sm font-medium mr-1">ROI Score:</span>
              {Array.from({ length: Math.min(5, Math.ceil(frontmatter.roiScore / 2)) }).map((_, i) => (
                <TrendingUp key={i} className="w-4 h-4" />
              ))}
              <span className="text-sm font-medium ml-1">{frontmatter.roiScore}/10</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            {frontmatter.title}
          </h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-lg">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Time Saved</span>
              </div>
              <p className="font-semibold text-sm">{frontmatter.timeSaved}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Annual Impact</span>
              </div>
              <p className="font-semibold text-sm">{frontmatter.costSavings}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Payback Period</span>
              </div>
              <p className="font-semibold text-sm">{frontmatter.paybackPeriod}</p>
            </div>
            {frontmatter.productivityGain && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Productivity Gain</span>
                </div>
                <p className="font-semibold text-sm">{frontmatter.productivityGain}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MDX Content */}
      <article className="pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-black prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={mdxSource} />
        </div>

        {/* Metadata Footer */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-black/10 text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              Published {new Date(frontmatter.publishedDate).toLocaleDateString('en-GB', {
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
          {frontmatter.sourceUrl && (
            <>
              <span className="hidden sm:inline">•</span>
              <a
                href={frontmatter.sourceUrl}
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

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 LumiGentic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
