import { useToast } from "@/components/ui/use-toast";
<<<<<<< HEAD
=======

>>>>>>> 966839881f0571ee3d5d52d4e7384c8a60b1523c
import { useAccount } from "wagmi";
import useSiteConfigContracts from "./useSiteConfigContracts";
import { errorToPrettyError } from "@/lib/error";

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
