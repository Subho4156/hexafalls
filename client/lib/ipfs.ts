import { siteConfig } from "@/config/site";
import axios from "axios";

export async function uploadJsonToIpfs(json: any): Promise<string> {
  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    json,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        "Content-Type": "application/json",
      },
      params: {
        pinataMetadata: JSON.stringify({
          name: `${siteConfig.name} - JSON`,
        }),
      },
    }
  );

  return ipfsHashToIpfsUri(response.data.IpfsHash);
}

export async function uploadFileToIpfs(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    }
  );

  return ipfsHashToIpfsUri(response.data.IpfsHash);
}

export async function loadJsonFromIpfs(uri: string): Promise<any> {
  const response = await axios.get(ipfsUriToHttpUri(uri));

  if (response.data.errors) {
    throw new Error(`Fail to load JSON from IPFS: ${response.data.errors}`);
  }

  return response.data;
}

export function ipfsHashToIpfsUri(ipfsHash: string): string {
  return `ipfs://${ipfsHash}`;
}

export function ipfsUriToHttpUri(ipfsUri?: string): string {
  if (!ipfsUri) {
    throw new Error(`Invalid IPFS URI: ${ipfsUri}`);
  }

  return ipfsUri.replace(
    "ipfs://",
    `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/`
  );
}
