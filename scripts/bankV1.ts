import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
async function main() {
    const OpenProxy = await ethers.getContractFactory('MyPiggyBank')
   
    // 部署合约, 并调用初始化方法
    const myOpenProxy = await upgrades.deployProxy(OpenProxy, {
        initializer: 'initialize',
        kind: 'uups' 
    })
    //console.log(`myOpenProxy ${JSON.stringify(myOpenProxy)}`)
    // 代理合约地址
    const proxyAddress = myOpenProxy.address
    console.log(`proxyAddress : ${proxyAddress}`)
    // 实现合约地址
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(myOpenProxy.address)
    // proxyAdmin 合约地址
    const adminAddress = await upgrades.erc1967.getAdminAddress(myOpenProxy.address)

    console.log(`proxyAddress: ${proxyAddress}`)
    console.log(`implementationAddress: ${implementationAddress}`)
    console.log(`adminAddress: ${adminAddress}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})