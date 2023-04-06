import { ethers } from "hardhat";

async function main() {

  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy("MRK", "BBB");

  await token.deployed();

  console.log(
    `Deployed at ${token.address}\n`
    +
    `Use "npx hardhat verify  <XXX> --network bscTestnet  --contract "contracts/MyToken.sol:MyToken" "MRK", "BBB" " to verify`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
