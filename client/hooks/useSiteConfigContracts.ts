import {
  DEFAULT_SITE_CONFIG_CONTRACTS,
  chainToSiteConfigContracts,
} from "@/lib/siteConfig";
import { useEffect, useState } from "react";
import { Chain } from "viem";

export default function useSiteConfigContracts(
  chain: Chain | number | undefined
) {
  const [contracts, setContracts] = useState(DEFAULT_SITE_CONFIG_CONTRACTS);

  useEffect(() => {
    setContracts(chainToSiteConfigContracts(chain));
  }, [chain]);

  return { contracts };
}
