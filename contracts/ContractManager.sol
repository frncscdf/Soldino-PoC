pragma solidity >=0.5.0;

/// @title Contract Manager
contract ContractManager {

    address government;

    address AuthenticationContract;
    address BusinessOwnerContract;
    address CitizenContract;
    address CubitContract;
    address GovernmentContract;
    address ProductContract;

    /**
    * @dev Sets the address of the government user to msg.sender
    */
    constructor() public {
        government = msg.sender;
    }

    /**
    * @dev Checks if the user who calls a function is the government
    */
    modifier onlyGovernment() {
        require(msg.sender == government);
        _;
    }

    /**
    * @dev Returns the address of the government user
    */
    function getGovernment() public view returns(address) {
        return government;
    }

    /**
    * @dev Returns the address of the instance of Authentication.sol
    */
    function getAuthenticationContract() public view returns(address) {
        return AuthenticationContract;
    }

    /**
    * @dev Returns the address of the instance of BusinessOwner.sol
    */
    function getBusinessOwnerContract() public view returns(address) {
        return BusinessOwnerContract;
    }

    /**
    * @dev Returns the address of the instance of Citizen.sol
    */
    function getCitizenContract() public view returns(address) {
        return CitizenContract;
    }

    /**
    * @dev Returns the address of the instance of Cubit.sol
    */
    function getCubitContract() public view returns(address) {
        return CubitContract;
    }

    /**
    * @dev Returns the address of the instance of Government.sol
    */
    function getGovernmentContract() public view returns(address) {
        return GovernmentContract;
    }

    /**
    * @dev Returns the address of the instance of Product.sol
    */
    function getProductContract() public view returns(address) {
        return ProductContract;
    }


    /**
    * @dev Used to set the address of the instance of Authentication.sol
    * @param _contract The new address of the contract
    */
    function setAuthenticationContract(address _contract) onlyGovernment public {
        AuthenticationContract = _contract;
    }

    /**
    * @dev Used to set the address of the instance of BusinessOwner.sol
    * @param _contract The new address of the contract
    */
    function setBusinessOwnerContract(address _contract) onlyGovernment public {
        BusinessOwnerContract = _contract;
    }

    /**
    * @dev Used to set the address of the instance of Citizen.sol
    * @param _contract The new address of the contract
    */
    function setCitizenContract(address _contract) onlyGovernment public {
        CitizenContract = _contract;
    }

    /**
    * @dev Used to set the address of the instance of Cubit.sol
    * @param _contract The new address of the contract
    */
    function setCubitContract(address _contract) onlyGovernment public {
        CubitContract = _contract;
    }

    /**
    * @dev Used to set the address of the instance of Government.sol
    * @param _contract The new address of the contract
    */
    function setGovernmentContract(address payable _contract) onlyGovernment public {
        GovernmentContract = _contract;
    }

    /**
    * @dev Used to set the address of the instance of Product.sol
    * @param _contract The new address of the contract
    */
    function setProductContract(address payable _contract) onlyGovernment public {
        ProductContract = _contract;
    }



}
