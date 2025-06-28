import { useEffect, useState, useMemo } from "react";
import { isAddressEqual, zeroAddress } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import EntityList from "./entity-list";
import { TokenCard } from "./token-card";
import { farmTokenAbi } from "@/contracts/abi/farmToken";
import { SiteConfigContracts } from "@/config/site";

const LIMIT = 42;

export function TokenFarmList({
  contracts,
}: {
  contracts: SiteConfigContracts;
}) {
  const { address } = useAccount();
  const [smartAccountAddress, setSmartAccountAddress] = useState<
    `0x${string}` | undefined
  >();

  useEffect(() => {
    if (address) {
      setSmartAccountAddress(
        contracts.accountAbstractionSuported ? undefined : address
      );
      // TODO: Implement account abstraction support if needed
    } else {
      setSmartAccountAddress(undefined);
    }
  }, [address, contracts.accountAbstractionSuported]);

  const contractCalls = useMemo(
    () =>
      [...Array(LIMIT)].map((_, i) => ({
        address: contracts.farmToken,
        abi: farmTokenAbi,
        functionName: "ownerOf",
        args: [BigInt(i)],
      })),
    [contracts.farmToken]
  );

  const { data: ownershipData } = useReadContracts({
    contracts: contractCalls,
  });

  const tokens = useMemo(() => {
    if (!smartAccountAddress || !ownershipData) return [];

    return ownershipData
      .map((data, index) => ({ index, owner: data.result }))
      .filter(
        ({ owner }) =>
          owner && isAddressEqual(owner as `0x${string}`, smartAccountAddress)
      )
      .map(({ index }) => String(index));
  }, [ownershipData, smartAccountAddress]);

  return (
    <EntityList
      entities={tokens?.toReversed()}
      renderEntityCard={(token, index) => (
        <TokenCard key={index} token={token} contracts={contracts} />
      )}
      noEntitiesText={`No tokens on ${contracts.chain.name} 😐`}
      className="gap-6"
    />
  );
}
