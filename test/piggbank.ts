// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("Lock", function () {
//   async function deployOneYearLockFixture() {
//     const [owner] = await ethers.getSigners();
//     const XBB = await ethers.getContractFactory("MyToken");
//     const Lock = await ethers.getContractFactory("TransTest");
//     const mtk = await XBB.deploy("MRK", "BBB");
//     const lock = await Lock.deploy(mtk.address);

//     return { lock, mtk, owner };
//   }

//   describe("Deployment", function () {
//     it("test", async function () {
//       const { lock, mtk, owner } = await deployOneYearLockFixture();
//       console.log(`owner address: ${owner.address}`)
//       //approve by mtk
//       // await mtk.approve(lock.address, 5100);
//       // const app1=await mtk.allowance(owner.address,lock.address);
//       // console.log(`app1: ${JSON.stringify(   ethers.utils.formatUnits(app1,'ether'))}`)
//       // //approve by another contract 
//       // const appResult=await lock.asyncApprove(lock.address, 5100)
//       // console.log(`appResult: ${JSON.stringify(appResult)}`)
//       // const app2 = mtk.allowance(owner.address, lock.address);
//       // console.log(`app2: ${JSON.stringify(app2)}`)
//       // const appMtk2 = lock.getAllowance();
//       // console.log(`appMtk2: ${JSON.stringify(appMtk2)}`)


//     //  const value=await lock.getAllowance();
   
//      // console.log(`allowance: ${value}  `)
//       //await lock.deposit(5100)
//       await lock.deposit(5100)
//       const amount = await lock.deposit(owner.address)
//       console.log(amount)
//       const realAmount =await mtk.balanceOf(lock.address);
//       console.log(`real amount ${realAmount}`);
//       const nextProcess =await lock.withdraw(5100);
//       const realAmount2 =await mtk.balanceOf(lock.address);
//       console.log(`real amount ${realAmount2}`);
//     });
//   });
// });