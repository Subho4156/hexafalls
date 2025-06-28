"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { SiteHeaderConnectButton } from "./site-header-connect-button";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

export function SiteHeader() {
  const { authenticated } = usePrivy();
  return (
    <header className="top-0 z-50 px-4 py-2">
      <div className="container h-16 mx-auto">
        <div className="flex h-full items-center justify-between">
          <div className="flex-none">
            <Link href="/" className="flex items-center space-x-2">
              <span className="flex justify-center items-center font-bold ">
                <Image
                  src={siteConfig.logo}
                  alt="logo"
                  width={32}
                  height={32}
                />
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-6 ml-32">
            <Link
              href="/explore"
              className="hidden md:block text-sm font-medium hover:text-muted-foreground"
            >
              Explore
            </Link>
            {authenticated && (
              <>
                <Link
                  href="/farm"
                  className="hidden md:block text-sm font-medium hover:text-muted-foreground"
                >
                  My Farm
                </Link>
                <Link
                  href="/investments"
                  className="hidden md:block text-sm font-medium hover:text-muted-foreground"
                >
                  My Investments
                </Link>
              </>
            )}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="hidden md:block text-sm font-medium hover:text-muted-foreground"
            >
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
