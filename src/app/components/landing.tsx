'use client';

import Link from 'next/link';
import React from 'react';

const faqs = [
  {
    q: 'What is Vouch?',
    a: 'Vouch is a decentralized platform that analyzes social media influencers using AI agents and community-verified notes. Built on DKG (Decentralized Knowledge Graph) for transparent, trustable insights about influencer impact and engagement.'
  },
  {
    q: 'How does Vouch ensure trust and transparency?',
    a: 'Vouch uses the OriginTrail Decentralized Knowledge Graph (DKG) to store verifiable community notes and influencer data. All insights are anchored on-chain with cryptographic proofs, ensuring transparency and preventing manipulation.'
  },
  {
    q: 'What is personalized data access through X402?',
    a: 'X402 enables secure, private access to your personalized influencer analytics and social data. Using zero-knowledge cryptography, you can access insights while maintaining complete privacy of your data.'
  },
  {
    q: 'How do Community Notes work?',
    a: 'Community Notes are verified annotations about influencers created by the community. These notes are published to the DKG, making them transparent, verifiable, and tamper-proof. Users can upvote notes and see their DKG hash for verification.'
  },
  {
    q: 'Is Vouch open source?',
    a: 'Yes! Vouch is built on open-source technologies including the OriginTrail DKG and is committed to transparency and community contribution.'
  },
];

export default function Landing() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (
    <div className="bg-white font-sans tracking-tight relative overflow-x-hidden">
     

      {/* HERO */}
      <div className="relative pt-[-24px] pb-8 px-4 mb-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-5xl bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-[50%] flex items-center justify-center py-8 px-8" style={{ aspectRatio: '2/1' }}>
            <div className="text-center">
              <p className="text-sm font-black mb-8 text-black bg-white border-2 border-black px-3 py-2 rounded-lg inline-block">Trust & Transparency for</p>
              <h3 className="text-5xl font-bold font-black text-black italic mb-2">
                INFLUENCER Analytics
              </h3>
              <h2 className="text-5xl font-black mb-2 text-black bg-white border-2 border-black px-3 py-2 rounded-lg inline-block italic">Powered by DKG & AI</h2>
            </div>
          </div>
        </div>
      </div>


      <div className="text-center mb-6 flex flex-col md:flex-row items-center justify-center gap-6">
          <Link href="/agents">
            <button className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Analyze Influencers</button>
          </Link>
          <Link href="/trends">
            <button className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">View Trends</button>
          </Link>
          <Link href="/">
            <button className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Access Personalized Data</button>
          </Link>
        </div>

      {/* MAIN CONTENT - BENTO GRID */}
      <div className="max-w-5xl mx-auto px-4 pb-20 mt-16">
        <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">
          {/* Why Vouch */}
          <div className="col-span-12 md:col-span-6 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-black border-2 border-black px-3 py-2 rounded-lg inline-block">Why Vouch</h2>
            <p className="text-sm text-black leading-relaxed">Vouch revolutionizes influencer analytics with AI-powered agents and community-verified notes. Built on the Decentralized Knowledge Graph (DKG), we provide transparent, trustable insights about influencer impact, engagement, and authenticity—all verifiable on-chain.</p>
          </div>
          {/* Powered by DKG & AI */}
          <div className="col-span-12 md:col-span-6 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-black border-2 border-black px-3 py-2 rounded-lg inline-block">Powered by DKG & AI</h2>
            <p className="text-sm text-black mb-4 leading-relaxed">Built on OriginTrail&apos;s Decentralized Knowledge Graph with AI agents:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Verifiable community notes on DKG</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">AI-powered trend detection & insights</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Personalized data access via X402</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Transparent, tamper-proof analytics</span></li>
            </ul>
          </div>
          {/* How It Works */}
          <div className="col-span-12 md:col-span-8 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-black border-2 border-black px-3 py-2 rounded-lg inline-block">How It Works</h2>
            <p className="text-sm text-black mb-4 leading-relaxed">Get started with Vouch in three simple steps:</p>
            <div className="space-y-3">
              <div className="flex items-start"><span className="text-lg font-extrabold text-black mr-3">1</span><div><div className="font-bold text-black mb-1 text-sm">Connect Wallet</div><div className="text-xs text-black">Link your wallet to access personalized influencer analytics and contribute community notes—all verified on DKG.</div></div></div>
              <div className="flex items-start"><span className="text-lg font-extrabold text-black mr-3">2</span><div><div className="font-bold text-black mb-1 text-sm">Search or Browse Trends</div><div className="text-xs text-black">Analyze any influencer or explore trending profiles across categories. AI agents provide actionable insights powered by DKG data.</div></div></div>
              <div className="flex items-start"><span className="text-lg font-extrabold text-black mr-3">3</span><div><div className="font-bold text-black mb-1 text-sm">Access Personalized Data</div><div className="text-xs text-black">Use X402 protocol to securely access your personalized analytics and social data with zero-knowledge privacy—your data, your control.</div></div></div>
            </div>
          </div>
          {/* Community Notes */}
          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h3 className="text-lg font-black mb-2 text-white bg-black border-2 border-black px-3 py-1 rounded-lg inline-block">Community Notes</h3>
            <p className="text-black text-sm mt-2">Verified annotations about influencers created by the community, published to DKG for transparency and trust. Every note is cryptographically verifiable.</p>
          </div>
          {/* Personalized Data Access */}
          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h4 className="text-lg font-bold text-white bg-black border-2 border-black px-3 py-1 rounded-lg inline-block">X402 Data Access</h4>
            <p className="text-black text-sm mt-2">Access your personalized influencer analytics and social data securely through X402 protocol with zero-knowledge privacy protection.</p>
          </div>
        </div>

        {/* FAQ SECTION - moved up */}
        <section className="relative z-10 px-4 py-16 border-t border-black mt-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl text-black font-black mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-2 border-black rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between text-black hover:bg-black hover:text-white transition-all duration-300 focus:outline-none"
                  >
                    <span className="font-medium text-lg">{faq.q}</span>
                    <span className="text-2xl">{expandedFaq === index ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 text-black animate-fade-in bg-white">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

    
       
      </div>
    </div>
  );
}