// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 private _totalSupply;
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _totalSupply = 10000 * (10 ** uint256(decimals()));
        _mint(msg.sender, _totalSupply);  // 10000 * 10 ** uint(decimals())); //mint all token to the owner
    }
   function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    // function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
    //     _transfer(_msgSender(), recipient, amount);
    //     return true;
    // }

    // function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
    //     _transfer(sender, recipient, amount);

    //     uint256 currentAllowance = allowance(sender, _msgSender());
    //     require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
    //     _approve(sender, _msgSender(), currentAllowance - amount);

    //     return true;
    // }
}
