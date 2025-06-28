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
  description:
    "A platform for tokenization of crops and livestock to attract investments",
  links: {
    github: "https://github.com/nwakaku/AgroBased",
  },
  contracts: {
    baseTestnet: {
      chain: baseSepolia,
      farmToken: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      usdToken: "0x02008a8DBc938bd7930bf370617065B6B0c1221a" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,

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
      farmToken: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as `0x${string}`,
      usdToken: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
  },
};
