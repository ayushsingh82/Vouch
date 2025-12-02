# Vouch - Decentralized Influencer Verification Platform

## Executive Summary

Vouch is a decentralized transparency engine for social media influencer verification and community fact-checking. It leverages the OriginTrail Decentralized Knowledge Graph (DKG) to create a verifiable, immutable history of influencer authenticity, community notes, trust scores, and engagement analytics.

By combining AI-driven verification (Agent Layer), DKG semantic linking (Knowledge Layer), and automated payment incentives via x402 (Trust Layer), we address the critical lack of transparency in influencer marketing and social media authenticity. This project transforms fragmented social data into a living, queryable Knowledge Graph while enabling monetization of premium insights for community auditors.

## Problem Statement & Motivation

The social media ecosystem suffers from significant transparency and verification issues:

- **Lack of Authenticity Verification**: There is no reliable mechanism to verify influencer authenticity, detect bot activity, or validate engagement metrics across platforms.
- **Fragmented Community Notes**: Fact-checks and community insights are scattered across platforms, making it difficult to build comprehensive trust profiles.
- **No Reputation History**: Influencers can delete negative content or change profiles, losing historical reputation data.
- **Inefficient Monetization**: Community auditors and fact-checkers have no way to monetize high-quality insights and deep analysis.

## Solution Overview

Vouch is a decentralized application that acts as a "Truth Layer" for social media influencers. The system allows community members to submit verified, immutable reports (authenticity checks, engagement analysis, fact-checks) via the OriginTrail DKG.

### Key Features

- **AI-Powered Verification**: Automated validation of influencer authenticity, bot detection, and engagement quality using Large Language Models (LLMs).
- **Semantic Discovery**: Query relationships between influencers, topics, and trends using DKG's semantic graph capabilities.
- **Community Notes System**: Immutable fact-checks and community insights linked to influencer profiles via DKG.
- **Monetized Premium Insights**: Implementation of the x402 protocol allows reporters to monetize high-value analysis (deep audience insights, competitive intelligence) while keeping basic metadata public.
- **Cross-Platform Reputation**: Unified trust scores and reputation history that survives platform changes or content deletion.

## The Three-Layer Architecture

This project strictly adheres to the hackathon's architectural requirements, ensuring synergy across Agents, Knowledge, and Trust.

### Layer 1: Agent Layer (AI Verification & Orchestration)

**Role**: The Verification Agent.

**Implementation**: 
- When a user submits an influencer report or community note, a backend AI agent (powered by ChatGPT/OpenAI) intercepts the data
- The agent analyzes content for authenticity, bot activity detection, engagement quality, and relevance
- Verification includes checking influencer profile consistency, engagement patterns, and content quality

**Function**: 
- Acts as a gatekeeper, ensuring only high-quality, verified knowledge assets are published to the DKG
- Provides confidence scores for authenticity, engagement quality, and trustworthiness
- Generates actionable insights about influencer performance and audience demographics
- Detects anomalies and potential fraud indicators

**Synergy**: This agent ensures data quality before publication, creating a trusted knowledge base that other agents can reliably query and reason over.

**Technical Implementation**:
- AI verification service validates influencer data and community notes
- Confidence scoring system (0-100 scale) for authenticity, engagement, and trust
- Automatic flagging of suspicious patterns (bot activity, fake engagement)
- Detailed reasoning provided for verification decisions

### Layer 2: Knowledge Layer (OriginTrail DKG)

**Role**: The Connective Tissue.

**Implementation**: 
- Utilizes the DKG Edge Node to ingest and publish influencer profiles, community notes, and analytics
- Converts user submissions into JSON-LD (Linked Data) format with proper schema.org vocabularies
- Creates semantic links between influencers, topics, trends, and community notes

**Data Structure**:
- **Entities**: Influencer profiles are mapped as parent nodes with unique UALs (Universal Asset Locators)
- **Assets**: Community notes, fact-checks, and analytics are converted into JSON-LD with proper schemas
- **Linking**: Automatic relationships via `schema:about`, `schema:author`, and custom `ot:` properties

**Result**: A global, verifiable graph of influencer reputation and community insights that survives platform changes or content deletion.

**Technical Implementation**:
- DKG Edge Node integration for asset publication
- JSON-LD schema validation before publication
- UAL generation and tracking for all published assets
- SPARQL query support for semantic discovery
- Blockchain anchoring on NeuroWeb/Polkadot with cryptographic timestamps

**Query Capabilities**:
- Semantic queries across influencer relationships
- Historical tracking of reputation changes
- Community note aggregation and verification
- Cross-platform influencer analysis
- Trend detection and pattern analysis

### Layer 3: Trust Layer (Incentives, x402 & Smart Contracts)

**Role**: Economic Backbone & Reputation.

**Implementation**:

1. **Staking for Quality**: 
   - Users can stake tokens to submit premium reports or community notes
   - Economic barrier ensures commitment and quality
   - Staking amount calculated based on data size and report type

2. **Automated Reward System**: 
   - Upon successful DKG publication and verification, rewards are distributed
   - Community upvotes and verification status influence reward amounts
   - Automated distribution reduces friction for contributors

