// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "./MyToken.sol"; 

contract MyPiggyBank is Initializable, UUPSUpgradeable, OwnableUpgradeable {

    MyToken public _token;
    mapping(address => uint256) public accountBalances; 
    uint public bankBalances;

    function initialize(address _address) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        _token=MyToken(_address);
    }

    function save(uint _amount) public {
        require(_amount > 0, "amount must >0");
         _token.allowance(address(this),msg.sender);
        //require(_token.allowance(msg.sender,address(this)), "Token allowance failed");
        require(
            _token.transferFrom(msg.sender, address(this), _amount),
            "Excessive amount"
        );
        accountBalances[msg.sender] += _amount;
        bankBalances += _amount;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor

    //v1 customer save money
    // function save(uint _amount) public {
    //     require(_amount > 0, "amount must >0");
    //     require(
    //         _token.transferFrom(msg.sender, address(this), _amount),
    //         "Excessive amount"
    //     );
    //     accountBalances[msg.sender] += _amount;
    //     bankBalances += _amount;
    // }

    function withdraw(uint _amount) public {
        require(
            accountBalances[msg.sender] > 0,
            "No permission,please save money"
        );
        require(accountBalances[msg.sender] > _amount, "Insufficient balance");
        require(
            _token.balanceOf(address(this)) >= _amount,
            "Insufficient balance"
        );
        _token.allowance(address(this),msg.sender);
        accountBalances[msg.sender] -= _amount;
        _token.transferFrom(address(this), msg.sender, _amount);
        bankBalances -= _amount;
    }

    function getRealBalance() public view returns (uint256) {
        return _token.balanceOf(msg.sender);
    }
    function getPersonBalance(address _address) public view returns (uint256) {
        return _token.balanceOf(_address);
    }


    function getAddress() public view returns (address) {
        return address(this);
    }

    // 需要此方法来防止未经授权的升级，因为在 UUPS 模式中，升级是从实现合约完成的，而在透明代理模式中，升级是通过代理合约完成的
    function _authorizeUpgrade(address) internal override onlyOwner {}
}
