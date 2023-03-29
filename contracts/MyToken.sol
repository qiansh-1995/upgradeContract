// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 private _totalSupply;
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _totalSupply = 10000 * (10 ** uint256(decimals()));
        _mint(msg.sender, 10000 * 10 ** uint(decimals())); //mint all token to the owner
    }
}
