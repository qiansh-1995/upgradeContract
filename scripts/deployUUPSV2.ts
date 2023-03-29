import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
const proxyAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'

async function main() {
    console.log(proxyAddress, " original proxy address")
    const LogicV2 = await ethers.getContractFactory("LogicV2")
    console.log("upgrade to LogicV2...")
    const myLogicV2 = await upgrades.upgradeProxy(proxyAddress, LogicV2)
    console.log(myLogicV2.address, " LogicV2 address")

    console.log(await upgrades.erc1967.getImplementationAddress(myLogicV2.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(myLogicV2.address), " getAdminAddress")
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})