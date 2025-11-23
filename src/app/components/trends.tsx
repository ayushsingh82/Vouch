'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface TrendingInfluencer {
  id: string;
  name: string;
  handle: string;
  platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok';
  followers: number;
  engagementRate: number;
  trendScore: number;
  category: string;
  change: number;
  verified: boolean;
  avatar?: string;
}

const categories = [
  { id: 'all', name: 'All Trends', icon: '🔥' },
  { id: 'crypto', name: 'Crypto', icon: '₿' },
  { id: 'tech', name: 'Tech', icon: '💻' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
];

// Mock data - in production, this would come from DKG queries
const mockTrendingInfluencers: TrendingInfluencer[] = [
  {
    id: '1',
    name: 'Alex Crypto',
    handle: '@alexcrypto',
    platform: 'twitter',
    followers: 125000,
    engagementRate: 8.5,
    trendScore: 95,
    category: 'crypto',
    change: 12.5,
    verified: true,
  },
  {
    id: '2',
    name: 'Tech Guru',
    handle: '@techguru',
    platform: 'twitter',
    followers: 250000,
    engagementRate: 7.2,
    trendScore: 88,
    category: 'tech',
    change: 18.3,
    verified: true,
  },
  {
    id: '3',
    name: 'Gaming Pro',
    handle: '@gamingpro',
    platform: 'youtube',
    followers: 500000,
    engagementRate: 9.1,
    trendScore: 92,
    category: 'gaming',
    change: 15.7,
    verified: true,
  },
  {
    id: '4',
    name: 'Fashion Forward',
    handle: '@fashionforward',
    platform: 'instagram',
    followers: 180000,
    engagementRate: 6.8,
    trendScore: 85,
    category: 'fashion',
    change: 9.4,
    verified: true,
  },
  {
    id: '5',
    name: 'Finance Expert',
    handle: '@financeexpert',
    platform: 'twitter',
    followers: 320000,
    engagementRate: 7.9,
    trendScore: 90,
    category: 'finance',
    change: 22.1,
    verified: true,
  },
  {
    id: '6',
    name: 'Sports Analyst',
    handle: '@sportsanalyst',
    platform: 'twitter',
    followers: 150000,
    engagementRate: 8.3,
    trendScore: 87,
    category: 'sports',
    change: 11.2,
    verified: true,
  },
  {
    id: '7',
    name: 'Movie Critic',
    handle: '@moviecritic',
    platform: 'youtube',
    followers: 280000,
    engagementRate: 6.5,
    trendScore: 83,
    category: 'entertainment',
    change: 7.8,
    verified: true,
  },
  {
    id: '8',
    name: 'DeFi Master',
    handle: '@defimaster',
    platform: 'twitter',
    followers: 95000,
    engagementRate: 9.5,
    trendScore: 93,
    category: 'crypto',
    change: 25.3,
    verified: true,
  },
  {
    id: '9',
    name: 'AI Researcher',
    handle: '@airesearcher',
    platform: 'twitter',
    followers: 200000,
    engagementRate: 8.1,
    trendScore: 89,
    category: 'tech',
    change: 16.9,
    verified: true,
  },
  {
    id: '10',
    name: 'Stream King',
    handle: '@streamking',
    platform: 'tiktok',
    followers: 750000,
    engagementRate: 10.2,
    trendScore: 96,
    category: 'gaming',
    change: 30.5,
    verified: true,
  },
];

export default function TrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'trendScore' | 'change' | 'followers'>('trendScore');

  const filteredInfluencers = selectedCategory === 'all'
    ? mockTrendingInfluencers
    : mockTrendingInfluencers.filter(inf => inf.category === selectedCategory);

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    if (sortBy === 'trendScore') return b.trendScore - a.trendScore;
    if (sortBy === 'change') return b.change - a.change;
    return b.followers - a.followers;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return '🐦';
      case 'instagram': return '📷';
      case 'youtube': return '▶️';
      case 'tiktok': return '🎵';
      default: return '📱';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans tracking-tight">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-8 mb-8" style={{ backgroundColor: '#FFD1B3' }}>
          <h1 className="text-4xl font-black text-black mb-4">
            🔥 Trending Influencers
          </h1>
          <p className="text-lg text-black mb-6">
            Discover the most trending influencers across different categories. 
            Data powered by DKG for transparent, verifiable insights.
          </p>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-xl font-black text-black mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
                      : 'text-black hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? '#FF6E1A' : '#B2DBAF'
                  }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-black font-bold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded-lg text-black font-medium focus:outline-none focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
            >
              <option value="trendScore">Trend Score</option>
              <option value="change">Growth Rate</option>
              <option value="followers">Followers</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-lg p-4 inline-block" style={{ backgroundColor: '#69A3E1' }}>
          <p className="text-black font-bold">
            Showing {sortedInfluencers.length} trending influencer{sortedInfluencers.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Trending Influencers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedInfluencers.map((influencer) => (
            <Link
              key={influencer.id}
              href={`/agents?search=${encodeURIComponent(influencer.handle)}`}
              className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-6 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getPlatformIcon(influencer.platform)}</span>
                    <h3 className="text-xl font-black text-black">{influencer.name}</h3>
                    {influencer.verified && (
                      <span className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-black mb-3">{influencer.handle}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-white px-3 py-1 rounded-lg text-xs font-bold border-2 border-black" style={{ backgroundColor: '#FF6E1A' }}>
                      {categories.find(c => c.id === influencer.category)?.icon} {categories.find(c => c.id === influencer.category)?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trend Score Badge */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-black opacity-70">Trend Score</span>
                  <span className="text-2xl font-black text-black">{influencer.trendScore}</span>
                </div>
                <div className="w-full bg-gray-200 border-2 border-black rounded-full h-3">
                  <div
                    className="bg-black h-full rounded-full transition-all"
                    style={{ width: `${influencer.trendScore}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border-2 border-black rounded-lg p-3" style={{ backgroundColor: '#FAE88A' }}>
                  <p className="text-xs text-black opacity-70 mb-1">Followers</p>
                  <p className="text-lg font-black text-black">
                    {(influencer.followers / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="border-2 border-black rounded-lg p-3" style={{ backgroundColor: '#FAE88A' }}>
                  <p className="text-xs text-black opacity-70 mb-1">Engagement</p>
                  <p className="text-lg font-black text-black">{influencer.engagementRate}%</p>
                </div>
              </div>

              {/* Growth Indicator */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-black opacity-70">Growth (30d)</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-green-600">
                    ↑ {influencer.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {sortedInfluencers.length === 0 && (
          <div className="bg-white border-2 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-2xl p-12 text-center">
            <p className="text-xl text-black">
              No trending influencers found in this category.
            </p>
            <p className="text-black opacity-70 mt-2">
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

