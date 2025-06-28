import { SiteConfigContracts } from "@/config/site";

/**
 * Convert error object to pretty object with error message and severity.
 */
export function errorToPrettyError(
  error: any,
  contracts: SiteConfigContracts
): {
  message: string;
  severity: "info" | "error" | undefined;
} {
  let message = JSON.stringify(error, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
  let severity: "info" | "error" | undefined = undefined;
  if (error?.message) {
    message = error.message;
  }
  if (error?.cause?.shortMessage) {
    message = error.cause.shortMessage;
  }
  return {
    message: message,
    severity: severity,
  };
}
