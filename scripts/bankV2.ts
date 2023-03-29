import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
const proxyAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'

async function main() {
    console.log(proxyAddress, " original proxy address")
    const MyPiggyBankAdminOnly = await ethers.getContractFactory("MyPiggyBankAdminOnly")
    console.log("upgrade to MyPiggyBankAdminOnly...")
    const myMyPiggyBankAdminOnly = await upgrades.upgradeProxy(proxyAddress, MyPiggyBankAdminOnly)
    console.log(myMyPiggyBankAdminOnly.address, " MyPiggyBankAdminOnly address")

    console.log(await upgrades.erc1967.getImplementationAddress(myMyPiggyBankAdminOnly.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(myMyPiggyBankAdminOnly.address), " getAdminAddress")
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})