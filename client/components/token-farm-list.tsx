import { useEffect, useMemo, useState } from "react";
import { isAddressEqual } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import EntityList from "./entity-list";
import { TokenCard } from "./token-card";
import { farmTokenAbi } from "@/contracts/abi/farmToken";
import type { SiteConfigContracts } from "@/config/site";
import type { Address } from "viem";

const LIMIT = 42;

export function TokenFarmList({ contracts }: { contracts: SiteConfigContracts }) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [ownedTokenIds, setOwnedTokenIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Determine smart account address
  const smartAccountAddress = useMemo(() => {
    return contracts.accountAbstractionSuported ? undefined : address;
  }, [address, contracts.accountAbstractionSuported]);

  useEffect(() => {
    const fetchOwnership = async () => {
      if (!publicClient || !contracts.farmToken || !smartAccountAddress) return;

      setLoading(true);
      try {
        const calls = [...Array(LIMIT)].map((_, i) => ({
          address: contracts.farmToken as Address,
          abi: farmTokenAbi,
          functionName: "ownerOf" as const,
          args: [BigInt(i)]  as const,
        }));

       const result = await publicClient.multicall({
          contracts: calls,
        });

        const owned = result
          .map((res, i) =>
            res.status === "success" &&
            isAddressEqual(res.result as Address, smartAccountAddress)
              ? String(i)
              : null
          )
          .filter((id): id is string => id !== null);

        setOwnedTokenIds(owned.reverse());
      } catch (err) {
        console.error("Multicall failed:", err);
        setOwnedTokenIds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnership();
  }, [publicClient, contracts.farmToken, smartAccountAddress]);

  return (
    <div>
      {loading ? (
        <div className="text-center text-muted-foreground py-4">Loading tokens...</div>
      ) : (
        <EntityList
          entities={ownedTokenIds}
          renderEntityCard={(token, index) => (
            <TokenCard key={index} token={token} contracts={contracts} />
          )}
          noEntitiesText={`No tokens on ${contracts.chain.name}`}
          className="gap-6"
        />
      )}
    </div>
  );
}
