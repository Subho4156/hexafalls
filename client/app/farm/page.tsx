"use client";

import { TokenFarmList } from "@/components/token-farm-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { BadgePlus } from 'lucide-react';
import Link from "next/link";

export default function FarmPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-6">
        <div className="w-full flex flex-col gap-6">
          {Object.values(siteConfig.contracts).map((contracts, index) => (
            <TokenFarmList key={index} contracts={contracts} />
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <Link href="/farm/tokens/new">
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg px-6 py-4 text-base cursor-pointer"
        >
          Create Token
              <BadgePlus />
        </Button>
      </Link>
    </div>
  );
}
