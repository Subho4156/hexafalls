import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("FarmToken", function () {
  async function initFixture() {
    // Get signers
    const [deployer, userOne, userTwo, userThree] = await ethers.getSigners();
    // Deploy contracts
    const usdTokenContractFactory = await ethers.getContractFactory("USDToken");
    const usdTokenContract = await usdTokenContractFactory.deploy();
    const farmTokenContractFactory = await ethers.getContractFactory(
      "FarmToken"
    );
    const farmTokenContract = await farmTokenContractFactory.deploy();
    // Send usd tokens to users
    await usdTokenContract
      .connect(deployer)
      .transfer(userOne, ethers.parseEther("1000"));
    await usdTokenContract
      .connect(deployer)
      .transfer(userTwo, ethers.parseEther("1000"));
    return {
      deployer,
      userOne,
      userTwo,
      userThree,
      usdTokenContract,
      farmTokenContract,
    };
  }

  it("Should support the main flow", async function () {
    const { userOne, userTwo, usdTokenContract, farmTokenContract } =
      await loadFixture(initFixture);
    // Create token
    await expect(
      farmTokenContract
        .connect(userOne)
        .create(
          ethers.parseEther("420"),
          usdTokenContract.getAddress(),
          "ipfs://"
        )
    ).to.be.not.reverted;
    const tokenId = (await farmTokenContract.getNextTokenId()) - 1n;
    // Make investment
    await expect(
      usdTokenContract
        .connect(userTwo)
        .approve(farmTokenContract.getAddress(), ethers.MaxUint256)
    ).to.be.not.reverted;
    await expect(
      farmTokenContract.connect(userTwo).makeInvestment(tokenId)
    ).to.changeTokenBalances(
      usdTokenContract,
      [userOne, userTwo],
      [ethers.parseEther("420"), ethers.parseEther("-420")]
    );
    // Return investment
    await expect(
      usdTokenContract
        .connect(userOne)
        .approve(farmTokenContract.getAddress(), ethers.MaxUint256)
    ).to.be.not.reverted;
    await expect(
      farmTokenContract
        .connect(userOne)
        .returnInvestment(tokenId, ethers.parseEther("690"))
    ).to.changeTokenBalances(
      usdTokenContract,
      [userOne, userTwo],
      [ethers.parseEther("-690"), ethers.parseEther("690")]
    );
  });
});
