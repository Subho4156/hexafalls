"use client";

import { addressToShortAddress } from "@/lib/converters";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

export function SiteHeaderConnectButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { address } = useAccount();

  if (ready && !authenticated) {
    return (
      <InteractiveHoverButton onClick={login}>
        Get Started
      </InteractiveHoverButton>
    );
  }
  if (ready && authenticated) {
    return (
      <Button variant="outline" onClick={logout}>
        Logout{" "}
        {address && (
          <span className="text-xs pl-1 cursor-pointer">
            ({addressToShortAddress(address)})
          </span>
        )}
      </Button>
    );
  }

  return;
}
