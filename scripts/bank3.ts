const { ethers } = require("hardhat");
const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

async function main() {
  // 切换到您部署此合约的网络
  const networkName = "rinkeby";
  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: `https://${networkName}.infura.io/v3/${process.env.INFURA_API_KEY}`,
        },
      },
    ],
  });

  const tokenAddress = ""; // 加载已部署的ERC20代币的地址

  // 部署SavingsContract代理合约
  const contractFactory = await ethers.getContractFactory("SavingsContract");
  const savingsContract = await upgradeProxy(
    "", // 加载已部署的SavingsContract合约的地址
    contractFactory,
    { initializer: "initialize", unsafeAllowCustomTypes: true } // 使用自定义参数调用"SavingsContract"合约的"initialize"方法
  );

  console.log("SavingsContract 地址:", savingsContract.address);

  // 将该地址保存到 JSON 文件中供以后使用
  const fs = require("fs");
  const contractAddressJson = { address: savingsContract.address };
  fs.writeFileSync(
    `./contracts/${networkName}-SavingsContract.json`,
    JSON.stringify(contractAddressJson, undefined, 2)
  );

  // ...其他合约部署或测试代码
}

main();
