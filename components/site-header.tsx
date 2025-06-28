"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useAccount, useConfig } from "wagmi";
import { SiteHeaderConnectButton } from "./site-header-connect-button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { address } = useAccount();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container h-16 mx-auto">
        <div className="flex h-full items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex-none">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block flex justify-center items-center font-bold ">
                <span className="text-2xl">{siteConfig.emoji}</span>

                <span className="hidden md:inline-block ml-2">
                  {siteConfig.name}
                </span>
              </span>
            </Link>
          </div>

          {/* Center Section - Navigation */}
          <div className="flex items-center justify-center space-x-6">
            <Link
              href="/explore"
              className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground">
              Explore
            </Link>
            {address && (
              <>
                <Link
                  href="/farm"
                  className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground">
                  My Farm
                </Link>
                <Link
                  href="/investments"
                  className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground">
                  My Investments
                </Link>
              </>
            )}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
          </div>

          {/* Right Section - Theme Toggle & Connect Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SiteHeaderConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
