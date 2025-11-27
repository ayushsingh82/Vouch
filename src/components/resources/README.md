# Resources - Governance DKG Knowledge Assets

## Purpose
This folder contains JSON-LD Knowledge Assets representing Polkadot governance proposals, reports, and additional information for the OriginTrail DKG.

## Structure
Each JSON-LD file represents:
- **Governance Proposals** (Polkadot OpenGov referenda with full metadata)
- **Premium Reports** (Community-submitted analysis and audits)
- **Additional Information** (Supplementary data, articles, and context)
- **Influencer Profiles** (Polkadot ecosystem leaders and contributors)

## Files Included

### Governance Proposals
- `referenda_example.jsonld` - Example Polkadot OpenGov proposal with full schema
- Additional proposal examples can be added here

### Additional Information
- `additional_info.jsonld` - Supplementary articles, context, and related information
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
# Publish a governance proposal
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

### Governance Proposals
- **@context**: Uses Schema.org, custom Polkadot governance vocabularies
- **@type**: `GovernanceProposal`, `schema:Proposal`
- **@id**: Unique proposal identifier (e.g., `polkadot:referendum:5`)
- **schema:about**: Links to related entities and proposals
- **polkadot:treasurySpend**: Treasury allocation details
- **polkadot:votingResults**: Voting outcome data

### Premium Reports
- **@context**: Schema.org, DKG, and Polkadot vocabularies
- **@type**: `schema:Report`
- **schema:about**: Links to parent proposal UAL
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

These assets extend the Polkadot governance knowledge graph by:
- Creating permanent, verifiable records of proposals
- Linking reports to parent proposals via UAL
- Enabling semantic queries across proposal relationships
- Supporting AI agent reasoning over governance data
- Providing monetization via x402 for premium content

## Querying via MCP/SPARQL

After publishing, agents can query:

```sparql
# Find all proposals by a specific proposer
SELECT ?proposal ?title ?status WHERE {
  ?proposal polkadot:proposer ?proposer ;
            schema:name ?title ;
            polkadot:status ?status .
  ?proposer schema:identifier "15oXzySe6tjF2MumHfUodH8pFQWjy2hraRmXUJXXMKKY6p3F" .
}

# Find all reports linked to a proposal
SELECT ?report ?name ?verificationStatus WHERE {
  ?report schema:about <PROPOSAL_UAL> ;
          schema:name ?name ;
          polkadot:verificationStatus ?verificationStatus .
}

# Find premium reports requiring payment
SELECT ?report ?price ?payee WHERE {
  ?report dkg:reportType "premium" ;
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
