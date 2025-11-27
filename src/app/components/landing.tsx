'use client';

import Link from 'next/link';
import React from 'react';

const faqs = [
  {
    q: 'What is Vouch?',
    a: 'Vouch is a decentralized influencer verification platform that uses AI agents, DKG knowledge graphs, and x402 payments to create transparent, verifiable reputation systems for social media influencers.'
  },
  {
    q: 'How does Vouch verify influencers?',
    a: 'Vouch uses AI agents to analyze influencer profiles, detect bot activity, verify engagement quality, and assess authenticity. All verification data is stored immutably on the DKG blockchain.'
  },
  {
    q: 'What are community notes?',
    a: 'Community notes are fact-checks and insights submitted by users about influencers. These notes are verified by AI agents and published to the DKG, creating a permanent, verifiable reputation history.'
  },
  {
    q: 'How does x402 payment work?',
    a: 'Premium insights and deep analysis require payment via the x402 protocol. Users can access basic metadata for free, but detailed audience analysis, competitive intelligence, and premium reports require micropayments in TRAC tokens.'
  },
];

export default function Landing() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (
    <div className="bg-white">

      {/* HERO */}
      <div className="relative pt-24 pb-8 px-4 mb-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-5xl border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-[50%] flex items-center justify-center py-8 px-8" style={{ aspectRatio: '2/1', backgroundColor: '#FFD1B3' }}>
            <div className="text-center">
              <p className="text-sm font-black mb-8 text-white border-2 border-black px-3 py-2 rounded-lg inline-block" style={{ backgroundColor: '#FF6E1A' }}>Decentralized Influencer Verification</p>
              <h3 className="text-5xl font-bold font-black text-black italic mb-2">
                Trust Through
              </h3>
              <h2 className="text-5xl font-black mb-2 text-white border-2 border-black px-3 py-2 rounded-lg inline-block italic" style={{ backgroundColor: '#FF6E1A' }}>Transparency</h2>
              <p className="text-lg text-black mt-4 max-w-2xl mx-auto">
                AI-powered verification, immutable reputation history, and community-driven fact-checking powered by DKG and x402
              </p>
            </div>
          </div>
        </div>
      </div>



      <div className="text-center mb-6 flex flex-col md:flex-row items-center justify-center gap-6">
        <Link href="/agents">
          <button className="border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]" style={{ backgroundColor: '#FF6E1A' }}>
            Query Agents
          </button>
        </Link>

        <Link href="/trends">
          <button className="border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]" style={{ backgroundColor: '#FFD1B3' }}>
            View Trends
          </button>
        </Link>
      </div>

      {/* MAIN CONTENT - BENTO GRID */}
      <div className="max-w-5xl mx-auto px-4 pb-24 mt-16">
        <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">
          {/* Why Vouch */}
          <div className="col-span-12 md:col-span-6 row-span-2 border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center" style={{ backgroundColor: '#FFD1B3' }}>
            <h2 className="text-xl font-black mb-4 text-white border-2 border-black px-3 py-2 rounded-lg inline-block" style={{ backgroundColor: '#FF6E1A' }}>Why Vouch</h2>
            <p className="text-sm text-black leading-relaxed">
              Vouch creates a transparent, verifiable reputation system for influencers. Using AI verification, 
              decentralized knowledge graphs, and community fact-checking, we ensure authenticity and build trust 
              in the social media ecosystem.
            </p>
          </div>
          {/* Three-Layer Architecture */}
          <div className="col-span-12 md:col-span-6 row-span-2 border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center" style={{ backgroundColor: '#B2DBAF' }}>
            <h2 className="text-xl font-black mb-4 text-white border-2 border-black px-3 py-2 rounded-lg inline-block" style={{ backgroundColor: '#F67979' }}>Three-Layer Architecture</h2>
            <p className="text-sm text-black mb-4 leading-relaxed">Vouch leverages three powerful layers:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Agent Layer: AI verification & bot detection</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Knowledge Layer: Immutable DKG reputation graphs</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Trust Layer: x402 payments & rewards</span></li>
            </ul>
          </div>
          {/* How It Works */}
          <div className="col-span-12 md:col-span-8 row-span-2 border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center" style={{ backgroundColor: '#FFD1B3' }}>
            <h2 className="text-xl font-black mb-4 text-white border-2 border-black px-3 py-2 rounded-lg inline-block" style={{ backgroundColor: '#FF6E1A' }}>How It Works</h2>
            <p className="text-sm text-black mb-4 leading-relaxed">Verify influencers and build reputation in three steps:</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-lg font-extrabold text-black mr-3">1</span>
                <div>
                  <div className="font-bold text-black mb-1 text-sm">Search & Analyze</div>
                  <div className="text-xs text-black">Query influencers by handle or name. AI agents analyze authenticity, engagement, and trust scores from DKG.</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-lg font-extrabold text-black mr-3">2</span>
                <div>
                  <div className="font-bold text-black mb-1 text-sm">Submit Community Notes</div>
                  <div className="text-xs text-black">Add fact-checks and insights. AI verifies content quality, then publishes to DKG for permanent record.</div>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-lg font-extrabold text-black mr-3">3</span>
                <div>
                  <div className="font-bold text-black mb-1 text-sm">Access Premium Insights</div>
                  <div className="text-xs text-black">Unlock deep analysis, competitive intelligence, and premium reports via x402 micropayments.</div>
                </div>
              </div>
            </div>
          </div>
          {/* The Future of Trust */}
          <div className="col-span-12 md:col-span-4 row-span-1 border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center" style={{ backgroundColor: '#FFD1B3' }}>
            <h3 className="text-lg font-black mb-2 text-white border-2 border-black px-3 py-1 rounded-lg inline-block" style={{ backgroundColor: '#FF6E1A' }}>The Future of Trust</h3>
            <p className="text-black text-sm mt-2">
              Vouch is building transparent, verifiable reputation systems for the decentralized web.
            </p>
          </div>
          {/* Immutable Reputation */}
          <div className="col-span-12 md:col-span-4 row-span-1 border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center" style={{ backgroundColor: '#B2DBAF' }}>
            <h4 className="text-lg font-bold text-white border-2 border-black px-3 py-1 rounded-lg inline-block" style={{ backgroundColor: '#F67979' }}>Immutable Reputation</h4>
            <p className="text-black text-sm mt-2">
              All verification data and community notes are stored on DKG blockchain, creating permanent reputation history.
            </p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="relative z-10 px-4 py-16 border-t border-black mt-12 mb-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl text-black font-black mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                // Alternate between green and orange/peach colors
                const colors = ['#B2DBAF', '#FFD1B3', '#B2DBAF', '#FFD1B3'];
                const bgColor = colors[index] || '#B2DBAF';
                
                return (
                  <div key={index} className="border-2 border-black rounded-2xl overflow-hidden" style={{ backgroundColor: bgColor }}>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between text-black hover:bg-gray-100 transition-all duration-300 focus:outline-none"
                      style={{ backgroundColor: expandedFaq === index ? 'transparent' : bgColor }}
                    >
                      <span className="font-medium text-lg">{faq.q}</span>
                      <span className="text-2xl">{expandedFaq === index ? '−' : '+'}</span>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6 text-black animate-fade-in" style={{ backgroundColor: bgColor }}>{faq.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
