'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function AutomationIdeaNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-t border-black/10">
            <div className="px-4 py-4 space-y-3">
              <Link href="/#how-it-works" className="block py-3 px-4 hover:bg-black/10 rounded" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="/automation-ideas" className="block py-3 px-4 bg-black/10 font-semibold rounded" onClick={() => setMobileMenuOpen(false)}>
                Automation Ideas
              </Link>
              <Link href="/#contact" className="block py-3 px-4 hover:bg-black/10 rounded" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
