pragma solidity >=0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

/// @title Cubit
contract Cubit is ERC20, ERC20Mintable{

    string public name = "Cubit";
    string public symbol = "CUB";
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 0;

    /**
    * @dev Mints INITIAL_SUPPLY cubits and gives them to the user who calls this function
    */
    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}

