import { useToast } from "@/components/ui/use-toast";
import { errorToPrettyError } from "@/lib/errors";
import { useAccount } from "wagmi";
import useSiteConfigContracts from "./useSiteConfigContracts";

/**
 * Hook to handle errors.
 */
export default function useError() {
  const { toast } = useToast();
  const { chain } = useAccount();
  const { contracts } = useSiteConfigContracts(chain);

  let handleError = function (error: Error, isErrorToastRequired: boolean) {
    console.error(error);
    if (isErrorToastRequired) {
      const prettyError = errorToPrettyError(error, contracts);
      toast({
        variant: "destructive",
        title: "Something went wrong :(",
        description: prettyError.message,
      });
    }
  };

  return {
    handleError,
  };
}
