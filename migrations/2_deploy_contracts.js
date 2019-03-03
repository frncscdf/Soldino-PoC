var Authentication = artifacts.require("./Authentication.sol");
var BusinessOwner = artifacts.require("./BusinessOwner.sol");
var Citizen = artifacts.require("./Citizen.sol");
var Cubit = artifacts.require("./Cubit.sol");
var Government = artifacts.require("./Government.sol");
var Product = artifacts.require("./Product.sol");
var ContractManager = artifacts.require("./ContractManager.sol");

module.exports = function (deployer) {
    deployer.deploy(ContractManager).then(function () {
        return ContractManager.deployed().then(async function (instance) {
            await deployer.deploy(BusinessOwner, ContractManager.address).then(function () {
                instance.setBusinessOwnerContract(BusinessOwner.address);
            });
            await deployer.deploy(Citizen, ContractManager.address).then(function () {
                instance.setCitizenContract(Citizen.address);
            });
            await deployer.deploy(Cubit).then(function () {
                instance.setCubitContract(Cubit.address);
            });
            await deployer.deploy(Government, ContractManager.address).then(function () {
                instance.setGovernmentContract(Government.address);
            });
            await deployer.deploy(Authentication, ContractManager.address).then(function () {
                instance.setAuthenticationContract(Authentication.address);
            });
            await deployer.deploy(Product, ContractManager.address).then(function () {
                instance.setProductContract(Product.address);
            });
        })
    })
};