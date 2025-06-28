import { useEffect, useMemo, useState } from "react";
import { isAddressEqual, type Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import EntityList from "./entity-list";
import { TokenCard } from "./token-card";
import { farmTokenAbi } from "@/contracts/abi/farmToken";
import type { SiteConfigContracts } from "@/config/site";

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
          args: [BigInt(i)] as const,
        }));

        // Replacing multicall with Promise.all using readContract
        const result = await Promise.all(
          calls.map((call) =>
            publicClient.readContract(call).catch(() => null)
          )
        );

        const owned = result
          .map((owner, i) =>
            owner && isAddressEqual(owner as Address, smartAccountAddress)
              ? String(i)
              : null
          )
          .filter((id): id is string => id !== null);

        setOwnedTokenIds(owned.reverse());
      } catch (err) {
        console.error("Read contract failed:", err);
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
        <div className="text-center text-muted-foreground py-4">
          Loading tokens...
        </div>
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
