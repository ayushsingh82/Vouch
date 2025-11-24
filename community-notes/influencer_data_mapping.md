# Vouch - Influencer Data Mapping Guide

## How to Map Your App Data to JSON-LD

This guide shows how to convert influencer data from your app into JSON-LD format for DKG publishing.

### Data Source Mapping

| App Field | JSON-LD Path | Example |
|-----------|--------------|---------|
| `influencer.name` | `ot:influencerProfile.schema:name` | "Alex Crypto" |
| `influencer.handle` | `ot:influencerProfile.schema:alternateName` | "@alexcrypto" |
| `influencer.platform` | `ot:influencerProfile.schema:identifier.schema:value` | "twitter" |
| `influencer.followers` | `ot:metrics.schema:interactionStatistic[0].schema:userInteractionCount` | 125000 |
| `influencer.engagementRate` | `ot:metrics.ot:engagementRate` | 8.5 |
| `influencer.trendScore` | `ot:metrics.ot:trendScore` | 95 |
| `influencer.category` | `ot:metrics.ot:category` | "crypto" |
| `influencer.verified` | `ot:metrics.ot:verified` | true |
| `insights.authenticityScore` | `ot:aiInsights.ot:authenticityScore` | 92 |
| `insights.botActivityLikelihood` | `ot:aiInsights.ot:botActivityLikelihood` | 4 |
| `communityNotes[].content` | `ot:communityFeedback.ot:verifiedNotes[].schema:text` | "Verified..." |
| `communityNotes[].upvotes` | `ot:communityFeedback.ot:verifiedNotes[].ot:upvotes` | 45 |

### Linking to Guardian Social Graph

**Important**: You must link to existing creator URLs from the Guardian Social Graph.

Example Guardian Creator URLs:
- `https://twitter.com/i/user/748244810692104192`
- `https://x.com/9to5mac`
- `https://reddit.com/user/username`
- `https://youtu.be/channel/ABC123`

Use these URLs in:
- `schema:about.@id` - Links your note to the creator
- `prov:specializationOf.@id` - Links to the original entity

### Payment Tier Mapping (for X402 Integration)

When adding payment tiers, include in `ot:metrics`:

```json
"ot:paymentTier": {
  "@type": "ot:PaymentTier",
  "ot:tier": "small|medium|large",
  "ot:x402Amount": "{AMOUNT_IN_X402}",
  "ot:followerThreshold": {
    "small": 0,
    "medium": 100000,
    "large": 500000
  }
}
```

### Required Fields Checklist

- [ ] `@id` - Unique identifier (URN format)
- [ ] `@type` - Must include `schema:Comment`, `prov:Entity`, `ot:CommunityNote`
- [ ] `schema:about.@id` - Creator URL from Guardian Social Graph
- [ ] `schema:identifier` - Influencer ID/handle
- [ ] `ot:influencerProfile` - Basic profile info
- [ ] `ot:metrics` - Follower count, engagement, trend score
- [ ] `ot:aiInsights` - AI-generated analysis
- [ ] `ot:communityFeedback` - Community notes and trust scores
- [ ] `prov:generatedAtTime` - ISO timestamp
- [ ] `prov:wasAttributedTo` - AI agent DID

### Validation Rules

1. **Creator URL must exist** in Guardian Social Graph
2. **Timestamps** must be ISO 8601 format
3. **Scores** must be 0-100 range
4. **Platform values** must be: twitter, instagram, youtube, tiktok, reddit
5. **Categories** must match your app's category list

### Example Conversion

**From App Data:**
```javascript
{
  id: '1',
  name: 'Alex Crypto',
  handle: '@alexcrypto',
  platform: 'twitter',
  followers: 125000,
  engagementRate: 8.5,
  trendScore: 95,
  category: 'crypto',
  verified: true
}
```

**To JSON-LD:**
```json
{
  "@id": "urn:uuid:vouch-note-alexcrypto-001",
  "ot:influencerProfile": {
    "schema:name": "Alex Crypto",
    "schema:alternateName": "@alexcrypto",
    "schema:identifier": {
      "schema:value": "twitter"
    }
  },
  "ot:metrics": {
    "schema:interactionStatistic": [{
      "schema:userInteractionCount": 125000
    }],
    "ot:engagementRate": 8.5,
    "ot:trendScore": 95,
    "ot:category": "crypto",
    "ot:verified": true
  }
}
```

