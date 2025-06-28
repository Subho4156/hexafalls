"use client";

import { useMemo } from "react";
import { isAddressEqual, zeroAddress, type Address } from "viem";
import {
  useReadContracts,
  type ReadContractConfig,
} from "wagmi"; // ✅ correct import

import type { SiteConfigContracts } from "@/config/site";
import { farmTokenAbi } from "@/contracts/abi/farmToken";
import EntityList from "./entity-list";
import { TokenCard } from "./token-card";

const LIMIT = 42;

// ✅ Type for smart contract result
type TokenParams = {
  investmentAmount: bigint;
  investor: `0x${string}`;
};

export function TokenExploreList({
  contracts,
}: {
  contracts: SiteConfigContracts;
}) {
  const contractCalls: ReadContractConfig[] = useMemo(
    () =>
      [...Array(LIMIT)].map((_, i) => ({
        address: contracts.farmToken as Address,
        abi: farmTokenAbi,
        functionName: "getParams",
        args: [BigInt(i)],
      })),
    [contracts.farmToken]
  );

  const { data: tokenParamsData } = useReadContracts({
    contracts: contractCalls,
  });

  const tokens = useMemo(() => {
    if (!tokenParamsData) return [];

    return tokenParamsData
      .map((d: { result: unknown }, index: number) => {
        const result = d.result as TokenParams;
        return { index, params: result };
      })
      .filter(
        ({ params }: { params: TokenParams }) =>
          params &&
          params.investmentAmount.toString() !== "0" &&
          isAddressEqual(params.investor || zeroAddress, zeroAddress)
      )
      .map(({ index }: { index: number }) => String(index))
      .reverse();
  }, [tokenParamsData]);

  return (
    <EntityList
      entities={tokens}
      renderEntityCard={(token, index) => (
        <TokenCard key={index} token={token} contracts={contracts} />
      )}
      noEntitiesText={`No tokens on ${contracts.chain.name} 😐`} // ✅ FIXED
      className="gap-6"
    />
  );
}
