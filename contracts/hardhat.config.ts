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
    // 🔁 Localhost (Hardhat Node)
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },

    // 🌍 Ethereum Mainnet
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts: [process.env.PRIVATE_KEY as string],
    //   chainId: 1,
    // },
  },
};

export default config;
