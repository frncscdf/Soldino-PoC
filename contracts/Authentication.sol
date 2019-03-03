pragma solidity >=0.5.0;

import "./ContractManager.sol";
import "./Citizen.sol";
import "./BusinessOwner.sol";
import "./Government.sol";

/// @title Authentication
contract Authentication {

    enum userType { NotRegistered, Citizen, BusinessOwner, Government }


    ContractManager manager;
    /**
    * @dev Sets the correct instance of ContractManager so that the contract may be able to call functions from other
    *      contracts
    * @param _manager The address of the instance of ContractManager
    */
    constructor(ContractManager _manager) public {
        manager = _manager;
    }

    /**
    * @dev Checks if a user with is registered in the platform
    * @param _user The address of the user to check
    */
    modifier onlyExistingUser(address _user) {
        require(isRegistered(_user) != userType.NotRegistered);
        _;
    }

    /**
    * @dev Returns the user type of the user who calls the function
    */
    function login() public view returns(userType){
        return isRegistered(msg.sender);
    }

    /**
    * @dev Returns the user type of a given user
    * @param _user The address of the user to check
    */
    function isRegistered(address _user) public view returns(userType){
        (bytes32 param1, bytes32 param2, bytes32 param3, bytes32 param4) = Citizen(manager.getCitizenContract()).login(_user);
        if(param1 != 0x0)
            return userType.Citizen;
        (param1, param2, param3, param4) = BusinessOwner(manager.getBusinessOwnerContract()).login(_user);
        if(param1 != 0x0)
            return userType.BusinessOwner;
        if(Government(manager.getGovernmentContract()).isGovernment(_user))
            return userType.Government;
        return userType.NotRegistered;

    }


}
