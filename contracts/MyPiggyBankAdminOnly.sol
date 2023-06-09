// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./MyToken.sol";

contract MyPiggyBankAdminOnly is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    MyToken public _token;
    mapping(address => uint256) public accountBalances;
    uint public bankBalances;

    function initialize(address _address) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        _token = MyToken(_address);
    }

    function deposit(uint _amount) public {
        require(_amount > 0, "amount must >0");
        require(_token.balanceOf(msg.sender) >= _amount, "Not enough balance.");
        require(
            _token.allowance(msg.sender, address(this)) >= _amount,
            "please check approve amount"
        );
        require(
            _token.transferFrom(msg.sender, address(this), _amount),
            "Insufficient amount,please retry again"
        );
        accountBalances[msg.sender] += _amount;
        bankBalances += _amount;
    }

    function withdraw(uint _amount, address _address) public {
        require(
            msg.sender == owner(),
            "sorry,you don't have permission to execute"
        );
        require(
            accountBalances[msg.sender] > 0,
            "No permission,please save money"
        );
        require(accountBalances[_address] >= _amount, "Insufficient balance!");
        require(
            _token.balanceOf(address(this)) >= _amount,
            "Insufficient bank lines"
        );
        accountBalances[msg.sender] -= _amount;
        require(
            _token.transfer(msg.sender, _amount),
            "tranfer fail ,please retry again"
        );
        bankBalances -= _amount;
    }

    function getPersonBalance(address _address) public view returns (uint256) {
        return _token.balanceOf(_address);
    }

    // 需要此方法来防止未经授权的升级，因为在 UUPS 模式中，升级是从实现合约完成的，而在透明代理模式中，升级是通过代理合约完成的
    function _authorizeUpgrade(address) internal override onlyOwner {}
}
