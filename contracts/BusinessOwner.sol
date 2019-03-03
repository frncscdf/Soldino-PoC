pragma solidity >=0.5.0;

import "./ContractManager.sol";
import "./Authentication.sol";

/// @title Business Owner
contract BusinessOwner {

    struct businessOwner {
        bytes32 businessName;
        bytes32 location;
        bytes32 VATNumber;
        bytes32 CE;
    }

    ContractManager manager;
    address[] private registeredBusinessOwners;
    mapping(address => businessOwner) private businessOwners;

    /**
    * @dev Sets the correct instance of ContractManager so that the contract may be able to call functions from other
    *      contracts
    * @param _manager The address of the instance of ContractManager
    */
    constructor(ContractManager _manager) public {
        manager = _manager;
    }

    /**
    * @dev Checks if the given user is a registered business owner
    * @param _user The address of the user to check
    */
    modifier onlyBusinessOwner(address _user) {
        require(!(businessOwners[_user].CE == 0x0), "Not a business owner!");
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
    * @dev Registers the user who calls this function as a business owner
    * @param _businessName The name of the business to register
    * @param _location The location of the business to register
    * @param _VATNumber The VAT number of the business to register
    * @param _CE The certified e-mail of the business to register
    */
    function registerBusinessOwner (bytes32 _businessName, bytes32 _location,
                                    bytes32 _VATNumber, bytes32 _CE) public onlyNotRegistered(msg.sender) {
        businessOwners[msg.sender].businessName = _businessName;
        businessOwners[msg.sender].location = _location;
        businessOwners[msg.sender].VATNumber = _VATNumber;
        businessOwners[msg.sender].CE = _CE;
        registeredBusinessOwners.push(msg.sender);
    }

    /**
    * @dev Returns the data of a specific user if it's a registered business owner
    * @param _user The address of the business owner whose data to return
    */
    function login(address _user) public view returns(bytes32, bytes32, bytes32, bytes32)  {
        return (businessOwners[_user].businessName, businessOwners[_user].location,
                businessOwners[_user].VATNumber, businessOwners[_user].CE);
    }

    /**
    * @dev Returns a dynamic array containing all registered business owners' addresses
    */
    function getAllBusinessOwners() public view returns(address[] memory) {
        return registeredBusinessOwners;
    }
}
