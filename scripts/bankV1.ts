import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
async function main() {
    const OpenProxy = await ethers.getContractFactory('MyPiggyBank')
 //  const mytokenAddress="0xae708e26b4529C7c811fb22D6aCf03da8d868B73";
    // 部署合约, 并调用初始化方法
    const myOpenProxy = await upgrades.deployProxy(OpenProxy, {
        initializer: "initialize",
        kind: 'uups' 
    })
   // await myOpenProxy.deployed();
    //console.log(`myOpenProxy ${JSON.stringify(myOpenProxy)}`)
    // 代理合约地址
    const proxyAddress = myOpenProxy.address
    console.log(`proxyAddress : ${proxyAddress}`)

    // 实现合约地址
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(myOpenProxy.address)
    // proxyAdmin 合约地址
    const adminAddress = await upgrades.erc1967.getAdminAddress(myOpenProxy.address)

   // console.log(`proxyAddress: ${proxyAddress}`)
    console.log(`implementationAddress: ${implementationAddress}`)
    console.log(`adminAddress: ${adminAddress}`)
    console.log(
        `Use "npx hardhat verify  0x99fB4648B14259a3b5643f87Af7A2727b95B1EF6 --network bscTestnet  --contract "contracts/MyPiggyBank.sol:MyPiggyBank" "0xae708e26b4529C7c811fb22D6aCf03da8d868B73" to verify`
      );
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})