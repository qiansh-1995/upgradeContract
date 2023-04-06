import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
const proxyAddress = '0x808211d38B378EB02105bF0b7c9cf043b4241b7A'

async function main() {
    console.log(proxyAddress, " original proxy address")
    const MyPiggyBankAdminOnly = await ethers.getContractFactory("MyPiggyBankAdminOnly")
    console.log("upgrade to MyPiggyBankAdminOnly...")
    const myMyPiggyBankAdminOnly = await upgrades.upgradeProxy(proxyAddress, MyPiggyBankAdminOnly)
    await myMyPiggyBankAdminOnly.deployed();
    console.log(myMyPiggyBankAdminOnly.address, " MyPiggyBankAdminOnly address")

    console.log(await upgrades.erc1967.getImplementationAddress(myMyPiggyBankAdminOnly.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(myMyPiggyBankAdminOnly.address), " getAdminAddress")
    console.log(
        `Use "npx hardhat verify   ${[proxyAddress]}  --network bscTestnet  --contract "contracts/MyPiggyBankAdminOnly.sol:MyPiggyBankAdminOnly" " to verify`
      );
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})