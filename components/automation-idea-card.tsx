'use client';

import Link from 'next/link';
import { TrendingUp, Clock, DollarSign, Wrench } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface AutomationIdeaCardProps {
  slug: string;
  title: string;
  industry: string;
  difficulty: string;
  roiScore: number;
  timeSaved: string;
  costSavings: string;
  paybackPeriod: string;
  tools: string[];
}

export function AutomationIdeaCard({
  slug,
  title,
  industry,
  difficulty,
  roiScore,
  timeSaved,
  costSavings,
  paybackPeriod,
  tools,
}: AutomationIdeaCardProps) {
  const difficultyColor = {
    Easy: 'text-green-600 bg-green-50',
    Medium: 'text-yellow-600 bg-yellow-50',
    Hard: 'text-red-600 bg-red-50',
  }[difficulty] || 'text-gray-600 bg-gray-50';

  return (
    <Link href={`/automation-ideas/${slug}`} className="block group">
      <div className="relative h-full p-6 border border-black/10 rounded-lg bg-white hover:border-black/20 transition-all duration-300">
        <GlowingEffect disabled={false} proximity={200} spread={40} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 text-sm font-medium bg-black text-white rounded">
              {industry}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded ${difficultyColor}`}>
              {difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-600">
            {Array.from({ length: Math.min(5, Math.ceil(roiScore / 2)) }).map((_, i) => (
              <TrendingUp key={i} className="w-4 h-4" />
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 group-hover:text-gray-700 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Metrics */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Time Saved</p>
              <p className="text-sm">{timeSaved}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <DollarSign className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Annual Impact</p>
              <p className="text-sm">{costSavings}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Payback Period</p>
              <p className="text-sm">{paybackPeriod}</p>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="flex items-start gap-2 pt-4 border-t border-black/5">
          <Wrench className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-600" />
          <div className="flex flex-wrap gap-2">
            {tools.slice(0, 3).map((tool, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
              >
                {tool}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                +{tools.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Read More */}
        <div className="mt-4 pt-4 border-t border-black/5">
          <span className="text-sm font-medium text-black group-hover:underline">
            Read Full Automation →
          </span>
        </div>
      </div>
    </Link>
  );
}