3. **x402 Protocol Integration**: 
   - For premium insights (deep audience analysis, competitive intelligence), utilizes x402 to gate content
   - Allows direct peer-to-peer monetization of high-value data
   - Public metadata remains accessible, private/premium content requires payment
   - Automatic payment verification and access granting

4. **Reputation System**: 
   - Contributors build reputation through verified submissions
   - Trust scores influence visibility and rewards
   - Historical reputation survives across sessions

**Technical Implementation**:
- Smart contract integration for stake management (future)
- Automated reward distribution upon DKG confirmation
- x402 middleware for payment verification
- Wallet signature verification for authentication
- Access control system for premium content

## Technical Implementation & User Flow

### Data Ingestion
- Users can search for influencers by handle, name, or platform
- System queries DKG for existing influencer profiles
- Real-time synchronization with social media platforms (via APIs)

### Report/Note Submission
1. User searches for or selects an influencer
2. User submits community note or analysis in JSON-LD format (with validation)
3. User connects wallet for authentication
4. System validates JSON-LD structure and required fields

### Agent Verification
1. Backend sends the payload to the AI Agent
2. Agent verifies influencer authenticity, engagement quality, and content relevance
3. Agent checks for bot activity, fake engagement, and suspicious patterns
4. Verification result (approved/rejected) with confidence score and reasoning

### DKG Publication
1. If verified, the DKG Edge Node publishes the asset to the network
2. The asset is anchored on the blockchain (NeuroWeb/Polkadot) with a cryptographic timestamp
3. UAL (Universal Asset Locator) is generated and stored
4. Relationships are established in the knowledge graph (influencer → notes → insights)

### Premium Access (x402)
1. Consumers view public metadata and basic insights
2. If they wish to view premium content, the x402 gateway requests a micropayment
3. Payment is verified on-chain via x402 facilitator
4. Access is granted and premium content is unlocked

## Impact & Strategic Alignment

This project directly addresses the hackathon challenge by leveraging the 3 core layers to solve a specific, high-value problem in social media and influencer marketing.

### For Users
- Transparent influencer verification and authenticity checks
- Community-driven fact-checking and reputation building
- Access to premium insights via x402 payments
- Immutable reputation history that survives platform changes

### For Contributors
- Monetization channel (via x402) for high-quality analysis and fact-checking
- Automated reward system reduces friction
- Reputation building through verified contributions
- Direct access to DKG for querying and analysis

### For AI Agents
- Enables autonomous agents to query DKG for influencer authenticity
- Supports AI-driven content recommendations based on trust scores
- Provides structured data for machine learning models
- Enables automated trend detection and pattern analysis

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **RainbowKit + Wagmi**: Wallet connectivity
- **React Query**: Data fetching and caching

### Backend
- **Node.js/Express**: API server
- **SQLite**: Local database for influencers and notes
- **OpenAI API**: AI verification agent
- **DKG Edge Node**: Knowledge graph publication
- **x402 Protocol**: Payment gateway integration

### Blockchain
- **OriginTrail Parachain**: DKG blockchain anchoring
- **x402 Facilitator**: Payment processing
- **Smart Contracts**: Stake and reward automation (future)

        # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- DKG Edge Node running (for DKG publication)
- Wallet with testnet tokens (for x402 payments)
- OpenAI API key (for AI verification)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

### Environment Variables

```env
# DKG Configuration
DKG_CHAT_API_URL=http://localhost:9201
DKG_EXPLORER_BASE=https://dkg.origintrail.io

# AI Verification
OPENAI_API_KEY=your_openai_key
AI_VERIFICATION_THRESHOLD=0.7

# x402 Payment
X402_FACILITATOR_URL=http://localhost:3000
X402_PAYMENT_TOKEN=TRAC

# Admin Configuration
ADMIN_ADDRESSES=0x...

# API Configuration
API_URL=http://localhost:3001
```

## Usage

### Submitting a Community Note

1. Navigate to an influencer profile
2. Click "Add Community Note"
3. Fill in your fact-check or insight
4. Connect wallet and sign message
5. Wait for AI verification
6. Note is automatically published to DKG upon approval
7. Receive UAL for your submission

### Querying Agents via x402

1. Navigate to Agents page
2. Enter influencer handle or search query
3. For premium insights, connect wallet
4. Approve x402 payment if required
5. View full analysis and insights

### Accessing Premium Insights

1. Find premium insight on influencer profile
2. Click "Pay & Access"
3. Connect wallet if not already connected
4. Approve x402 payment transaction
5. Access granted automatically upon payment verification

## Future Work

- **Cross-Platform Integration**: Direct API integration with Twitter, Instagram, YouTube, TikTok
- **Advanced Analytics Dashboard**: Real-time trend detection and influencer performance metrics
- **Mobile App**: Native mobile application for on-the-go verification
- **Reputation Marketplace**: Buy/sell reputation scores and verified badges
- **Automated Monitoring**: AI agents that continuously monitor and update influencer profiles

## Contributing

This project is built for the Polkadot/OriginTrail hackathon. Contributions, feedback, and suggestions are welcome!

## License

[Specify your license here]

## Acknowledgments

- OriginTrail for the DKG infrastructure
- x402 protocol for payment integration
- OpenAI for AI verification capabilities
- Polkadot ecosystem for blockchain infrastructure
