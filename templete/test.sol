pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

contract SavingsContract is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    event Deposit(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amount);
    IERC20Upgradeable private _token;

    function initialize(IERC20Upgradeable token) public initializer {
        __Ownable_init();
        _token = token;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function deposit(uint256 amount) external {
        require(amount > 0, "Deposit amount must be greater than 0");
        require(
            _token.allowance(msg.sender, address(this)) >= amount,
            "Approve token first"
        );

        _token.transferFrom(msg.sender, address(this), amount);
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(
            _token.balanceOf(address(this)) >= amount,
            "Insufficient funds"
        );

        _token.transfer(msg.sender, amount);
        emit Withdrawal(msg.sender, amount);
    }
}
