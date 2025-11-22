'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-black hover:opacity-80 transition-opacity">
          Vouch
        </Link>
        <div className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/agents"
            className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-sm font-bold text-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
          >
            AI Agents
          </Link>
          <Link
            href="/trends"
            className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-sm font-bold text-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
          >
            🔥 Trends
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

