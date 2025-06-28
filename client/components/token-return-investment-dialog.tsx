"use client";

import { SiteConfigContracts } from "@/config/site";
import useError from "@/hooks/useError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { farmTokenAbi } from "@/contracts/abi/farmToken";

export function TokenReturnInvestmentDialog(props: {
  token: string;
  tokenInvestmentTokenSymbol: string;
  contracts: SiteConfigContracts;
  onReturn?: () => void;
}) {
  const { handleError } = useError();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address, chainId } = useAccount();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const formSchema = z.object({
    value: z.coerce.number().gt(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsFormSubmitting(true);

      if (!publicClient) {
        throw new Error("Public client is not ready");
      }
      if (!address || !walletClient) {
        throw new Error("Wallet is not connected");
      }
      if (chainId !== props.contracts.chain.id) {
        throw new Error(`You need to connect to ${props.contracts.chain.name}`);
      }

      if (props.contracts.accountAbstractionSuported) {
        // TODO: Implement
      } else {
        const { request: returnRequest } = await publicClient.simulateContract({
          address: props.contracts.farmToken,
          abi: farmTokenAbi,
          functionName: "returnInvestment",
          args: [BigInt(props.token)],
          chain: props.contracts.chain,
          account: address,
          value: parseEther(String(values.value)),
        });
        const returnTxHash = await walletClient.writeContract(returnRequest);
        await publicClient.waitForTransactionReceipt({
          hash: returnTxHash,
        });
      }

      toast({
        title: "Investment returned 👌",
      });
      props.onReturn?.();
      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsFormSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Return Investment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Return investment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Amount of ETH you want to return to the investor
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.1"
                      type="number"
                      step="0.000000000000000001"
                      disabled={isFormSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isFormSubmitting}>
                {isFormSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
