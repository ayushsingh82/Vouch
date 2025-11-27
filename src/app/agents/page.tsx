import { Suspense } from "react";
import InfluencerAgents from "../components/influencer-agents";

function AgentsContent() {
  return <InfluencerAgents />;
}

export default function Agents() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-black font-bold">Loading...</p>
        </div>
      </div>
    }>
      <AgentsContent />
    </Suspense>
  );
}


