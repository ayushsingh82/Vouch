# Vouch - Community Notes Knowledge Assets

## Purpose
This folder contains JSON-LD Knowledge Assets representing influencer community notes and AI-generated insights for the OriginTrail DKG.

## Structure
Each JSON-LD file represents:
- **Influencer Profile Data** (linked to Guardian Social Graph creators)
- **AI-Generated Insights** (authenticity, trends, engagement analysis)
- **Community Notes** (fact-checks, trust scores, verified claims)
- **Metrics & Analytics** (followers, engagement rates, growth trends)

## Files Included

### General Influencers
- `influencer_001_alexcrypto.jsonld` - Crypto influencer example
- `influencer_002_streamking.jsonld` - Gaming/TikTok influencer example
- `influencer_003_defimaster.jsonld` - DeFi expert example

### Polkadot Ecosystem Influencers
- `influencer_004_gavinwood.jsonld` - Co-Founder of Polkadot, Parity Technologies
- `influencer_005_roberthabermeier.jsonld` - Co-Founder of Polkadot
- `influencer_006_derekyoo.jsonld` - Founder of Moonbeam
- `influencer_007_bjornwagner.jsonld` - Co-Founder at Parity, Substrate Ecosystem Lead
- `influencer_008_peterczaban.jsonld` - Co-Founder of Polkadot, Web3 Foundation
- `polkadot_ecosystem_influencers.jsonld` - Additional Polkadot/Moonbeam team members (Alberto, Adam Liposky, Aarya Ravahi, Nick Odio, Ryan Whitehead)

### Templates
- `influencer_template.jsonld` - Template for creating new influencer notes

## How Teammates Should Use This

### Publishing to DKG Edge Node

```bash
# Publish a single community note
curl -X POST http://localhost:8900/api/v1/knowledge-asset/publish \
  -H "Content-Type: application/json" \
  -d @influencer_001.jsonld
```

### What Happens After Publishing
1. DKG Edge Node transforms JSON-LD into RDF triples
2. Knowledge Asset is signed and published to DKG network
3. MCP tools can query these triples via SPARQL
4. AI agents can access influencer insights through MCP

## Data Model
- **@context**: Uses Schema.org, PROV, FOAF vocabularies
- **@type**: `schema:Comment`, `prov:Entity`, `ot:CommunityNote`
- **schema:about**: Links to Guardian Social Graph post/creator URLs
- **prov:generatedAtTime**: Timestamp of note creation
- **prov:wasAttributedTo**: AI agent or contributor DID

## Integration with Guardian Social Graph
These notes extend the existing Guardian Social Graph by:
- Linking to creator profiles via `schema:about`
- Adding fact-check annotations to posts
- Providing AI-verified insights about influencer authenticity
- Creating trust scores and community feedback

## Querying via MCP
After publishing, agents can query:

```sparql
SELECT ?note ?text ?trustScore WHERE {
  ?note schema:about <CREATOR_URL> ;
        schema:text ?text ;
        ot:trustScore ?trustScore .
}
```

