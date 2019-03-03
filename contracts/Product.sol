pragma solidity >=0.5.0;

import "./ContractManager.sol";
import "./Authentication.sol";
import "./Cubit.sol";

contract Product {

    struct product {
        bytes32 name;
        uint price;
        address owner;
        uint availability;
        uint VAT;
    }

    uint nextProduct;
    uint[] products;
    mapping(uint => product) productData;
    ContractManager manager;

    /**
    * @dev Sets the correct instance of ContractManager so that the contract may be able to call functions from other
    *      contracts
    * @param _manager The address of the instance of ContractManager
    */
    constructor(ContractManager _manager) public {
        manager = _manager;
        nextProduct = 0;
    }

    /**
    * @dev Checks if the given id identifies a registered product
    * @param _productId The id of the product to check
    */
    modifier onlyValidProductID(uint _productId) {
        product memory tmp = productData[_productId];
        require(tmp.name != 0x0);
        _;
    }

    /**
    * @dev Checks if a given user is the owner of the given product
    * @param _user The address of the business owner who's supposed to own the product
    * @param _productId The id associated with the product whose owner is to be checked
    */
    modifier onlyProductOwner(address _user, uint _productId) {
        product memory tmp = productData[_productId];
        require(tmp.owner == _user);
        _;
    }

    /**
    * @dev Checks if a given user is a registered business owner
    * @param _user The address of the user to check
    */
    modifier onlyBusinessOwner(address _user) {
        Authentication auth = Authentication(manager.getAuthenticationContract());
        require((uint(auth.isRegistered(_user)) == 2) || _user == address(this), "Not a business owner!");
        _;
    }

    /**
    * @dev Checks if a given user is a registered business owner
    * @param _user The address of the user to check
    */
    modifier onlyRegisteredUser(address _user) {
        Authentication auth = Authentication(manager.getAuthenticationContract());
        uint userType = uint(auth.isRegistered(_user));
        require(userType == 1 || userType == 2, "Not a registered user!");
        _;
    }

    /**
    * @dev Adds a new product to the system, owned by the business owner who calls the function
    * @param _name The name of the product to add
    * @param _price The price of the product to add
    * @param _availability The availability of the product to add
    * @param _VAT The VAT of the product to add
    */
    function addProduct(bytes32 _name, uint _price, uint _availability, uint _VAT) public onlyBusinessOwner(msg.sender) {

        productData[nextProduct].name = _name;
        productData[nextProduct].price = _price;
        productData[nextProduct].owner = msg.sender;
        productData[nextProduct].availability = _availability;
        productData[nextProduct].VAT = _VAT;

        products.push(nextProduct);
        nextProduct = nextProduct + 1;

    }

    /**
    * @dev Allows the the registered user who calls the function to buy a certain quantity of a product if it has enough
    *      cubits
    * @param _productId The id of the product to buy
    * @param _amount The amount of products to buy
    */
    function buyProduct(uint _productId, uint _amount) public onlyRegisteredUser(msg.sender)
                                                              onlyValidProductID(_productId) {
        product memory productToBuy = productData[_productId];
        require(productToBuy.availability >= _amount);
        Cubit(manager.getCubitContract()).transferFrom(msg.sender, productToBuy.owner, _amount * productToBuy.price);
        updateProductAvailability(_productId, productToBuy.availability - _amount);
    }

    /**
    * @dev Function used by the owner of a product and this contract in order to change the name of a product
    * @param _productId The id of the product whose name to change
    * @param _name The new name of the product
    */
    function updateProductName(uint _productId, bytes32 _name) onlyBusinessOwner(msg.sender) public {
        productData[_productId].name = _name;
    }

    /**
    * @dev Function used by the owner of a product and this contract in order to change the price of a product
    * @param _productId The id of the product whose name to change
    * @param _price The new price of the product
    */
    function updateProductPrice(uint _productId, uint _price) onlyBusinessOwner(msg.sender) public {
        productData[_productId].price = _price;
    }

    /**
    * @dev Function used by the owner of a product and this contract in order to change the availability of a product
    * @param _productId The id of the product whose name to change
    * @param _availability The new availability of the product
    */
    function updateProductAvailability(uint _productId, uint _availability) onlyBusinessOwner(msg.sender) public {
        productData[_productId].availability = _availability;
    }

    /**
    * @dev Function used by the owner of a product and this contract in order to change the availability of a product
    * @param _productId The id of the product whose name to change
    * @param _VAT The new VAT of the product
    */
    function updateProductVAT(uint _productId, uint _VAT) onlyBusinessOwner(msg.sender) public {
        productData[_productId].VAT = _VAT;
    }
}
