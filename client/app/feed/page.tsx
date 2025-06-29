"use client";

import { TokenExploreList } from "@/components/token-explore-list";
import { siteConfig } from "@/config/site";

export default function ExplorePage() {
  return (
    <div className="container py-10 mx-auto">
      <div className="w-full flex flex-row gap-6">
        {Object.values(siteConfig.contracts).map((contracts, index) => (
          <TokenExploreList key={index} contracts={contracts} />
        ))}
      </div>
    </div>
  );
}
