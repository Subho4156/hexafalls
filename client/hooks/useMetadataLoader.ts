import { loadJsonFromIpfs } from "@/lib/ipfs";
import { useEffect, useState } from "react";
import useError from "./useError";

/**
 * Load metadata from specified uri.
 */
export default function useMetadataLoader<T>(uri?: string): {
  data: T | undefined;
  isLoaded: boolean;
} {
  const { handleError } = useError();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<T | undefined>();

  useEffect(() => {
    setIsLoaded(false);
    setData(undefined);
    if (uri) {
      loadJsonFromIpfs(uri)
        .then((data) => {
          setData(data);
          setIsLoaded(true);
        })
        .catch((error) => handleError(error, true));
    } else {
      setIsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return { data, isLoaded: isLoaded };
}
