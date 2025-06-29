// TokenCard.tsx
"use client";

import { useMemo } from "react";
import type { Address } from "viem";
import type { ReadContractsConfig  } from "wagmi";
import { useReadContract, useReadContracts } from "wagmi";
import { farmTokenAbi } from "@/contracts/abi/farmToken";
import { TokenCardHeader } from "./token-card-header";
import { TokenCardRecords } from "./token-card-records";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import useMetadataLoader from "@/hooks/useMetadataLoader";
import type { SiteConfigContracts } from "@/config/site";
import type { FarmTokenMetadata } from "@/types/farm-token-metadata";
import type { JSX } from "react";


const NATIVE_TOKEN_SYMBOL = "ETH";
const DEFAULT_REPUTATION_SCORE = 50;

interface TokenCardProps {
  token: string;
  contracts: SiteConfigContracts;
}

export function TokenCard({ token, contracts }: TokenCardProps): JSX.Element {
  const contractCalls: readContract[] = useMemo(() => [
    {
      address: contracts.farmToken as Address,
      abi: farmTokenAbi,
      functionName: "ownerOf",
      args: [BigInt(token)],
    },
    {
      address: contracts.farmToken as Address,
      abi: farmTokenAbi,
      functionName: "getParams",
      args: [BigInt(token)],
    },
    {
      address: contracts.farmToken as Address,
      abi: farmTokenAbi,
      functionName: "tokenURI",
      args: [BigInt(token)],
    },
  ], [token, contracts.farmToken]);

  const {
    data: readData,
    isLoading,
    isError,
    refetch,
  } = useReadContracts({
    contracts: contractCalls,
  });

  const [tokenOwner, tokenParams, tokenMetadataUri] = readData || [];

  const reputationScoreQuery = useReadContract({
    address: contracts.farmToken as Address,
    abi: farmTokenAbi,
    functionName: "calculateReputationScore",
    args: tokenOwner?.result ? [tokenOwner.result as Address] : undefined,
  });

  const { data: reputationScore } = reputationScoreQuery;

  const metadataResult = useMetadataLoader<FarmTokenMetadata>(
    tokenMetadataUri?.result ?? ""
  );

  const tokenMetadata = metadataResult.data;
  const isTokenMetadataLoading = !metadataResult.isLoaded;

  if (isLoading || isTokenMetadataLoading) {
    return <Skeleton className="w-full h-8" />;
  }

  if (
    isError ||
    !tokenOwner?.result ||
    !tokenParams?.result ||
    !tokenMetadata
  ) {
    return <div>Error loading token data</div>;
  }

  const { investmentAmount, investor, returnAmount, returnDate } =
    tokenParams.result;

  const finalReputationScore = Number(
    reputationScore ?? DEFAULT_REPUTATION_SCORE
  );

  return (
    <div className="w-full flex flex-col items-center px-6 py-8">
      <TokenCardHeader
        token={token}
        tokenMetadata={tokenMetadata}
        tokenOwner={tokenOwner.result}
        tokenInvestmentAmount={investmentAmount.toString()}
        tokenInvestmentTokenSymbol={NATIVE_TOKEN_SYMBOL}
        tokenInvestor={investor}
        tokenReturnAmount={returnAmount.toString()}
        tokenReturnDate={returnDate.toString()}
        reputationScore={finalReputationScore}
        contracts={contracts}
        onUpdate={refetch}
      />
      <Separator className="my-6" />
      <TokenCardRecords
        token={token}
        tokenMetadata={tokenMetadata}
        tokenOwner={tokenOwner.result}
        tokenInvestmentTokenSymbol={NATIVE_TOKEN_SYMBOL}
        tokenReturnDate={returnDate.toString()}
        contracts={contracts}
        onUpdate={refetch}
      />
    </div>
  );
}
