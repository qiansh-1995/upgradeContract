import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Lock", function () {
  async function deployOneYearLockFixture() {
    const [owner] = await ethers.getSigners();
    const MTK = await ethers.getContractFactory("MyToken");
    const MyPiggyBank = await ethers.getContractFactory("MyPiggyBankTransparent");
    const mtk = await MTK.deploy("MRK", "BBB");
    const mpbank = await upgrades.deployProxy(MyPiggyBank, [mtk.address])
    await mpbank.deployed();
    const implementationAddress = await upgrades.erc1967.getImplementationAddress(mpbank.address);
    return { mpbank, mtk, owner, implementationAddress };
  }


  describe("DeploymentT", function () {
    it("test", async function () {
      const { mpbank, mtk, owner, implementationAddress } = await deployOneYearLockFixture();
      console.log(`owner address: ${owner.address}`)
      //approve by mtk
      await mtk.approve(mpbank.address, 5100);
      const app1 = await mtk.allowance(owner.address, mpbank.address);
      console.log(`app1: ${JSON.stringify(ethers.utils.formatUnits(app1, 'ether'))}`)



      //  const value=await mpbank.getAllowance();

      // console.log(`allowance: ${value}  `)
      //await mpbank.deposit(5100)
      await mpbank.deposit(5100)
      //const amount = await mpbank.deposit(owner.address)
      //console.log(amount)
      //`````````````````withdraw after upgrade contarct
      //await mtk.approve(mpbank.address, 5100);
      //````````````````
      const realAmount = await mtk.balanceOf(mpbank.address);
      console.log(`real amount ${realAmount}   your account :${await mpbank.accountBalances(owner.address)}`);
      const nextProcess = await mpbank.withdraw(5100);
      const realAmount2 = await mtk.balanceOf(mpbank.address);
      console.log(`real amount2 ${realAmount2}   your account :${await mpbank.accountBalances(owner.address)}`);

      const MyPiggyBankAdminOnlyTransparent = await ethers.getContractFactory("MyPiggyBankAdminOnlyTransparent")
      const myMyPiggyBankAdminOnlyTransparent = await upgrades.upgradeProxy(mpbank.address, MyPiggyBankAdminOnlyTransparent)
      await myMyPiggyBankAdminOnlyTransparent.deployed()
      console.log(" MyPiggyBankAdminOnlyTransparent address:" + myMyPiggyBankAdminOnlyTransparent.address)

      await mtk.approve(myMyPiggyBankAdminOnlyTransparent.address, 5100);

      await myMyPiggyBankAdminOnlyTransparent.deposit(5100)
      const getBalanceAgain = await mtk.balanceOf(myMyPiggyBankAdminOnlyTransparent.address);
      console.log(`getBalanceAgain ${getBalanceAgain}  your account :${await myMyPiggyBankAdminOnlyTransparent.accountBalances(owner.address)}`)
      console.log(`inputaddress:  ${owner.address} contract ownder address :${await myMyPiggyBankAdminOnlyTransparent.owner()}`)
    
      await myMyPiggyBankAdminOnlyTransparent.withdraw(5100,owner.address);
      const getBalanceAgain2 = await mtk.balanceOf(myMyPiggyBankAdminOnlyTransparent.address);
      console.log(`getBalanceAgain2${getBalanceAgain2}`)

    });
  });
});