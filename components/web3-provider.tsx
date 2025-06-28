"use client";

import { siteConfig } from "@/config/site";
import { PrivyProvider, type PrivyClientConfig } from "@privy-io/react-auth";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";

const supportedChains = Object.values(siteConfig.contracts).map(
  (contracts) => contracts.chain
);

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets"
  },
  loginMethods: ["wallet", "google", "email"],
  appearance: {
    showWalletLoginFirst: true,
  },
  supportedChains: supportedChains,
  defaultChain: supportedChains[0],
};

const wagmiTransports = supportedChains.reduce(
  (prevoiusValue, chain) =>
    Object.assign(prevoiusValue, { [chain.id]: http() }),
  {}
);

const wagmiConfig = createConfig({
  chains: [supportedChains[0], ...supportedChains.slice(1)],
  transports: wagmiTransports,
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
