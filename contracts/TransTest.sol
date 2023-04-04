// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract TransTest {
    address private owner;
    mapping(address => uint256) private balances;

    IERC20 private token;
    address private contractAddress;

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
        contractAddress = address(this);
    }

    function deposit(uint256 amount) public {
        require(token.balanceOf(msg.sender) >= amount, "Balance not enough");

        // 授权合约地址访问指定数量的代币
        token.approve(contractAddress, amount);

        // 检查授权是否成功
        require(token.allowance(msg.sender, contractAddress) >= amount, "Allowance not enough");

        // 转账给合约地址
        token.transferFrom(msg.sender, address(this), amount);

        // 更新余额
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // 转账给用户地址
        token.transfer(msg.sender, amount);

        // 更新余额
        balances[msg.sender] -= amount;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function authorize(address recipient, uint256 amount) public {
        // 授权指定地址访问指定数量的代币
        token.approve(recipient, amount);
    }

    function transfer(address recipient, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // 转账给接收者地址
        token.transfer(recipient, amount);

        // 更新余额
        balances[msg.sender] -= amount;
    }

    function getAllowance(address owner, address spender) public view returns (uint256) {
        return token.allowance(owner, spender);
    }

    function getContractAddress() public view returns (address) {
        return contractAddress;
    }
}
