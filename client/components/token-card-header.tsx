"use client";

import { SiteConfigContracts } from "@/config/site";
import { addressToShortAddress } from "@/lib/converters";
import { formatEther, isAddressEqual, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "@/components/ui/progress";
import { FarmTokenMetadata } from "@/types/farm-token-metadata";
import { Button } from "./ui/button";
import { JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { ipfsUriToHttpUri, loadJsonFromIpfs } from "@/lib/ipfs";
import { Loader2 } from "lucide-react";
import { TokenSellDialog } from "./token-sell-dialog";
import { TokenInvestDialog } from "./token-invest-dialog";
import { TokenReturnInvestmentDialog } from "./token-return-investment-dialog";

interface TokenCardHeaderProps {
  token: string;
  tokenMetadata: FarmTokenMetadata;
  tokenOwner: `0x${string}`;
  tokenInvestmentAmount: string;
  tokenInvestmentTokenSymbol: string;
  tokenInvestor: `0x${string}`;
  tokenReturnAmount: string;
  tokenReturnDate: string;
  reputationScore: number;
  contracts: SiteConfigContracts;
  onUpdate: () => void;
}

interface PassportData {
  image: string;
  name: string;
  description: string;
}

export function TokenCardHeader(props: TokenCardHeaderProps): JSX.Element {
  const { address } = useAccount();
  const [passportData, setPassportData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const loadPassportData = async () => {
    if (!props.tokenMetadata.passportUri) return;

    setIsLoading(true);
    try {
      const data = await ipfsUriToHttpUri(props.tokenMetadata.passportUri);
      console.log(data);
      setPassportData(data);
    } catch (error) {
      console.error("Failed to load passport:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isReturnButtonVisible =
    props.tokenReturnDate === "0" &&
    isAddressEqual(props.tokenOwner, address || zeroAddress);
  const isInvestButtonVisible =
    isAddressEqual(props?.tokenInvestor, zeroAddress) &&
    !isAddressEqual(props.tokenOwner, address || zeroAddress);
  const isSellButtonVisible =
    props.tokenReturnDate === "0" &&
    isAddressEqual(props.tokenInvestor, address || zeroAddress);

  console.log(props.reputationScore);

  return (
    <div className="w-full flex flex-row gap-4">
      <Avatar className="size-14">
        <AvatarImage src="" alt="Icon" />
        <AvatarFallback className="text-2xl bg-primary">
          {props.tokenMetadata.category === "Grains"
            ? "🌾"
            : props.tokenMetadata.category === "Coffee"
              ? "☕"
              : props.tokenMetadata.category === "Fruits"
                ? "🍎"
                : props.tokenMetadata.category === "Vegetables"
                  ? "🥦"
                  : props.tokenMetadata.category === "Spices"
                    ? "🌶️"
                    : props.tokenMetadata.category === "Tea"
                      ? "🍵"
                      : props.tokenMetadata.category === "Oilseeds"
                        ? "🌻"
                        : "⭐"}
        </AvatarFallback>

      </Avatar>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">
            {props.tokenMetadata.category}
            {isAddressEqual(props.tokenInvestor, zeroAddress) && (
              <span className="font-normal text-primary"> — Available</span>
            )}
            {!isAddressEqual(props.tokenInvestor, zeroAddress) &&
              props.tokenReturnDate === "0" && (
                <span className="font-normal text-destructive">
                  {" "}
                  — Invested
                </span>
              )}
            {!isAddressEqual(props.tokenInvestor, zeroAddress) &&
              props.tokenReturnDate !== "0" && (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  — Closed
                </span>
              )}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Reputation:</span>
            <Progress
              value={props.reputationScore}
              className={`w-32 h-2 ${props.reputationScore >= 70
                ? "bg-green-200 [&>div]:bg-green-500"
                : props.reputationScore >= 50
                  ? "bg-yellow-200 [&>div]:bg-yellow-500"
                  : "bg-red-200 [&>div]:bg-red-500"
                }`}
            />
            <span
              className={`text-sm font-medium ${props.reputationScore >= 70
                ? "text-green-500"
                : props.reputationScore >= 50
                  ? "text-yellow-500"
                  : "text-red-500"
                }`}
            >
              {props.reputationScore}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Description:</p>
            <p className="text-sm">{props.tokenMetadata.description}</p>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Identifier:</p>
            <p className="text-sm break-all">
              {props.tokenMetadata.identifier}
            </p>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Created:</p>
            <p className="text-sm break-all">
              {new Date(props.tokenMetadata.created || 0).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col gap-1 items-center md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Farmer:</p>
            <div className="flex justify-center items-center gap-2">
              <a
                href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.tokenOwner}`}
                target="_blank"
                className="text-sm break-all underline underline-offset-4"
              >
                {addressToShortAddress(props.tokenOwner)}
              </a>
              {props.tokenMetadata.passportUri && (
                <Dialog onOpenChange={(open) => open && loadPassportData()}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View ID Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Farmer ID Card</DialogTitle>
                    </DialogHeader>
                    {isLoading ? (
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : passportData ? (
                      <div className="space-y-4">
                        <img
                          src={passportData}
                          alt="Farmer ID"
                          className="w-full rounded-lg"
                        />
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        Failed to load ID card
                      </p>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Rest of the existing fields... */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Chain:</p>
            <p className="text-sm break-all">{props.contracts.chain.name}</p>
          </div>

          {/* Investment details... */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">
              Required investment:
            </p>
            <p className="text-sm break-all">
              {formatEther(BigInt(props.tokenInvestmentAmount || 0))}{" "}
              {props.tokenInvestmentTokenSymbol}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Expected return:</p>
            <p className="text-sm break-all">
              {formatEther(
                BigInt(props.tokenMetadata.expectedReturnAmount || 0)
              )}{" "}
              {props.tokenInvestmentTokenSymbol}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">
              Expected return period:
            </p>
            <p className="text-sm break-all">
              {props.tokenMetadata.expectedReturnPeriod === "1m" && "1 month"}
              {props.tokenMetadata.expectedReturnPeriod === "3m" && "3 months"}
              {props.tokenMetadata.expectedReturnPeriod === "6m" && "4 months"}
              {props.tokenMetadata.expectedReturnPeriod === "1y" && "1 year"}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Investor:</p>
            <p className="text-sm break-all">
              {isAddressEqual(props.tokenInvestor, zeroAddress) ? (
                "None"
              ) : (
                <a
                  href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.tokenInvestor}`}
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  {addressToShortAddress(props.tokenInvestor)}
                </a>
              )}
            </p>
          </div>
          {props.tokenReturnAmount !== "0" && (
            <div className="flex flex-col md:flex-row md:gap-3">
              <p className="text-sm text-muted-foreground">Return:</p>
              <p className="text-sm break-all">
                {formatEther(BigInt(props.tokenReturnAmount || "0"))}{" "}
                {props.tokenInvestmentTokenSymbol}
              </p>
            </div>
          )}
          {props.tokenReturnDate !== "0" && (
            <div className="flex flex-col md:flex-row md:gap-3">
              <p className="text-sm text-muted-foreground">Return date:</p>
              <p className="text-sm break-all">
                {new Date(
                  Number(props.tokenReturnDate) * 1000 || 0
                ).toLocaleString()}
              </p>
            </div>
          )}

          {isReturnButtonVisible && (
            <TokenReturnInvestmentDialog
              token={props.token}
              tokenInvestmentTokenSymbol={props.tokenInvestmentTokenSymbol}
              contracts={props.contracts}
              onReturn={() => props.onUpdate()}
            />
          )}
          {isInvestButtonVisible && (
            <TokenInvestDialog
              token={props.token}
              tokenInvestmentAmount={props.tokenInvestmentAmount}
              tokenInvestmentTokenSymbol={props.tokenInvestmentTokenSymbol}
              contracts={props.contracts}
              onInvest={() => props.onUpdate()}
            />
          )}
          {isSellButtonVisible && <TokenSellDialog />}
        </div>
      </div>
    </div>
  );
}
