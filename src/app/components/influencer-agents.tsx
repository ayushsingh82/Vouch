'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useSearchParams } from 'next/navigation';

interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok';
  followers: number;
  engagementRate: number;
  verified: boolean;
  trustScore: number;
  communityNotes: CommunityNote[];
  trends: Trend[];
  insights: Insight[];
  premiumInsights?: PremiumInsight[];
}

interface CommunityNote {
  id: string;
  author: string;
  content: string;
  verified: boolean;
  upvotes: number;
  timestamp: string;
  dkgHash?: string;
  ual?: string;
}

interface Trend {
  metric: string;
  change: number;
  period: string;
  direction: 'up' | 'down';
}

interface Insight {
  type: 'engagement' | 'audience' | 'content' | 'trend';
  title: string;
  description: string;
  actionable: string;
  confidence: number;
  isPremium?: boolean;
  price?: number;
}

interface PremiumInsight {
  id: string;
  title: string;
  description: string;
  price: number; // in TRAC tokens
  hasAccess: boolean;
  ual?: string;
}

interface AgentQueryForm {
  query: string;
  queryType: 'influencer' | 'proposal' | 'trend' | 'custom';
  isPremium: boolean;
  jsonldData?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || false; // Set to true for demo without backend

export default function InfluencerAgents() {
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [queryForm, setQueryForm] = useState<AgentQueryForm>({
    query: '',
    queryType: 'influencer',
    isPremium: false,
  });
  const [premiumInsights, setPremiumInsights] = useState<PremiumInsight[]>([]);
  const [accessingPremium, setAccessingPremium] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string>('');
  const [authSignature, setAuthSignature] = useState<string>('');

  // Mock data - in production, this would come from DKG queries
  const mockInfluencers: Influencer[] = [
    {
      id: '1',
      name: 'Alex Crypto',
      handle: '@alexcrypto',
      platform: 'twitter',
      followers: 125000,
      engagementRate: 8.5,
      verified: true,
      trustScore: 92,
      communityNotes: [
        {
          id: 'n1',
          author: 'Community Validator',
          content: 'Verified high-quality content with consistent engagement patterns. No bot activity detected.',
          verified: true,
          upvotes: 45,
          timestamp: '2024-01-15',
          dkgHash: '0x1234...abcd',
          ual: 'did:dkg:otp:20430/0x1234...abcd/12345'
        },
        {
          id: 'n2',
          author: 'Trend Analyst',
          content: 'Strong correlation with crypto market trends. Audience shows high interest in DeFi topics.',
          verified: true,
          upvotes: 32,
          timestamp: '2024-01-14',
          dkgHash: '0x5678...efgh',
          ual: 'did:dkg:otp:20430/0x5678...efgh/12346'
        }
      ],
      trends: [
        { metric: 'Engagement Rate', change: 12.5, period: 'Last 30 days', direction: 'up' },
        { metric: 'Follower Growth', change: 8.2, period: 'Last 30 days', direction: 'up' },
        { metric: 'Content Quality', change: 5.1, period: 'Last 30 days', direction: 'up' }
      ],
      insights: [
        {
          type: 'engagement',
          title: 'Peak Engagement Times',
          description: 'Highest engagement occurs on Tuesdays and Thursdays between 2-4 PM EST',
          actionable: 'Schedule key announcements during these windows for maximum reach',
          confidence: 87
        },
        {
          type: 'audience',
          title: 'Audience Demographics',
          description: 'Primary audience: 25-34 years, 68% male, high interest in blockchain and DeFi',
          actionable: 'Tailor content to focus on advanced DeFi concepts and market analysis',
          confidence: 91
        },
        {
          type: 'trend',
          title: 'Emerging Trend Detection',
          description: 'Growing interest in Layer 2 solutions and zero-knowledge proofs',
          actionable: 'Create content series on L2 scaling solutions to capitalize on trend',
          confidence: 78,
          isPremium: true,
          price: 10
        }
      ],
      premiumInsights: [
        {
          id: 'premium-1',
          title: 'Deep Audience Analysis',
          description: 'Comprehensive analysis of audience segments, purchasing behavior, and conversion patterns',
          price: 25,
          hasAccess: false
        },
        {
          id: 'premium-2',
          title: 'Competitive Intelligence Report',
          description: 'Detailed comparison with top competitors, market positioning, and strategic recommendations',
          price: 50,
          hasAccess: false
        }
      ]
    }
  ];

  // Generate auth message for wallet signing
  const generateAuthMessage = async () => {
    if (!address) return;
    
    const message = `Sign this message to authenticate with Polkadot Governance DKG\n\nWallet: ${address}\nTimestamp: ${Date.now()}`;
    setAuthMessage(message);
    
    try {
      const signature = await signMessageAsync({ message });
      setAuthSignature(signature);
      return { message, signature };
    } catch (error) {
      console.error('Failed to sign message:', error);
      return null;
    }
  };

  // Query DKG via agent with optional x402 payment
  const queryAgent = async (query: string, isPremium: boolean = false) => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Generate auth if needed
      if (!authSignature) {
        await generateAuthMessage();
      }

      // Query agent endpoint
      const response = await fetch(`${API_BASE_URL}/api/agents/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authSignature && {
            'x-wallet-address': address,
            'x-wallet-signature': authSignature,
            'x-wallet-message': btoa(authMessage)
          })
        },
        body: JSON.stringify({
          query,
          isPremium,
          wallet: address
        })
      });

      if (response.status === 402) {
        // Payment required
        const paymentInfo = await response.json();
        const proceed = confirm(
          `Premium query requires payment of ${paymentInfo.price} TRAC tokens. Proceed?`
        );
        
        if (proceed) {
          // In production, this would trigger x402 payment flow
          alert('x402 payment flow would be triggered here. For demo, simulating payment...');
          // Retry query after payment
          return queryAgent(query, isPremium);
        }
      } else if (response.ok) {
        const data = await response.json();
        // Handle response data
        console.log('Agent query result:', data);
      }
    } catch (error) {
      console.error('Error querying agent:', error);
      // Fallback to mock data for demo
      handleSearchWithQuery(query);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSearchWithQuery = async (query: string) => {
    setIsAnalyzing(true);
    // Simulate DKG query
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const found = mockInfluencers.find(
      inf => inf.handle.toLowerCase().includes(query.toLowerCase()) ||
             inf.name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (found) {
      setSelectedInfluencer(found);
      setPremiumInsights(found.premiumInsights || []);
    }
    
    setIsAnalyzing(false);
  };

  // Handle URL search params (from trends page)
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
      handleSearchWithQuery(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    await queryAgent(searchQuery, false);
  };

  const handleAccessPremium = async (insightId: string, price: number) => {
    if (!isConnected || !address) {
      alert('Please connect your wallet to access premium insights');
      return;
    }

    setAccessingPremium(insightId);
    
    try {
      // Generate auth if needed
      if (!authSignature) {
        await generateAuthMessage();
      }

      // Request access via x402
      const response = await fetch(`${API_BASE_URL}/api/premium-reports/${insightId}/request-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authSignature && {
            'x-wallet-address': address,
            'x-wallet-signature': authSignature,
            'x-wallet-message': btoa(authMessage)
          })
        },
        body: JSON.stringify({
          wallet: address
        })
      });

      if (response.status === 402) {
        // Payment required - trigger x402 flow
        const proceed = confirm(
          `Access to this premium insight requires payment of ${price} TRAC tokens. Proceed with x402 payment?`
        );
        
        if (proceed) {
          // In production, this would trigger x402 payment facilitator
          alert('x402 payment flow would be triggered here. For demo, granting access...');
          
          // Update access status
          setPremiumInsights(prev => 
            prev.map(insight => 
              insight.id === insightId 
                ? { ...insight, hasAccess: true }
                : insight
            )
          );
        }
      } else if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPremiumInsights(prev => 
            prev.map(insight => 
              insight.id === insightId 
                ? { ...insight, hasAccess: true }
                : insight
            )
          );
        }
      }
    } catch (error) {
      console.error('Error accessing premium insight:', error);
      alert('Failed to access premium insight. Please try again.');
    } finally {
      setAccessingPremium(null);
    }
  };

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!queryForm.jsonldData?.trim()) {
      alert('JSON-LD data is required. Please provide valid JSON-LD data.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Generate auth if needed
      if (!authSignature) {
        await generateAuthMessage();
      }

      // Validate JSON-LD (required) with detailed checks
      let parsedJsonld = null;
      if (!queryForm.jsonldData || !queryForm.jsonldData.trim()) {
        alert('❌ JSON-LD data is required. Please provide valid JSON-LD data.');
        setIsAnalyzing(false);
        return;
      }
      
      // Validate JSON syntax
      try {
        parsedJsonld = JSON.parse(queryForm.jsonldData);
      } catch (parseError) {
        const errorMsg = parseError instanceof Error ? parseError.message : 'Parse error';
        alert(`❌ Invalid JSON format:\n\n${errorMsg}\n\nPlease check:\n- All quotes are properly closed\n- No trailing commas\n- Valid JSON syntax\n\nExample format:\n{\n  "@context": {...},\n  "@type": "..."\n}`);
        setIsAnalyzing(false);
        return;
      }
      
      // Validate required JSON-LD fields
      if (!parsedJsonld['@context']) {
        alert('❌ Invalid JSON-LD: Missing required field "@context"\n\nJSON-LD must include:\n- "@context": defines the vocabulary\n- "@type": defines the entity type\n\nExample:\n{\n  "@context": {\n    "schema": "https://schema.org/"\n  },\n  "@type": "schema:Person"\n}');
        setIsAnalyzing(false);
        return;
      }
      
      if (!parsedJsonld['@type']) {
        alert('❌ Invalid JSON-LD: Missing required field "@type"\n\nJSON-LD must include:\n- "@context": defines the vocabulary\n- "@type": defines the entity type\n\nExample:\n{\n  "@context": {\n    "schema": "https://schema.org/"\n  },\n  "@type": "schema:Person"\n}');
        setIsAnalyzing(false);
        return;
      }
      
      // Check if @context is an object
      if (typeof parsedJsonld['@context'] !== 'object') {
        alert('❌ Invalid JSON-LD: "@context" must be an object\n\nExample:\n"@context": {\n  "schema": "https://schema.org/",\n  "vouch": "https://vouch.app/schema/"\n}');
        setIsAnalyzing(false);
        return;
      }
      
      // Check if @type is a string or array
      if (typeof parsedJsonld['@type'] !== 'string' && !Array.isArray(parsedJsonld['@type'])) {
        alert('❌ Invalid JSON-LD: "@type" must be a string or array\n\nExample:\n"@type": "schema:Person"\nor\n"@type": ["schema:Person", "vouch:TraderProfile"]');
        setIsAnalyzing(false);
        return;
      }
      
      console.log('✅ JSON-LD validation passed:', parsedJsonld);

      // Demo mode: Simulate successful submission without backend
      if (DEMO_MODE) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate mock UAL
        const mockUAL = `did:dkg:otp:20430/0x${Math.random().toString(16).substring(2, 42)}/${Date.now()}`;
        
        alert(`✅ Demo Mode: Data submitted successfully!\n\n📋 JSON-LD validated and ready for DKG\n🆔 Mock UAL: ${mockUAL}\n\nNote: This is a demo. In production, this would be published to DKG via backend API.`);
        
        setQueryForm({
          query: '',
          queryType: 'influencer',
          isPremium: false,
          jsonldData: '',
        });
        setShowQueryForm(false);
        setIsAnalyzing(false);
        return;
      }

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Submit to agent
      const response = await fetch(`${API_BASE_URL}/api/agents/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authSignature && {
            'x-wallet-address': address,
            'x-wallet-signature': authSignature,
            'x-wallet-message': btoa(authMessage)
          })
        },
        body: JSON.stringify({
          query: queryForm.query,
          queryType: queryForm.queryType,
          isPremium: queryForm.isPremium,
          jsonldData: parsedJsonld,
          wallet: address
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        alert(`✅ Data submitted successfully! ${data.ual ? `\nUAL: ${data.ual}` : ''}`);
        setQueryForm({
          query: '',
          queryType: 'influencer',
          isPremium: false,
          jsonldData: '',
        });
        setShowQueryForm(false);
      } else {
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        alert(`❌ Failed to submit to DKG:\n${errorMessage}\n\nNote: Make sure the backend API is running at ${API_BASE_URL}`);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      let errorMsg = 'Unknown error';
      let detailedHelp = '';
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMsg = 'Connection Refused - Backend API not reachable';
        
        // Offer demo mode as alternative
        const useDemoMode = confirm(
          `❌ Backend API not accessible at ${API_BASE_URL}\n\n` +
          `Your JSON-LD is valid ✅\n\n` +
          `Would you like to use DEMO MODE?\n` +
          `(Simulates successful submission for demo purposes)\n\n` +
          `Click OK for Demo Mode, Cancel to see troubleshooting steps.`
        );
        
        if (useDemoMode) {
          // Generate mock UAL for demo
          const mockUAL = `did:dkg:otp:20430/0x${Math.random().toString(16).substring(2, 42)}/${Date.now()}`;
          alert(`✅ Demo Mode: Data submitted successfully!\n\n📋 JSON-LD validated and ready for DKG\n🆔 Mock UAL: ${mockUAL}\n\nNote: This is a demo. In production, this would be published to DKG via backend API.`);
          
          setQueryForm({
            query: '',
            queryType: 'influencer',
            isPremium: false,
            jsonldData: '',
          });
          setShowQueryForm(false);
          setIsAnalyzing(false);
          return;
        }
        
        detailedHelp = `\n\n🔧 Troubleshooting Steps:\n\n1. ✅ JSON-LD Format: Valid (checked)\n\n2. Start Backend API:\n   - Navigate to backend directory\n   - Run: npm start or node server.js\n   - Backend should run on: ${API_BASE_URL}\n\n3. Verify API Endpoint:\n   - Ensure route exists: /api/agents/submit\n   - Check backend routes file\n\n4. Check CORS:\n   - Backend must allow: ${typeof window !== 'undefined' ? window.location.origin : 'frontend origin'}\n\n5. Enable Demo Mode:\n   - Set NEXT_PUBLIC_DEMO_MODE=true in .env\n   - Or use demo mode when prompted\n\n6. For Demo:\n   - Your JSON-LD is valid ✅\n   - Copy the JSON-LD data below\n   - Can submit via backend API or DKG directly`;
      } else if (error instanceof Error) {
        errorMsg = error.message;
        if (error.name === 'AbortError' || error.message.includes('aborted')) {
          errorMsg = 'Request Timeout';
          detailedHelp = '\n\n⏱️ Request timed out after 10 seconds.\nThe backend may be slow or unresponsive.\n\nTry:\n- Check if backend is processing\n- Increase timeout if needed\n- Check backend logs';
        }
      }
      
      const jsonldPreview = queryForm.jsonldData ? 
        `\n\n📋 Your JSON-LD Data (Valid ✅):\n${queryForm.jsonldData.substring(0, 200)}...` : '';
      
      alert(`❌ Failed to submit data to DKG\n\nError: ${errorMsg}${detailedHelp}${jsonldPreview}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddNote = async (influencerId: string, note: string) => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    // In production, this would publish to DKG
    console.log('Publishing note to DKG:', { influencerId, note });
    
    // Simulate DKG publish
    const ual = `did:dkg:otp:20430/0x${Math.random().toString(16).substring(2)}/${Date.now()}`;
    alert(`Note published to DKG! UAL: ${ual}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans tracking-tight">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8 mb-8" style={{ backgroundColor: '#FFD1B3' }}>
          <h1 className="text-4xl font-black text-black mb-4">
            🤖 AI Agent Query & Data Submission
          </h1>
          <p className="text-lg text-black mb-6">
            Query AI agents through DKG knowledge graphs. Submit your own data in JSON-LD format. 
            Access premium insights via x402 payment protocol. All data is verified and published to the DKG.
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search influencer, proposal, or query DKG (e.g., @alexcrypto)"
              className="flex-1 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-black font-medium focus:outline-none focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
              style={{ backgroundColor: '#B2DBAF' }}
            />
            <button
              onClick={handleSearch}
              disabled={isAnalyzing}
              className="border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-3 rounded-lg text-lg font-bold text-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#FF6E1A' }}
            >
              {isAnalyzing ? 'Querying...' : 'Query Agent'}
            </button>
          </div>

          {/* Submit Data Button */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowQueryForm(!showQueryForm)}
              className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-base font-bold text-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              style={{ backgroundColor: '#B2DBAF' }}
            >
              {showQueryForm ? 'Hide Form' : '+ Submit Data to DKG'}
            </button>
            {!isConnected && (
              <span className="text-sm text-black opacity-70 self-center">
                Connect wallet to submit data
              </span>
            )}
          </div>
        </div>

        {/* Data Submission Form */}
        {showQueryForm && (
          <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8 mb-8" style={{ backgroundColor: '#B2DBAF' }}>
            <h2 className="text-2xl font-black text-black mb-4">Submit Data to DKG via Agent</h2>
            <div className="mb-6 p-3 rounded-lg border-2 border-black" style={{ backgroundColor: '#FFD1B3' }}>
              <p className="text-sm text-black font-semibold mb-1">
                {DEMO_MODE ? '🎭 Demo Mode Active' : '⚠️ Backend API Required'}
              </p>
              <p className="text-xs text-black opacity-80">
                {DEMO_MODE ? (
                  <>
                    Running in demo mode. Submissions will be simulated.
                    <br />
                    Set <code className="bg-black text-white px-1 rounded">NEXT_PUBLIC_DEMO_MODE=false</code> to use real backend.
                  </>
                ) : (
                  <>
                    Make sure the backend API is running at <code className="bg-black text-white px-1 rounded">{API_BASE_URL}</code>
                    <br />
                    The backend handles AI verification and DKG publication.
                    <br />
                    <span className="text-xs opacity-70">💡 If backend is unavailable, demo mode will be offered on submission.</span>
                  </>
                )}
              </p>
            </div>
            <form onSubmit={handleSubmitData}>
              <div className="space-y-4">
                <div>
                  <label className="block text-black font-bold mb-2">Query Type</label>
                  <select
                    value={queryForm.queryType}
                    onChange={(e) => setQueryForm({ ...queryForm, queryType: e.target.value as 'influencer' | 'proposal' | 'trend' | 'custom' })}
                    className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-black font-medium"
                    style={{ backgroundColor: '#FFD1B3' }}
                  >
                    <option value="influencer">Influencer</option>
                    <option value="proposal">Proposal</option>
                    <option value="trend">Trend</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-black font-bold mb-2">Query/Description</label>
                  <input
                    type="text"
                    value={queryForm.query}
                    onChange={(e) => setQueryForm({ ...queryForm, query: e.target.value })}
                    placeholder="Describe what you're submitting"
                    className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-black font-medium"
                    style={{ backgroundColor: '#FFD1B3' }}
                  />
                </div>

                <div>
                  <label className="block text-black font-bold mb-2">
                    JSON-LD Data <span className="text-red-600">*</span>
                  </label>
                  <div className="mb-2 text-xs text-black opacity-70">
                    Example for trader: Click to load template
                  </div>
                  <textarea
                    value={queryForm.jsonldData || ''}
                    onChange={(e) => setQueryForm({ ...queryForm, jsonldData: e.target.value })}
                    placeholder='{"@context": {...}, "@type": "...", ...}'
                    rows={12}
                    required
                    className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-black font-mono text-sm"
                    style={{ backgroundColor: '#FFD1B3' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const traderExample = {
                        "@context": {
                          "schema": "https://schema.org/",
                          "ot": "https://schema.origintrail.io/",
                          "vouch": "https://vouch.app/schema/"
                        },
                        "@type": ["schema:Person", "vouch:TraderProfile"],
                        "@id": `vouch:trader:${Date.now()}`,
                        "schema:name": queryForm.query || "Crypto Trader",
                        "schema:jobTitle": "Cryptocurrency Trader",
                        "schema:description": queryForm.query || "Active trader in cryptocurrency markets",
                        "vouch:traderProfile": {
                          "@type": "vouch:TraderMetrics",
                          "vouch:tradingExperience": "3 years",
                          "vouch:specialization": ["DeFi", "Arbitrage", "Cross-chain"],
                          "vouch:preferredChains": ["Base", "Arbitrum"],
                          "vouch:tradingVolume": "High",
                          "vouch:riskTolerance": "Moderate"
                        },
                        "ot:verification": {
                          "@type": "ot:AIVerification",
                          "ot:verifiedAt": new Date().toISOString(),
                          "ot:confidence": 0.85
                        },
                        "schema:identifier": {
                          "@type": "schema:PropertyValue",
                          "schema:propertyID": "wallet_address",
                          "schema:value": address || "0x..."
                        },
                        "schema:dateCreated": new Date().toISOString()
                      };
                      setQueryForm({ ...queryForm, jsonldData: JSON.stringify(traderExample, null, 2) });
                    }}
                    className="mt-2 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-sm font-bold text-black hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-200"
                    style={{ backgroundColor: '#FFD1B3' }}
                  >
                    Load Trader Template
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPremium"
                    checked={queryForm.isPremium}
                    onChange={(e) => setQueryForm({ ...queryForm, isPremium: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <label htmlFor="isPremium" className="text-black font-bold">
                    Make this premium (requires x402 payment to access)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing || !isConnected}
                  className="w-full border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-lg font-bold text-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#FF6E1A' }}
                >
                  {isAnalyzing ? 'Submitting...' : 'Submit to DKG via Agent'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Main Content */}
        {selectedInfluencer ? (
          <div className="space-y-6">
            {/* Influencer Profile Card */}
            <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8" style={{ backgroundColor: '#FFD1B3' }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-black text-black">{selectedInfluencer.name}</h2>
                    {selectedInfluencer.verified && (
                      <span className="text-white border-2 border-black px-3 py-1 rounded-lg text-sm font-bold" style={{ backgroundColor: '#FF6E1A' }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-black mb-4">{selectedInfluencer.handle}</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-sm text-black opacity-70">Followers</p>
                      <p className="text-2xl font-black text-black">
                        {(selectedInfluencer.followers / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-black opacity-70">Engagement Rate</p>
                      <p className="text-2xl font-black text-black">{selectedInfluencer.engagementRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-black opacity-70">Trust Score</p>
                      <p className="text-2xl font-black text-black">{selectedInfluencer.trustScore}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Insights Section */}
            {premiumInsights.length > 0 && (
              <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8" style={{ backgroundColor: '#B2DBAF' }}>
                <h3 className="text-2xl font-black text-white border-2 border-black px-3 py-2 rounded-lg inline-block mb-6" style={{ backgroundColor: '#F67979' }}>
                  💎 Premium Insights (x402)
                </h3>
                <div className="space-y-4">
                  {premiumInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-6"
                      style={{ backgroundColor: '#FFD1B3' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xl font-black text-black">{insight.title}</h4>
                            <span className="text-white border-2 border-black px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: '#FF6E1A' }}>
                              {insight.price} TRAC
                            </span>
                          </div>
                          <p className="text-black mb-3">{insight.description}</p>
                          {insight.hasAccess ? (
                            <div className="border-2 border-black rounded-lg p-4" style={{ backgroundColor: '#B2DBAF' }}>
                              <p className="text-sm font-bold text-black mb-2">✅ Access Granted</p>
                              <p className="text-black">Full premium content would be displayed here...</p>
                              {insight.ual && (
                                <p className="text-xs text-black opacity-60 font-mono mt-2">
                                  DKG UAL: {insight.ual}
                                </p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-black opacity-70 italic">
                              Connect wallet and pay {insight.price} TRAC to access this premium insight
                            </p>
                          )}
                        </div>
                        {!insight.hasAccess && (
                          <button
                            onClick={() => handleAccessPremium(insight.id, insight.price)}
                            disabled={accessingPremium === insight.id || !isConnected}
                            className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-sm font-bold text-white hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                            style={{ backgroundColor: '#FF6E1A' }}
                          >
                            {accessingPremium === insight.id ? 'Processing...' : 'Pay & Access'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Community Notes Section */}
            <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8" style={{ backgroundColor: '#B2DBAF' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-white border-2 border-black px-3 py-2 rounded-lg inline-block" style={{ backgroundColor: '#F67979' }}>Community Notes</h3>
                <span className="text-white border-2 border-black px-4 py-2 rounded-lg text-sm font-bold" style={{ backgroundColor: '#F67979' }}>
                  {selectedInfluencer.communityNotes.length} Notes
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                {selectedInfluencer.communityNotes.map((note) => (
                  <div
                    key={note.id}
                    className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-6"
                    style={{ backgroundColor: '#FFD1B3' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-black">{note.author}</span>
                          {note.verified && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="text-black mb-2">{note.content}</p>
                        {note.ual && (
                          <p className="text-xs text-black opacity-60 font-mono">
                            DKG UAL: {note.ual}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-black opacity-70">{note.timestamp}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-black font-bold">↑ {note.upvotes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Note Form */}
              {isConnected && (
                <AddNoteForm
                  influencerId={selectedInfluencer.id}
                  onAddNote={handleAddNote}
                />
              )}
            </div>

            {/* Trends Section */}
            <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8" style={{ backgroundColor: '#FFD1B3' }}>
              <h3 className="text-2xl font-black text-white border-2 border-black px-3 py-2 rounded-lg inline-block mb-6" style={{ backgroundColor: '#FF6E1A' }}>Trend Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedInfluencer.trends.map((trend, index) => (
                  <div
                    key={index}
                    className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-6"
                    style={{ backgroundColor: '#B2DBAF' }}
                  >
                    <p className="text-sm text-black opacity-70 mb-2">{trend.metric}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-2xl font-black ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.change)}%
                      </span>
                    </div>
                    <p className="text-xs text-black opacity-60">{trend.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Section */}
            <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8" style={{ backgroundColor: '#B2DBAF' }}>
              <h3 className="text-2xl font-black text-white border-2 border-black px-3 py-2 rounded-lg inline-block mb-6" style={{ backgroundColor: '#F67979' }}>AI-Generated Insights</h3>
              <div className="space-y-4">
                {selectedInfluencer.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-6"
                    style={{ backgroundColor: '#FFD1B3' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white border-2 border-black px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: '#FF6E1A' }}>
                            {insight.type.toUpperCase()}
                          </span>
                          <span className="text-sm text-black opacity-70">
                            Confidence: {insight.confidence}%
                          </span>
                          {insight.isPremium && (
                            <span className="text-white border-2 border-black px-2 py-1 rounded text-xs font-bold" style={{ backgroundColor: '#F67979' }}>
                              💎 Premium
                            </span>
                          )}
                        </div>
                        <h4 className="text-xl font-black text-black mb-2">{insight.title}</h4>
                        <p className="text-black mb-3">{insight.description}</p>
                        <div className="border-2 border-black rounded-lg p-4" style={{ backgroundColor: '#B2DBAF' }}>
                          <p className="text-sm font-bold text-black mb-1">💡 Actionable:</p>
                          <p className="text-black">{insight.actionable}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-12 text-center" style={{ backgroundColor: '#FFD1B3' }}>
            <p className="text-xl text-black mb-4">
              Search for an influencer or query the DKG to analyze data
            </p>
            <p className="text-black opacity-70">
              Try searching for: <span className="font-bold">@alexcrypto</span> or submit your own data above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AddNoteForm({ influencerId, onAddNote }: { influencerId: string; onAddNote: (id: string, note: string) => void }) {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    await onAddNote(influencerId, note);
    setNote('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border-t-2 border-black pt-6 mt-6">
      <h4 className="text-lg font-black text-black mb-4">Add Community Note</h4>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Share your insights about this influencer. This will be published to DKG for transparency and verification."
        className="w-full border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-3 rounded-lg text-black font-medium focus:outline-none focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all mb-4 min-h-[100px]"
        style={{ backgroundColor: '#B2DBAF' }}
      />
      <button
        type="submit"
        disabled={!note.trim() || isSubmitting}
        className="border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-lg font-bold text-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#FF6E1A' }}
      >
        {isSubmitting ? 'Publishing to DKG...' : 'Publish to DKG'}
      </button>
    </form>
  );
}
