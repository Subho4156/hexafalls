"use client";

import { TokenInvestmentsList } from "@/components/token-investments-list";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

export default function InvestmentsPage() {
  return (
    <div className="container py-10 lg:px-80">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">My investments</h2>
        <p className="text-muted-foreground">
          Tokenized crops and livestock in which you invested
        </p>
      </div>
      <Separator className="my-6" />
      <div className="w-full flex flex-col gap-6">
        {Object.values(siteConfig.contracts).map((contracts, index) => (
          <TokenInvestmentsList key={index} contracts={contracts} />
        ))}
      </div>
    </div>
  );
}
