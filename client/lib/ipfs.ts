import { siteConfig } from "@/config/site";
import pinataSDK from "@pinata/sdk";
import axios from "axios";

const pinata = new pinataSDK({
  pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT,
});

export async function uploadJsonToIpfs(json: any): Promise<string> {
  const { IpfsHash } = await pinata.pinJSONToIPFS(json, {
    pinataMetadata: {
      name: `${siteConfig.name} - JSON`,
    },
  });
  return ipfsHashToIpfsUri(IpfsHash);
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
  console.log('singing', uri);
  const response = await axios.get(ipfsUriToHttpUri(uri));
  console.log('sing',response);
  if (response.data.errors) {
    throw new Error(`Fail to loading json from IPFS: ${response.data.errors}`);
  }
  return response.data;
}

export function ipfsHashToIpfsUri(ipfsHash: string): string {
  return `ipfs://${ipfsHash}`;
}

export function ipfsUriToHttpUri(ipfsUri?: string): string {
  if (!ipfsUri) {
    throw new Error(`Fail to converting IPFS URI to HTTP URI: ${ipfsUri}`);
  }
  // Add https:// protocol to the gateway URL
  return ipfsUri.replace(
    "ipfs://",
    `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/`
  );
}
