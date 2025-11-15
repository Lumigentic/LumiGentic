'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, X, Menu, TrendingUp } from 'lucide-react';
import { AutomationIdeaCard } from '@/components/automation-idea-card';

interface AutomationIdeaData {
  slug: string;
  title: string;
  industry: string;
  difficulty: string;
  difficultyScore: number;
  roiScore: number;
  timeSaved: string;
  costSavings: string;
  paybackPeriod: string;
  tools: string[];
}

interface Props {
  ideas: AutomationIdeaData[];
}

export function AutomationIdeasClient({ ideas }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const industries = useMemo(() => {
    const allIndustries = ideas.map((idea) => idea.industry);
    return ['All', ...Array.from(new Set(allIndustries)).sort()];
  }, [ideas]);

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesSearch =
        searchQuery === '' ||
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesIndustry =
        selectedIndustry === 'All' || idea.industry === selectedIndustry;

      const matchesDifficulty =
        selectedDifficulty === 'All' || idea.difficulty === selectedDifficulty;

      return matchesSearch && matchesIndustry && matchesDifficulty;
    });
  }, [ideas, searchQuery, selectedIndustry, selectedDifficulty]);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/lumigentic-logo.svg"
              alt="LumiGentic"
              width={320}
              height={80}
              priority
              className="w-[220px] h-auto sm:w-[320px]"
            />
          </Link>
          <div className="hidden md:flex gap-8 text-base font-medium">
            <Link href="/#how-it-works" className="hover:text-gray-700 transition-colors">
              How It Works
            </Link>
            <Link href="/#case-studies" className="hover:text-gray-700 transition-colors">
              Case Studies
            </Link>
            <Link href="/market-signals" className="hover:text-gray-700 transition-colors">
              Market Signals
            </Link>
            <Link href="/automation-ideas" className="text-black font-semibold">
              Automation Ideas
            </Link>
            <Link href="/#contact" className="hover:text-gray-700 transition-colors">
              Contact
            </Link>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-black/10 rounded transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-t border-black/10">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/#how-it-works"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/#case-studies"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </Link>
              <Link
                href="/market-signals"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Market Signals
              </Link>
              <Link
                href="/automation-ideas"
                className="block py-3 px-4 bg-black/10 font-semibold rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Automation Ideas
              </Link>
              <Link
                href="/#contact"
                className="block py-3 px-4 hover:bg-black/10 rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Automation Idea Browser
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover proven automation opportunities from leading organisations. Each idea includes real ROI metrics, implementation guidance, and tools required.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search automation ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 rounded-lg hover:bg-black/5 transition-colors md:hidden"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <div
              className={`${
                filtersOpen ? 'block' : 'hidden'
              } md:flex items-center gap-6 mt-4 md:mt-0`}
            >
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="px-4 py-2 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 bg-white min-w-[150px]"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-4 py-2 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 bg-white min-w-[150px]"
                  >
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                {(selectedIndustry !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSelectedIndustry('All');
                        setSelectedDifficulty('All');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-black transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-black">{filteredIdeas.length}</span>{' '}
              {filteredIdeas.length === 1 ? 'idea' : 'ideas'}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>Sorted by ROI score</span>
            </div>
          </div>

          {filteredIdeas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIdeas.map((idea) => (
                <AutomationIdeaCard key={idea.slug} {...idea} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">No automation ideas found</p>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Explore Automation for Your Organisation?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Get a bespoke automation report tailored to your business with ROI projections and implementation roadmaps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Get a Bespoke Report
            </Link>
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
