"use client";

import { SiteConfigContracts } from "@/config/site";
import EntityList from "./entity-list";
import { TokenCard } from "./token-card";
import { useEffect, useState } from "react";
import { useAccount, useInfiniteReadContracts } from "wagmi";
import { isAddressEqual, zeroAddress } from "viem";
import { farmTokenAbi } from "@/contracts/abi/farmToken";

const LIMIT = 42;

export function TokenInvestmentsList(props: {
  contracts: SiteConfigContracts;
}) {
  const { address } = useAccount();
  const [smartAccountAddress, setSmartAccountAddress] = useState<
    `0x${string}` | undefined
  >();
  const [tokens, setTokens] = useState<string[] | undefined>();

  const { data } = useInfiniteReadContracts<readonly [
    {
      address: `0x${string}`;
      abi: typeof farmTokenAbi;
      functionName: "getParams";
      args: [bigint];
      chainId: number;
    }
  ]>({
    cacheKey: `token_investments_list_${props.contracts.chain.id.toString()}`,

    contracts: (pageParam: number) => {
      return [...new Array(LIMIT)].map(
        (_, i) =>
        ({
          address: props.contracts.farmToken,
          abi: farmTokenAbi,
          functionName: "getParams",
          args: [BigInt(pageParam + i)],
          chainId: props.contracts.chain.id,
        } as const)
      );
    },

    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage: unknown, _allPages: unknown[], lastPageParam: number) => {
        return lastPageParam + 1;
      },
    },
  });



  useEffect(() => {
    setSmartAccountAddress(undefined);
    if (address) {
      if (props.contracts.accountAbstractionSuported) {
        // TODO: Implement
      } else {
        setSmartAccountAddress(address);
      }
    }
  }, [address, props.contracts]);

  useEffect(() => {
    setTokens(undefined);
    if (address && data && smartAccountAddress) {
      const tokens: string[] = [];
      const dataFirstPage = (data as any).pages[0];
      for (let i = 0; i < dataFirstPage.length; i++) {
        const dataPageElement = dataFirstPage[i];
        const investor = dataPageElement?.result?.investor;

        if (
          investor &&
          isAddressEqual(investor, smartAccountAddress)
        ) {
          tokens.push(String(i));
        }
      }

      setTokens(tokens);
    }
  }, [address, data, smartAccountAddress]);

  return (
    <EntityList
      entities={tokens?.toReversed()}
      renderEntityCard={(token, index) => (
        <TokenCard key={index} token={token} contracts={props.contracts} />
      )}
      noEntitiesText={`No tokens on ${props.contracts.chain.name} 😐`}
      className="gap-6"
    />
  );
}