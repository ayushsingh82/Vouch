'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
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
}

interface CommunityNote {
  id: string;
  author: string;
  content: string;
  verified: boolean;
  upvotes: number;
  timestamp: string;
  dkgHash?: string;
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
}

export default function InfluencerAgents() {
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
          dkgHash: '0x1234...abcd'
        },
        {
          id: 'n2',
          author: 'Trend Analyst',
          content: 'Strong correlation with crypto market trends. Audience shows high interest in DeFi topics.',
          verified: true,
          upvotes: 32,
          timestamp: '2024-01-14',
          dkgHash: '0x5678...efgh'
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
          confidence: 78
        }
      ]
    }
  ];

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
    await handleSearchWithQuery(searchQuery);
  };

  const handleAddNote = async (influencerId: string, note: string) => {
    // In production, this would publish to DKG
    console.log('Publishing note to DKG:', { influencerId, note });
    // Simulate DKG publish
    alert('Note published to DKG! Hash: 0x' + Math.random().toString(16).substring(2));
  };

  return (
    <div className="min-h-screen bg-white font-sans tracking-tight">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8 mb-8" style={{ backgroundColor: '#B2DBAF' }}>
          <h1 className="text-4xl font-black text-black mb-4">
            Social & Influencer AI Agents
          </h1>
          <p className="text-lg text-black mb-6">
            Analyze social media influencers' impact and engagement by connecting and interpreting 
            multi-source knowledge graphs on DKG. Get actionable insights, trend detection, and 
            audience optimizations leveraging decentralized knowledge.
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search influencer by handle or name (e.g., @alexcrypto)"
              className="flex-1 bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-black font-medium focus:outline-none focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
            />
            <button
              onClick={handleSearch}
              disabled={isAnalyzing}
              className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-8 py-3 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        {selectedInfluencer ? (
          <div className="space-y-6">
            {/* Influencer Profile Card */}
            <div className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-black text-black">{selectedInfluencer.name}</h2>
                    {selectedInfluencer.verified && (
                      <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">
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

            {/* Community Notes Section */}
            <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8" style={{ backgroundColor: '#F67979' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-black">Community Notes</h3>
                <span className="text-white px-4 py-2 rounded-lg text-sm font-bold border-2 border-black" style={{ backgroundColor: '#FF6E1A' }}>
                  {selectedInfluencer.communityNotes.length} Notes
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                {selectedInfluencer.communityNotes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-6"
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
                        {note.dkgHash && (
                          <p className="text-xs text-black opacity-60 font-mono">
                            DKG Hash: {note.dkgHash}
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
            <div className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8">
              <h3 className="text-2xl font-black text-black mb-6">Trend Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedInfluencer.trends.map((trend, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-6"
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
            <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8" style={{ backgroundColor: '#FFD1B3' }}>
              <h3 className="text-2xl font-black text-black mb-6">AI-Generated Insights</h3>
              <div className="space-y-4">
                {selectedInfluencer.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-black text-white px-3 py-1 rounded-lg text-xs font-bold">
                            {insight.type.toUpperCase()}
                          </span>
                          <span className="text-sm text-black opacity-70">
                            Confidence: {insight.confidence}%
                          </span>
                        </div>
                        <h4 className="text-xl font-black text-black mb-2">{insight.title}</h4>
                        <p className="text-black mb-3">{insight.description}</p>
                        <div className="bg-gray-100 border-2 border-black rounded-lg p-4">
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
          <div className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-12 text-center">
            <p className="text-xl text-black mb-4">
              Search for an influencer to analyze their impact and engagement
            </p>
            <p className="text-black opacity-70">
              Try searching for: <span className="font-bold">@alexcrypto</span>
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
        className="w-full bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-3 rounded-lg text-black font-medium focus:outline-none focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all mb-4 min-h-[100px]"
      />
      <button
        type="submit"
        disabled={!note.trim() || isSubmitting}
        className="bg-white border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-lg font-bold text-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Publishing to DKG...' : 'Publish to DKG'}
      </button>
    </form>
  );
}

