// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./MyToken.sol";

library SafeMath {}

contract MyPiggyBank is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    MyToken public tokenContract;
    address payable public _owner;
    mapping(address => uint256) public accountBalances; //cruuency : MMM
    uint public bankBalances;
    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }



    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {
        _owner = payable(msg.sender);
    }

    //v1 customer save money
    function save(uint _amount) public payable {
        require(_amount > 0, "amount must >0");
        require(
            type(uint).max - _amount > accountBalances[msg.sender],
            "Excessive amount"
        );

        tokenContract.transferFrom(msg.sender, _owner, _amount); //transfer private token
        accountBalances[msg.sender] += _amount;
        bankBalances += _amount;
    }

    function withdraw(uint _amount) public payable {
        require(
            accountBalances[msg.sender] > 0,
            "No permission,please save money"
        );
        require(accountBalances[msg.sender] > _amount, "Insufficient balance");

        accountBalances[msg.sender] -= _amount;
        tokenContract.transferFrom(_owner, msg.sender, _amount);
        bankBalances -= _amount;
    }

    // 需要此方法来防止未经授权的升级，因为在 UUPS 模式中，升级是从实现合约完成的，而在透明代理模式中，升级是通过代理合约完成的
    function _authorizeUpgrade(address) internal override onlyOwner {}
}
