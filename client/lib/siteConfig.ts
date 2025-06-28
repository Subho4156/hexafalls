import { SiteConfigContracts, siteConfig } from "@/config/site";
import { Chain } from "viem";

export const DEFAULT_SITE_CONFIG_CONTRACTS = Object.values(
  siteConfig.contracts
)[0];

export function chainToSiteConfigContracts(
  chain: Chain | string | number | undefined
): SiteConfigContracts {
  let contracts;
  if (typeof chain === "string") {
    contracts = Object.values(siteConfig.contracts).find(
      (element) => String(element.chain.id) === chain
    );
  }
  if (typeof chain === "number") {
    contracts = Object.values(siteConfig.contracts).find(
      (element) => element.chain.id === chain
    );
  }
  if (typeof chain === "object") {
    contracts = Object.values(siteConfig.contracts).find(
      (element) => element.chain.id === chain.id
    );
  }
  return contracts || DEFAULT_SITE_CONFIG_CONTRACTS;
}
