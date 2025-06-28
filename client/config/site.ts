import { Chain, liskSepolia, baseSepolia } from "viem/chains";

export type SiteConfig = typeof siteConfig;

export type SiteConfigContracts = {
  chain: Chain;
  farmToken: `0x${string}`;
  usdToken: `0x${string}`;
  entryPoint: `0x${string}`;
  paymaster: `0x${string}`;
  accountFactory: `0x${string}`;
  accountAbstractionSuported: boolean;
};

export const siteConfig = {
  logo: "/logo.png",
  name: "Krishak Biniyog",
  description:
    "A platform for tokenization of crops and livestock to attract investments",
  contracts: {
    

    localhost: {
      chain: {
        id: 31337,
        name: "Hardhat",
        network: "localhost",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ["http://127.0.0.1:8545"],
          },
        },
      },
      farmToken: "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`,
      usdToken: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
  },
};
