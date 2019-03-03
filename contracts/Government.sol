pragma solidity >=0.5.0;

import "./ContractManager.sol";
import "./Citizen.sol";
import "./Cubit.sol";
import "./BusinessOwner.sol";

/// @title Government
contract Government {

    address governmentAddress;
    ContractManager manager;

    /**
    * @dev Sets the correct instance of ContractManager so that the contract may be able to call functions from other
    *      contracts
    * @param _manager The address of the instance of ContractManager
    */
    constructor(ContractManager _manager) public {
        manager = _manager;
        governmentAddress = manager.getGovernment();
    }

    /**
    * @dev Checks if the user who calls this function is the government
    */
    modifier onlyGovernment {
        require(governmentAddress == msg.sender, "Not a registered citizen!");
        _;
    }

    /**
    * @dev Returns true if the given user is the government
    * @param _user The address of the user to check
    */
    function isGovernment(address _user) public view returns(bool) {
        return governmentAddress == _user;
    }

    /**
    * @dev Allows the government to distribute cubits to a specific set of users
    * @param _to An array containing the addresses of the users to whom send cubits
    * @param _amount the amount of cubits to give to EACH of the users
    */
    function distributeToUsers(address[] memory _to, uint256 _amount) onlyGovernment public {
        require((_to.length * _amount < Cubit(manager.getCubitContract()).balanceOf(msg.sender)), "Not enough tokens");
        _distribute(_to, _amount);
    }

    /**
    * @dev Allows the government to distribute cubits to all citizens and business owners registered in the system
    * @param _amount the amount of cubits to give to EACH of the users
    */
    function distributeToAll(uint _amount) public onlyGovernment {
        address[] memory toCitizens = Citizen(manager.getCitizenContract()).getAllCitizens();
        address[] memory toBusinessOwners = BusinessOwner(manager.getBusinessOwnerContract()).getAllBusinessOwners();
        require((toCitizens.length + toBusinessOwners.length) * _amount < Cubit(manager.getCubitContract()).balanceOf(msg.sender), "Not enough tokens");

        _distribute(toCitizens, _amount);
        _distribute(toBusinessOwners, _amount);
    }

    /**
    * @dev Private function that tries to distribute money to a specific set of users (no requires are used)
    * @param _to An array containing the addresses of the users to whom send cubits
    * @param _amount the amount of cubits to give to EACH of the users
    */
    function _distribute(address[] memory _to, uint256 _amount) private  {
        //Cubit(manager.getCubitContract()).increaseAllowance(address(this), 1000); //necessario aumentare l'allowance da js
        for(uint i = 0; i <  _to.length; i++){
            Cubit(manager.getCubitContract()).transferFrom(msg.sender, _to[i], _amount);
        }
    }
}
