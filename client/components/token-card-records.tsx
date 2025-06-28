"use client";

import { SiteConfigContracts } from "@/config/site";
import EntityList from "./entity-list";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAccount } from "wagmi";
import { isAddressEqual, zeroAddress } from "viem";
import { FarmTokenMetadata } from "@/types/farm-token-metadata";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { TokenAddRecordDialog } from "./token-add-record-dialog";

export function TokenCardRecords(props: {
  token: string;
  tokenMetadata: FarmTokenMetadata;
  tokenOwner: `0x${string}`;
  tokenInvestmentTokenSymbol: string;
  tokenReturnDate: string;
  contracts: SiteConfigContracts;
  onUpdate: () => void;
}) {
  const { address } = useAccount();
  const [isExpanded, setIsExpanded] = useState(false);

  const isAddRecordButtonVisible =
    props.tokenReturnDate === "0" &&
    isAddressEqual(props.tokenOwner, address || zeroAddress);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div className="w-full border rounded-lg">
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center p-4 hover:bg-secondary/50"
        onClick={handleToggle}>
        <div className="flex items-center gap-4">
          <Avatar className="size-10">
            <AvatarImage src="" alt="Icon" />
            <AvatarFallback className="text-base bg-transparent">
              ✍️
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-bold">Records</p>
        </div>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </Button>

      {isExpanded && (
        <div className="p-4 border-t">
          <EntityList
            entities={props.tokenMetadata.records || []}
            renderEntityCard={(record, index) => (
              <TokenCardRecord
                key={index}
                records={[record]}
                tokenMetadata={props.tokenMetadata}
                tokenInvestmentTokenSymbol={props.tokenInvestmentTokenSymbol}
              />
            )}
            noEntitiesText="No records 😐"
          />
          {isAddRecordButtonVisible && (
            <div className="mt-4">
              <TokenAddRecordDialog
                token={props.token}
                tokenMetadata={props.tokenMetadata}
                contracts={props.contracts}
                onAdd={() => props.onUpdate()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface Record {
  date: number;
  value: string;
}

interface TokenCardRecordProps {
  records: Record[];
  tokenMetadata?: FarmTokenMetadata;
  tokenInvestmentTokenSymbol?: string;
}

export function TokenCardRecord({ records }: TokenCardRecordProps) {
  const sortedRecords = [...records].sort((a, b) => b.date - a.date);

  return (
    <div className="space-y-4">
      {sortedRecords.map((record, index) => (
        <div key={index} className="border-l-2 border-primary pl-4 py-2">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">
              {new Date(record.date).toLocaleString()}
            </p>
            <p className="text-base">
              {record.value.startsWith("$")
                ? record.value
                : `${record.value} ETH`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}