import { ethers, upgrades } from 'hardhat'

// yarn hardhat run scripts/deploy_openProxy.ts --network localhost
//proxy address
const proxyAddress = '0xe3c196D951Ea63a066387878E076C12733f34076'

async function main() {
    console.log(proxyAddress, " original proxy address")
    const MyPiggyBankAdminOnly = await ethers.getContractFactory("MyPiggyBankAdminOnlyTransparent")
    console.log("upgrade to MyPiggyBankAdminOnlyTrans...")
    const myMyPiggyBankAdminOnlyTrans = await upgrades.upgradeProxy(proxyAddress, MyPiggyBankAdminOnly)
    await myMyPiggyBankAdminOnlyTrans.deployed();
    console.log(myMyPiggyBankAdminOnlyTrans.address, " MyPiggyBankAdminOnly address")

    console.log(await upgrades.erc1967.getImplementationAddress(myMyPiggyBankAdminOnlyTrans.address), " getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(myMyPiggyBankAdminOnlyTrans.address), " getAdminAddress")
    console.log(
        `Use "npx hardhat verify  ${[proxyAddress]} --network bscTestnet  --contract "contracts/MyPiggyBankAdminOnlyTransparent.sol:MyPiggyBankAdminOnlyTransparent" " to verify`
      );
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})