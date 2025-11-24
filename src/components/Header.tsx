'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-black text-black italic border-2 border-black px-3 py-2 rounded-lg" style={{ backgroundColor: '#FFD1B3' }}>
                X402
              </h1>
            </Link>
            <nav className="flex items-center gap-6">
              <Link 
                href="/trends" 
                className="text-black font-bold hover:underline transition-all"
              >
                Trends
              </Link>
              <Link 
                href="/agents" 
                className="text-black font-bold hover:underline transition-all"
              >
                Agents
              </Link>
            </nav>
          </div>
          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}

