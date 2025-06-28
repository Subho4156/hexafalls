"use client";

import { TokenFarmList } from "@/components/token-farm-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function FarmPage() {
  return (
    <div className="container py-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">My Farm</h2>
        <p className="text-muted-foreground">
          Crops and livestock you tokenized to attract investments
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col items-start gap-6">
        <Link href="/farm/tokens/new">
          <Button>Create Token</Button>
        </Link>
        <div className="w-full flex flex-col gap-6">
          {Object.values(siteConfig.contracts).map((contracts, index) => (
            <TokenFarmList key={index} contracts={contracts} />
          ))}
        </div>
      </div>
    </div>
  );
}
