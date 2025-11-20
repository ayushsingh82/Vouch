'use client';

import Link from 'next/link';
import React from 'react';

const faqs = [
  {
    q: 'What is X402?',
    a: 'X402 is a next-generation payment protocol built on Polygon, leveraging zero-knowledge cryptography for secure, private, and instant transactions.'
  },
  {
    q: 'How does X402 ensure privacy?',
    a: 'X402 uses advanced zero-knowledge proofs to keep your transaction details private while maintaining security and decentralization.'
  },
  {
    q: 'Is my wallet compatible?',
    a: 'Any EVM-compatible wallet works seamlessly with X402 payment protocol.'
  },
  {
    q: 'Is X402 open source?',
    a: 'Yes! X402 is fully open source and available on GitHub for transparency and community contribution.'
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
              <p className="text-sm font-black mb-8 text-black bg-white border-2 border-black px-3 py-2 rounded-lg inline-block">Experience the Future of</p>
              <h3 className="text-5xl font-bold font-black text-black italic mb-2">
                SEAMLESS Payments
              </h3>
              <h2 className="text-5xl font-black mb-2 text-black bg-white border-2 border-black px-3 py-2 rounded-lg inline-block italic">with X402 Protocol</h2>
            </div>
          </div>
        </div>
      </div>


      <div className="text-center mb-6 flex flex-col md:flex-row items-center justify-center gap-6">
      <Link href="/widget">
          <button className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Join the Waitlist</button>
        </Link>
        
          <Link href="/widget">
            <button className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-4 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 active:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]">Launch App</button>
          </Link>
        </div>

      {/* MAIN CONTENT - BENTO GRID */}
      <div className="max-w-5xl mx-auto px-4 pb-20 mt-16">
        <div className="grid grid-cols-12 gap-6 auto-rows-[180px]">
          {/* Why X402 Protocol */}
          <div className="col-span-12 md:col-span-6 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-black border-2 border-black px-3 py-2 rounded-lg inline-block">Why X402 Protocol</h2>
            <p className="text-sm text-black leading-relaxed">X402 revolutionizes digital payments with cutting-edge cryptography and seamless integration. Our protocol ensures your transactions are fast, secure, and truly private—giving you complete control over your financial data.</p>
          </div>
          {/* Powered by Advanced Tech */}
          <div className="col-span-12 md:col-span-6 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-black border-2 border-black px-3 py-2 rounded-lg inline-block">Powered by Advanced Tech</h2>
            <p className="text-sm text-black mb-4 leading-relaxed">Built on Polygon&apos;s robust infrastructure with zero-knowledge proofs:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Absolute transaction privacy</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Military-grade cryptographic security</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Lightning-fast settlements</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full mr-3 bg-black"></span><span className="text-black font-semibold">Decentralized, trustless infrastructure</span></li>
            </ul>
          </div>
          {/* How It Works */}
          <div className="col-span-12 md:col-span-8 row-span-2 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h2 className="text-xl font-black mb-4 text-white bg-black border-2 border-black px-3 py-2 rounded-lg inline-block">How It Works</h2>
            <p className="text-sm text-black mb-4 leading-relaxed">Start using X402 in three simple steps:</p>
            <div className="space-y-3">
              <div className="flex items-start"><span className="text-lg font-extrabold text-black mr-3">1</span><div><div className="font-bold text-black mb-1 text-sm">Connect Wallet</div><div className="text-xs text-black">Link your EVM-compatible wallet securely—your keys, your control, always.</div></div></div>
              <div className="flex items-start"><span className="text-lg font-extrabold text-black mr-3">2</span><div><div className="font-bold text-black mb-1 text-sm">Enter Payment Details</div><div className="text-xs text-black">Input recipient address and amount—X402 handles the rest with privacy-first technology.</div></div></div>
              <div className="flex items-start"><span className="text-lg font-extrabold text-black mr-3">3</span><div><div className="font-bold text-black mb-1 text-sm">Send Instantly</div><div className="text-xs text-black">Transaction processed in seconds with zero-knowledge proof verification—private, secure, unstoppable.</div></div></div>
            </div>
          </div>
          {/* The Future of Payments */}
          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h3 className="text-lg font-black mb-2 text-white bg-black border-2 border-black px-3 py-1 rounded-lg inline-block">The Future of Payments</h3>
            <p className="text-black text-sm mt-2">X402 is pioneering the next era of blockchain payments with privacy-preserving technology and instant settlements on Polygon.</p>
          </div>
          {/* Enterprise-Grade Security */}
          <div className="col-span-12 md:col-span-4 row-span-1 bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-8 rounded-2xl flex flex-col justify-center">
            <h4 className="text-lg font-bold text-white bg-black border-2 border-black px-3 py-1 rounded-lg inline-block">Enterprise-Grade Security</h4>
            <p className="text-black text-sm mt-2">Zero-knowledge cryptography ensures complete transaction privacy while maintaining full security and auditability.</p>
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