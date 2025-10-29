'use client';

import Link from 'next/link';
import { TrendingUp, Clock, DollarSign, Wrench, Zap } from 'lucide-react';
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
  return (
    <Link href={`/automation-ideas/${slug}`} className="block group">
      <div className="relative h-full p-5 sm:p-6 border border-black/10 rounded-sm bg-white hover:shadow-lg transition-all duration-300">
        <GlowingEffect disabled={false} proximity={200} spread={40} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 text-xs sm:text-sm font-semibold bg-black text-white rounded-sm">
              {industry}
            </span>
            <span className="px-3 py-1 text-xs sm:text-sm font-medium border border-black/20 rounded-sm">
              {difficulty}
            </span>
          </div>
          <div className="flex items-center gap-0.5 bg-black/5 px-2 py-1 rounded-sm">
            <Zap className="w-3.5 h-3.5 text-black" strokeWidth={2} />
            <span className="text-xs font-bold text-black ml-1">{roiScore}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold mb-4 group-hover:text-gray-700 transition-colors line-clamp-2 relative z-10">
          {title}
        </h3>

        {/* Metrics */}
        <div className="space-y-3 mb-4 relative z-10">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-black" strokeWidth={1.5} />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600">Time Saved</p>
              <p className="text-sm sm:text-base font-medium">{timeSaved}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-black" strokeWidth={1.5} />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600">Annual Impact</p>
              <p className="text-sm sm:text-base font-medium">{costSavings}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 text-black" strokeWidth={1.5} />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-600">Payback Period</p>
              <p className="text-sm sm:text-base font-medium">{paybackPeriod}</p>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="flex items-start gap-2 pt-4 border-t border-black/10 relative z-10">
          <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 text-black" strokeWidth={1.5} />
          <div className="flex flex-wrap gap-2">
            {tools.slice(0, 3).map((tool, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-black/5 text-black rounded-sm font-medium"
              >
                {tool}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="text-xs px-2 py-1 bg-black/5 text-black rounded-sm font-medium">
                +{tools.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Read More */}
        <div className="mt-4 pt-4 border-t border-black/10 relative z-10">
          <span className="text-sm font-semibold text-black group-hover:gap-2 inline-flex items-center transition-all">
            View Details
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
