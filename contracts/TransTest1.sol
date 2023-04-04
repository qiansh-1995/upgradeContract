// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//import "./MyToken.sol";
// interface MytokenEvent {
//     event Transfer(address indexed from, address indexed to, uint256 value);
//     event approval(
//         address indexed owner,
//         address indexed spender,
//         uint256 value
//     );
// }
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TransTest1 {
    //const start time & end
    IERC20 public xbbToken;
    mapping(address => uint256) public deposits;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Approval(address from, address to, uint256 amount);

    constructor(address _address) {
        xbbToken = IERC20(_address);
    }

    modifier approveSpender(uint256 amount) {
        require(xbbToken.approve(address(this), amount), "Approval failed");
        _;
    }

    function getAllowance() external view returns (uint256) {
        return xbbToken.allowance(msg.sender, address(this));
    }

    function setAllowanceWithApprove(
        uint256 amount
    ) private approveSpender(amount) returns (bool) {
        require(
            xbbToken.allowance(msg.sender, address(this)) >= amount,
            "please check approve amount!"
        );
        return true;
    }

    function asyncApprove(address _address, uint _amount) public {
        require(xbbToken.approve(_address, _amount), "approve func fail ");
        emit Approval(msg.sender, _address, _amount);
    }

    function deposit(uint256 _amount) external {
        require(_amount > 0, "Amount should be greater than 0");
        require(
            xbbToken.balanceOf(msg.sender) >= _amount,
            "Insufficient amount!"
        );
        // uint approveTotal=_amount/(10**18);
        // address contractAddr= address(this);
        //require(xbbToken.approve(address(this), _amount), "approve fail");
        //asyncApprove(_amount);
        // require(xbbToken.approve(address(this), _amount)  , "approve fail");
        // require(xbbToken.allowance(msg.sender,address(this))== _amount,"please check approve amount");
        setAllowanceWithApprove(_amount);

        xbbToken.transferFrom(msg.sender, address(this), _amount);

        deposits[msg.sender] += _amount;
        emit Deposited(msg.sender, _amount);
    }

    function deposit2(uint256 _amount) external {
        require(_amount > 0, "Amount should be greater than 0");
        // uint approveTotal=_amount/(10**18);
        //require(xbbToken.approve(msg.sender, _amount), "approve fail");
        //asyncApprove(_amount);
        require(
            xbbToken.allowance(address(this), msg.sender) == _amount,
            "please check approve amount1 "
        );
        xbbToken.transferFrom(address(this), msg.sender, _amount);
        deposits[msg.sender] += _amount;
        emit Deposited(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external {
        require(deposits[msg.sender] >= _amount, "Not enough balance");
        deposits[msg.sender] -= _amount;
        xbbToken.transfer(msg.sender, _amount);
        emit Withdrawn(msg.sender, _amount);
    }

    function checkDeposit(address _user) external view returns (uint256) {
        return deposits[_user];
    }
}
