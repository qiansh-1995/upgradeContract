import { ethers } from "hardhat";

async function main() {
  const mytokenAddress= "0xae708e26b4529C7c811fb22D6aCf03da8d868B73";//"0xFecd65465747202a04ba3D95982a1e3C9985E5a7"//
  const Token = await ethers.getContractFactory("TransTest");
  const token = await Token.deploy(mytokenAddress);

  await token.deployed();

  console.log(
    `Deployed at ${token.address}\n`
    +
    `Use "npx hardhat verify  <XXX> --network bscTestnet  --contract "contracts/TransTest.sol:TransTest" "0xae708e26b4529C7c811fb22D6aCf03da8d868B73" " to verify`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
