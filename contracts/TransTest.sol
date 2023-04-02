// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./MyToken.sol";

contract TransTest {
    MyToken public _token;
    //const start time & end
    mapping(address => uint256) public accountBalances;
    uint public bankBalances;

    mapping(address => uint256) balances; //cruuency : MMM

    constructor(address _address) {
        _token = MyToken(_address);
    }

    function save(uint _amount) public {
        require(_amount > 0, "amount must >0");
        require(
            _token.transferFrom(msg.sender, address(this), _amount),
            "Insufficient amount,please retry again"
        );
        accountBalances[msg.sender] += _amount;
        bankBalances += _amount;
    }

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
        _token.approve(address(this), _amount);
        accountBalances[msg.sender] -= _amount;
        _token.transfer(msg.sender, _amount);
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
}
