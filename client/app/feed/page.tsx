"use client";

import { TokenExploreList } from "@/components/token-explore-list";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export default function ExplorePage() {
  return (
    <div className="container py-10 mx-auto">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Explore</h2>
        <p className="text-muted-foreground">
          Invest in tokenized crops and livestock that you like
        </p>
      </div>
      <Separator className="my-6" />
      {/* <div>some</div> */}
      <div className="w-full flex flex-row gap-6">
        {Object.values(siteConfig.contracts).map((contracts, index) => (
          <TokenExploreList key={index} contracts={contracts} />
        ))}
      </div>
    </div>
  );
}
