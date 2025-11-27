# Resources - Vouch DKG Knowledge Assets

## Purpose
This folder contains JSON-LD Knowledge Assets representing influencer profiles, community notes, verification data, and additional information for the OriginTrail DKG.

## Structure
Each JSON-LD file represents:
- **Influencer Profiles** (Social media influencers with verification data and metrics)
- **Community Notes** (Fact-checks, insights, and community-submitted analysis)
- **Additional Information** (Supplementary articles, context, and related data)
- **Verification Data** (AI-generated authenticity scores and trust metrics)

## Files Included

### Influencer Profiles
- `referenda_example.jsonld` - Example influencer profile (Gavin Wood) with verification data
- Additional influencer profiles can be added here

### Additional Information
- `additional_info.jsonld` - Supplementary articles, analysis, and related information
- Additional context files can be added here

### Influencer Profiles
- `influencer_004_gavinwood.jsonld` - Co-Founder of Polkadot, Parity Technologies
- `influencer_005_roberthabermeier.jsonld` - Co-Founder of Polkadot
- `influencer_006_derekyoo.jsonld` - Founder of Moonbeam
- `influencer_007_bjornwagner.jsonld` - Co-Founder at Parity, Substrate Ecosystem Lead
- `influencer_008_peterczaban.jsonld` - Co-Founder of Polkadot, Web3 Foundation
- `polkadot_ecosystem_influencers.jsonld` - Additional Polkadot/Moonbeam team members

## How to Use

### Publishing to DKG Edge Node

```bash
# Publish an influencer profile
curl -X POST http://localhost:9201/api/dkg/assets \
  -H "Content-Type: application/json" \
  -d @referenda_example.jsonld

# Publish additional information
curl -X POST http://localhost:9201/api/dkg/assets \
  -H "Content-Type: application/json" \
  -d @additional_info.jsonld
```

### What Happens After Publishing
1. DKG Edge Node transforms JSON-LD into RDF triples
2. Knowledge Asset is signed and published to DKG network
3. UAL (Universal Asset Locator) is generated
4. Asset is anchored on blockchain (NeuroWeb/Polkadot)
5. MCP tools can query these triples via SPARQL
6. AI agents can access governance data through MCP

## Data Model

### Influencer Profiles
- **@context**: Uses Schema.org, OriginTrail (ot:), and Vouch (vouch:) vocabularies
- **@type**: `schema:Person`, `ot:InfluencerProfile`, `vouch:VerifiedInfluencer`
- **@id**: Unique influencer identifier (e.g., `vouch:influencer:gavinwood`)
- **schema:about**: Links to social media profiles and related entities
- **ot:metrics**: Engagement, followers, growth rates
- **ot:aiVerification**: Authenticity scores, bot detection, verification status
- **vouch:trustScore**: Community trust score (0-100)

### Community Notes
- **@context**: Schema.org, PROV, OriginTrail vocabularies
- **@type**: `schema:Comment`, `prov:Entity`, `ot:CommunityNote`
- **schema:about**: Links to influencer profile UAL
- **ot:verified**: Whether note has been verified by AI agent
- **ot:trustScore**: Community trust score for the note
- **prov:wasAttributedTo**: Author or AI agent that created the note

### Premium Reports
- **@context**: Schema.org, DKG, and Vouch vocabularies
- **@type**: `schema:Report`
- **schema:about**: Links to parent influencer UAL
- **dkg:reportType**: "premium" or "public"
- **dkg:premiumPrice**: Price in TRAC tokens
- **dkg:privateDataHash**: Hash reference to private data (if applicable)

### Additional Information
- **@context**: Schema.org, PROV vocabularies
- **@type**: `schema:Article`, `prov:Entity`
- **schema:about**: Links to related DKG assets via UAL
- **prov:generatedAtTime**: Timestamp of creation
- **prov:wasAttributedTo**: Author or agent DID

## Integration with DKG

These assets extend the influencer verification knowledge graph by:
- Creating permanent, verifiable records of influencer profiles and reputation
- Linking community notes to influencer profiles via UAL
- Enabling semantic queries across influencer relationships and trends
- Supporting AI agent reasoning over authenticity and trust data
- Providing monetization via x402 for premium insights and analysis

## Querying via MCP/SPARQL

After publishing, agents can query:

```sparql
# Find all influencers by platform
SELECT ?influencer ?name ?handle ?trustScore WHERE {
  ?influencer ot:platform "twitter" ;
             schema:name ?name ;
             schema:alternateName ?handle ;
             vouch:trustScore ?trustScore .
}

# Find all community notes linked to an influencer
SELECT ?note ?content ?verified ?trustScore WHERE {
  ?note schema:about <INFLUENCER_UAL> ;
        schema:text ?content ;
        ot:verified ?verified ;
        ot:trustScore ?trustScore .
}

# Find premium insights requiring payment
SELECT ?insight ?title ?price ?payee WHERE {
  ?insight dkg:reportType "premium" ;
           schema:name ?title ;
           dkg:premiumPrice ?price ;
           dkg:payeeWallet ?payee .
}
```

## x402 Integration

Premium reports can be accessed via x402 payment protocol:
1. Query public metadata (free)
2. Request access to private/premium content
3. Pay via x402 facilitator
4. Receive access token
5. Query full report content
