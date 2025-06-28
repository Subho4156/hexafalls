## Commands

- Install dependencies - `npm install`
- Clean project - `npx hardhat clean`
- Compile contracts and generate typechain types - `npx hardhat compile`
- Run tests - `npx hardhat test`
- Deploy contracts - `npx hardhat ignition deploy ignition/modules/Token.ts --network localhost`
- Run sandbox script - `npx hardhat run scripts/sandbox.ts --network localhost`
- Verify contract - `npx hardhat verify --network localhost 0x0000000000000000000000000000000000000000`
- Clean ignition deployment - `npx hardhat ignition wipe chain-11155111 TokenModule#Token`
- Generate a file with flatten constract code - `npx hardhat flatten contracts/Token.sol > contracts/Token_flat.sol`
- Run local node - `npx hardhat node`
