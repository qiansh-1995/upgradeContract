// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import { ethers, upgrades } from "hardhat";

// describe("Lock", function () {
//   async function deployOneYearLockFixture() {
//     const [owner] = await ethers.getSigners();
//     const MTK = await ethers.getContractFactory("MyToken");
//     const MyPiggyBank = await ethers.getContractFactory("MyPiggyBank");
//     const mtk = await MTK.deploy("MRK", "BBB");
//     const mpbank = await upgrades.deployProxy(MyPiggyBank, [mtk.address], {
//       initializer: "initialize",
//       kind: 'uups'
//     })
//     await mpbank.deployed();
//     const implementationAddress = await upgrades.erc1967.getImplementationAddress(mpbank.address);
//     return { mpbank, mtk, owner, implementationAddress };
//   }


//   describe("DeploymentUUPS", function () {
//     it("test", async function () {
//       const { mpbank, mtk, owner, implementationAddress } = await deployOneYearLockFixture();
//       console.log(`owner address: ${owner.address}`)
//       //approve by mtk
//       await mtk.approve(mpbank.address, 5100);
//       const app1 = await mtk.allowance(owner.address, mpbank.address);
//       console.log(`app1: ${JSON.stringify(ethers.utils.formatUnits(app1, 'ether'))}`)



//       //  const value=await mpbank.getAllowance();

//       // console.log(`allowance: ${value}  `)
//       //await mpbank.deposit(5100)
//       await mpbank.deposit(5100)
//       //const amount = await mpbank.deposit(owner.address)
//       //console.log(amount)
//       //`````````````````withdraw after upgrade contarct
//       //await mpbank.deposit(1100)
//       //````````````````
//       const realAmount = await mtk.balanceOf(mpbank.address);
//       console.log(`real amount ${realAmount}   your account :${await mpbank.accountBalances(owner.address)}`);
//       const nextProcess = await mpbank.withdraw(5100);
//       const realAmount2 = await mtk.balanceOf(mpbank.address);
//       console.log(`real amount2 ${realAmount2}   your account :${await mpbank.accountBalances(owner.address)}`);

//       const MyPiggyBankAdminOnly = await ethers.getContractFactory("MyPiggyBankAdminOnly")
//       const myMyPiggyBankAdminOnly = await upgrades.upgradeProxy(mpbank.address, MyPiggyBankAdminOnly)
//       await myMyPiggyBankAdminOnly.deployed()
//       console.log(" MyPiggyBankAdminOnly address:" + myMyPiggyBankAdminOnly.address)

//       await mtk.approve(myMyPiggyBankAdminOnly.address, 5100);

//       await myMyPiggyBankAdminOnly.deposit(5100)
//       const getBalanceAgain = await mtk.balanceOf(myMyPiggyBankAdminOnly.address);
//       console.log(`getBalanceAgain ${getBalanceAgain}  your account :${await myMyPiggyBankAdminOnly.accountBalances(owner.address)}`)
//       await myMyPiggyBankAdminOnly.withdraw(5100,owner.address);
//       const getBalanceAgain2 = await mtk.balanceOf(myMyPiggyBankAdminOnly.address);
//       console.log(`getBalanceAgain2${getBalanceAgain2}`)

//     });
//   });
// });