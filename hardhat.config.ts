import { HardhatUserConfig } from "hardhat/config";
import '@openzeppelin/hardhat-upgrades'
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import { string } from "hardhat/internal/core/params/argumentTypes";
import fs from 'fs';

if (!fs.existsSync("./.env")) {
  throw new Error("没有找到.env文件，请运行 cp .env.example .env，然后修改其中内容。")
}

dotenvConfig()

const PRIVATE_KEY = process.env.BSC_TESTNET_PRIVATE_KEY ? process.env.BSC_TESTNET_PRIVATE_KEY : ""
const API_KEY = process.env.BSC_TESTNET_API_KEY ? process.env.BSC_TESTNET_API_KEY : ""

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  //defaultNetwork: "bscTestnet",
  etherscan: {
    apiKey: {
      bscTestnet: API_KEY
    }
  },
  networks: {
    "bscTestnet": {
      url: "https://bsc-testnet.public.blastapi.io/",
      chainId: 97,
      accounts: [PRIVATE_KEY],
      blockGasLimit: 400000,
    }
  }
};

export default config;
