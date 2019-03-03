pragma solidity >=0.5.0;

import "./ContractManager.sol";
import "./Authentication.sol";

/// @title Citizen
contract Citizen {

    struct citizen {
        bytes32 name;
        bytes32 surname;
        bytes32 fiscalCode;
        bytes32 mail;
    }

    address[] private registeredCitizens;
    mapping(address => citizen) private citizens;
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
    * @dev Checks if the given user is a registered citizen
    * @param _user The address of the user to check
    */
    modifier onlyCitizen(address _user) {
        require(!(citizens[_user].mail == 0x0), "User is not a registered citizen");
        _;
    }

    /**
    * @dev Checks if the given user is not registered on the platform
    * @param _user The address of the user to check
    */
    modifier onlyNotRegistered(address _user) {
        require(uint(Authentication(manager.getAuthenticationContract()).isRegistered(_user)) == 0, "Already registered");
        _;
    }

    /**
    * @dev Registers the user who calls this function as a citizen
    * @param _name The name of the citizen to register
    * @param _surname The surname of the citizen to register
    * @param _fiscalCode The fiscal code of the citizen to register
    * @param _mail The e-mail of the citizen to register
    */
    function registerCitizen(bytes32 _name, bytes32 _surname, bytes32 _fiscalCode, bytes32 _mail) public onlyNotRegistered(msg.sender) {
        citizens[msg.sender].name = _name;
        citizens[msg.sender].surname = _surname;
        citizens[msg.sender].fiscalCode = _fiscalCode;
        citizens[msg.sender].mail = _mail;
        registeredCitizens.push(msg.sender);
    }

    /**
    * @dev Returns the data of a specific user if it's a registered citizen
    * @param _user The address of the citizen whose data to return
    */
    function login(address _user) public view returns(bytes32, bytes32, bytes32, bytes32)  {
        return (citizens[_user].name, citizens[_user].surname, citizens[_user].fiscalCode, citizens[_user].mail);
    }

    /**
    * @dev Returns a dynamic array containing all registered citizens' addresses
    */
    function getAllCitizens() public view returns(address[] memory) {
        return registeredCitizens;
    }
}
