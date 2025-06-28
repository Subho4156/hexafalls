import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org", // ✅ Base Sepolia official RPC
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 84532,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};

export default config;