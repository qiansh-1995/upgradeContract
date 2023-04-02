import { ethers } from "hardhat";

async function main() {
  const mytokenAddress="0xae708e26b4529C7c811fb22D6aCf03da8d868B73";
  const Token = await ethers.getContractFactory("TransTest");
  const token = await Token.deploy(mytokenAddress);

  await token.deployed();

  console.log(
    `Deployed at ${token.address}\n`
    +
    `Use "npx hardhat verify  <XXX> --network bscTestnet  --contract "contracts/TransTest.sol:TransTest" " to verify`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
