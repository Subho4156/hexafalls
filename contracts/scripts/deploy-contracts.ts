import hre, { ethers } from "hardhat";
import { CONTRACTS } from "./data/deployed-contracts";

async function main() {
  console.log("👟 Start script 'deploy-contracts'");

  const network = hre.network.name;

  // ✅ Prevent crashing when CONTRACTS[network] is undefined
  const deployed = CONTRACTS[network] || {};

  // ✅ Only deploy FarmToken
  if (!deployed.farmToken) {
    const contractFactory = await ethers.getContractFactory("FarmToken");
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();
    console.log(
      `✅ Contract 'FarmToken' deployed to: ${await contract.getAddress()}`
    );
  } else {
    console.log("⚠️  FarmToken already deployed in CONTRACTS config.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
