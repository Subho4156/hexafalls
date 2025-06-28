"use client";

import { addressToShortAddress } from "@/lib/converters";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";

export function SiteHeaderConnectButton() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { address } = useAccount();

  if (ready && !authenticated) {
    return <Button onClick={login}>Login</Button>;
  }

  if (ready && authenticated) {
    return (
      <Button variant="outline" onClick={logout}>
        Logout{" "}
        {address && (
          <span className="text-xs text-muted-foreground pl-1">
            ({addressToShortAddress(address)})
          </span>
        )}
      </Button>
    );
  }

  return <></>;
}
