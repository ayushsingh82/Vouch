# Polkadot Governance DKG - Decentralized Transparency Engine

## Executive Summary

Polkadot Governance DKG is a decentralized transparency engine designed for Polkadot OpenGov. It leverages the OriginTrail Decentralized Knowledge Graph (DKG) to create a verifiable, immutable history of proposal milestones, reporter reputation, and governance updates.

By combining AI-driven verification (Agent Layer), DKG semantic linking (Knowledge Layer), and automated smart contract incentives (Trust Layer), we address the critical lack of accountability in the $100M+ annual Polkadot Treasury spend. This project transforms static proposal data into a living, queryable Knowledge Graph while automating rewards for honest community auditors.

## Problem Statement & Motivation

Polkadot OpenGov allocates nearly $100 million annually for proposals and bounties. Despite this scale, the ecosystem suffers from significant transparency and data discovery issues:

- **Lack of On-Chain Accountability**: There is no native mechanism to track milestone updates or historical changes to proposals on-chain.
- **Title Manipulation**: Proposers can alter titles (e.g., changing a failing proposal's title to "Please Vote Nay") to evade negative reputation. These changes are currently lost to history.
- **Fragmented Reporting**: Honest teams publish milestone reports on social media or disparate forums, making it difficult for voters to find updates.
- **Inefficient Tipping System**: The current tipping mechanism for independent auditors is slow, manual, and tedious. It consumes valuable voter time and often discourages consistent community reporting due to the friction of applying for and receiving small tips.

## Solution Overview

We have built a decentralized application that acts as a "Truth Layer" for OpenGov. The system fetches live proposals and allows community members to attach verified, immutable reports (metadata, progress updates, audits) to them via the OriginTrail DKG.

### Key Features

- **Automated "Stake-to-Reward" Model**: Replaces manual tipping with a smart contract system. Users stake to submit; upon successful verification and DKG publication, the smart contract automatically refunds the stake and issues a reward from a dedicated OpenGov-funded pool.
- **Semantic Discovery**: Unlike keyword searches, our DKG integration allows users to query the relationship between entities (e.g., "Show all rejected proposals by Author X that had a title change")
- **AI Verification**: Automated validation of reports using Large Language Models (LLMs) to prevent spam and ensure relevance.
- **Monetized Data Access**: Implementation of the x402 protocol allows reporters to monetize high-value, private intelligence (alpha/deep audits) while keeping metadata public.

## The Three-Layer Architecture

This project strictly adheres to the hackathon's architectural requirements, ensuring synergy across Agents, Knowledge, and Trust.

### Layer 1: Agent Layer (AI Verification & Orchestration)

**Role**: The Verification Agent.

**Implementation**: 
- When a user submits a report, a backend AI agent (powered by ChatGPT/OpenAI) intercepts the data
- The agent analyzes the JSON-LD content against the Parent Proposal to verify legitimacy and context
- Verification includes checking relevance, accuracy, and preventing spam submissions

**Function**: 
- Acts as a gatekeeper, ensuring only high-quality, relevant knowledge assets are published to the DKG
- Effectively "reasons" over the data before it becomes permanent
- Provides confidence scores and reasoning for verification decisions

**Synergy**: This agent acts as a gatekeeper, ensuring only high-quality, relevant knowledge assets are published to the DKG, effectively "reasoning" over the data before it becomes permanent.

**Technical Implementation**:
- AI verification service validates report content against proposal data
- Confidence scoring system (0-1 scale) with configurable threshold
- Automatic rejection of low-quality or irrelevant submissions
- Detailed reasoning provided for verification decisions

### Layer 2: Knowledge Layer (OriginTrail DKG)

**Role**: The Connective Tissue.

**Implementation**: 
- Utilizes the DKG Edge Node (Hard Requirement) to ingest and publish reports
- Converts user reports into JSON-LD (Linked Data) format
- Automatically appends Parent Proposal URI to reports, creating permanent graph links

**Data Structure**:
- **Entities**: Proposals are mapped as parent nodes with unique UALs (Universal Asset Locators)
- **Assets**: User reports are converted into JSON-LD with proper schema.org and custom vocabularies
- **Linking**: Automatic parent-child relationships via `schema:about` and `schema:isPartOf` properties

**Result**: A global, verifiable graph of governance history that survives UI changes or forum deletions.

**Technical Implementation**:
- DKG Edge Node integration for asset publication
- JSON-LD schema validation before publication
- UAL generation and tracking for all published assets
- SPARQL query support for semantic discovery
- Blockchain anchoring on NeuroWeb/Polkadot with cryptographic timestamps

**Query Capabilities**:
- Semantic queries across proposal relationships
- Historical tracking of proposal changes
- Reporter reputation graphs
- Cross-proposal pattern analysis

### Layer 3: Trust Layer (Incentives, x402 & Smart Contracts)

**Role**: Economic Backbone & Reputation.

**Implementation**:

1. **Staking for Quality**: 
   - Users must sign a transaction and stake tokens to submit a report
   - Economic barrier prevents spam and ensures commitment
   - Staking amount calculated based on data size

2. **Automated Reward Pool**: 
   - Upon successful DKG publication, a smart contract is triggered
   - Validates the publication event and automatically executes a transaction
   - Refunds user's stake + distributes reward to the original signing wallet

3. **Sustainable Funding**: 
   - System designed to connect to a dedicated OpenGov bounty/pool
   - Automates the "tipping" process without requiring manual administrative votes
   - Reduces friction for community reporting

4. **x402 Protocol Integration**: 
   - For premium reports (deep audits), utilizes x402 to gate content
   - Allows direct peer-to-peer monetization of high-value data
   - Public metadata remains accessible, private content requires payment
   - Automatic payment verification and access granting

**Technical Implementation**:
- Smart contract integration for stake management
- Automated reward distribution upon DKG confirmation
- x402 middleware for payment verification
- Wallet signature verification for authentication
- Access control system for premium content

## Technical Implementation & User Flow

### Data Ingestion
- The app fetches all live Polkadot OpenGov proposals (1,700+) and displays them via a web UI
- Real-time synchronization with Polkadot chain state
- Proposal metadata extraction and normalization

### Report Construction
1. User selects a proposal from the interface
2. User inputs report data in JSON-LD format (with validation)
3. User connects wallet for authentication
4. System validates JSON-LD structure and required fields

### The Trust Check (Staking)
1. System calculates a staking fee based on data size
2. Auto-Wallet Signing: The user approves the transaction to stake tokens for the submission
3. Transaction is signed and submitted to the blockchain

### Agent Verification
1. Backend sends the payload to the AI Agent
2. Agent verifies the report relates to the proposal ID
3. Agent checks content quality, relevance, and accuracy
4. Verification result (approved/rejected) with confidence score and reasoning

### DKG Publication
1. If verified, the DKG Edge Node publishes the asset to the network
2. The asset is anchored on the blockchain (NeuroWeb/Polkadot) with a cryptographic timestamp
3. UAL (Universal Asset Locator) is generated and stored
4. Parent-child relationships are established in the knowledge graph

### Automated Reward Trigger
1. Once the DKG confirms publication, the backend triggers the Reward Smart Contract
2. The contract sends Stake + Reward back to the user's wallet
3. Transaction hash is recorded for transparency

### Consumption (x402)
1. Consumers view the public graph and metadata
2. If they wish to view "Private" content, the x402 gateway requests a micropayment
3. Payment is verified on-chain
4. Access is granted and content is unlocked

## Impact & Strategic Alignment

This project directly addresses the "Wild Card" challenge by leveraging the 3 core layers to solve a specific, high-value problem in the Polkadot ecosystem.

### For Polkadot
- Creates a permanent, uncensorable reputation history for proposers
- Secures the $100M treasury against repeat bad actors
- Enables transparent governance decision-making
- Provides historical audit trail for all proposals

### For Reporters
- Provides a monetization channel (via x402) for governance auditors who currently work for free
- Incentivizes higher-quality due diligence
- Automated reward system reduces friction
- Reputation building through verified contributions

### For AI
- Enables future autonomous agents to query the DKG to "vote" on proposals based on the historical reliability of the proposer
- Enables AI-driven governance assistance
- Provides structured data for machine learning models
- Supports automated proposal analysis and recommendations

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **RainbowKit + Wagmi**: Wallet connectivity
- **React Query**: Data fetching and caching

### Backend
- **Node.js/Express**: API server
- **SQLite**: Local database for proposals and reports
- **OpenAI API**: AI verification agent
- **DKG Edge Node**: Knowledge graph publication
- **x402 Protocol**: Payment gateway integration

### Blockchain
- **Polkadot/Substrate**: Governance proposal data source
- **OriginTrail Parachain**: DKG blockchain anchoring
- **Smart Contracts**: Stake and reward automation

## Project Structure

```
Polkadot-sHLOK/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── agents/            # Agent query and submission page
│   │   ├── trends/            # Trends and analytics page
│   │   └── components/       # Page components
│   ├── components/           # Reusable UI components
│   │   └── resources/        # JSON-LD resources and examples
│   └── providers/            # React context providers
├── resources/                # Additional resources and schemas
└── README.md                 # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- DKG Edge Node running (for DKG publication)
- Wallet with testnet tokens (for staking/rewards)
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

### Submitting a Report

1. Navigate to a proposal page
2. Click "Submit Report"
3. Fill in JSON-LD data (or use example template)
4. Connect wallet and approve staking transaction
5. Wait for AI verification
6. Report is automatically published to DKG upon approval
7. Receive stake refund + reward

### Querying Agents via x402

1. Navigate to Agents page
2. Enter query or search term
3. For premium insights, connect wallet
4. Approve x402 payment if required
5. View full analysis and insights

### Accessing Premium Reports

1. Find premium report in proposal or agent page
2. Click "View Premium Content"
3. Connect wallet if not already connected
4. Approve x402 payment transaction
5. Access granted automatically upon payment verification

## Future Work

- **Automated AI Voting**: Agents that not only verify reports but cast votes on proposals based on DKG data trends
- **Cross-Chain Reputation**: Extending the schema to track reputation across other Parachains
- **Advanced Analytics**: Dashboard for proposal success rates, reporter reputation scores, and ecosystem health metrics
- **Mobile App**: Native mobile application for on-the-go governance participation
- **Integration with Polkassembly**: Direct integration with existing governance platforms

## Contributing

This project is built for the Polkadot hackathon. Contributions, feedback, and suggestions are welcome!

## License

[Specify your license here]

## Acknowledgments

- OriginTrail for the DKG infrastructure
- Polkadot ecosystem for governance data
- OpenAI for AI verification capabilities
- x402 protocol for payment integration
