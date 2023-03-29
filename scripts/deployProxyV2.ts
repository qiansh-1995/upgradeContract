import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
const proxyAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

async function main() {
    console.log(proxyAddress, " original proxy address")
    const OpenProxyV2 = await ethers.getContractFactory("OpenProxyV2")
    console.log("upgrade to OpenProxyV2...")
    const myOpenProxyV2 = await upgrades.upgradeProxy(proxyAddress, OpenProxyV2)
    console.log(myOpenProxyV2.address, " OpenProxyV2 address(should be the same)")

    console.log(await upgrades.erc1967.getImplementationAddress(myOpenProxyV2.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(myOpenProxyV2.address), " getAdminAddress")
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})