import CubitContract from '../../build/contracts/Cubit.json'
import CitizenContract from '../../build/contracts/Citizen.json'
import BusinessOwnerContract from '../../build/contracts/BusinessOwner.json'
import GovernmentContract from '../../build/contracts/Government.json'
import AuthenticationContract from '../../build/contracts/Authentication.json'
import ContractManagerContract from '../../build/contracts/ContractManager.json'
import ProductContract from '../../build/contracts/Product.json'
import store from '/../store'
import {browserHistory} from "react-router";
const contract = require('truffle-contract');

class Web3Calls {

    getWeb3(){
        this.web3 = store.getState().web3.web3Instance;
        if (typeof web3 !== 'undefined') {
            this.web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            this. web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }

    async getCubitInstance() {
        let cubit = contract(CubitContract);
        cubit.setProvider(this.web3.currentProvider);
        return await cubit.deployed();
    }

    async getBusinessOwnerInstance() {
        let businessOwner = contract(BusinessOwnerContract);
        businessOwner.setProvider(this.web3.currentProvider);
        return await businessOwner.deployed();
    }

    async getCitizenInstance() {
        let citizen = contract(CitizenContract);
        citizen.setProvider(this.web3.currentProvider);
        return await citizen.deployed();
    }

    async getAuthenticationInstance() {
        let authentication = contract(AuthenticationContract);
        authentication.setProvider(this.web3.currentProvider);
        return await authentication.deployed();
    }

    async getContractManagerInstance() {
        let contractManager = contract(ContractManagerContract);
        contractManager.setProvider(this.web3.currentProvider);
        return await contractManager.deployed();
    }

    async getGovernmentInstance() {
        let government = contract(GovernmentContract);
        government.setProvider(this.web3.currentProvider);
        return await government.deployed();
    }

    async getProductInstance() {
        let product = contract(ProductContract);
        product.setProvider(this.web3.currentProvider);
        return await product.deployed();
    }

    getCoinbase() {
        return this.web3.eth.coinbase;
    }

    async getUserBalance(user) {
        this.getWeb3();
        let cubitInstance = this.getCubitInstance();
        return (await cubitInstance.balanceOf(user)).toString();
    }

    async mintCubit(amount){
        this.getWeb3();
        let coinbase = this.getCoinbase();
        let cubitInstance = this.getCubitInstance();
        await cubitInstance.mint(coinbase, amount,{from: coinbase});
    }

    async distributeCubitToAll(amount){
        this.getWeb3();
        let coinbase = this.getCoinbase();
        let cubitInstance = this.getCubitInstance();
        let governmentInstance = this.getGovernmentInstance();
        let businessOwnerInstance = this.getBusinessOwnerInstance();
        let citizenInstance = this.getCitizenInstance();

        let numberOfRegisteredCitizens = (await citizenInstance.getAllCitizens()).length;
        let numberOfRegisteredBusinessOwners = (await businessOwnerInstance.getAllBusinessOwners()).length;

        let totalExpense = amount * (numberOfRegisteredBusinessOwners + numberOfRegisteredCitizens);

        await cubitInstance.approve(governmentInstance.address, totalExpense ,{from: coinbase});
        await governmentInstance.distributeToAll(amount,{from: coinbase});
    }

    async signUpAsCitizen(name, surname, fiscalCode, email) {
        this.getWeb3();
        let coinbase = this.getCoinbase();
        let citizenInstance = this.getCitizenInstance();
        await citizenInstance.registerCitizen(name, surname, fiscalCode, email, {from: coinbase})
    }

    async signUpAsBusinessOwner(businessName, location, VATNumber, CE) {
        this.getWeb3();
        let coinbase = this.getCoinbase();
        let businessOwnerInstance = this.getBusinessOwnerInstance();
        await businessOwnerInstance.registerBusinessOwner(businessName, location, VATNumber, CE, {from: coinbase})
    }

    async getUserData(user) {
        this.getWeb3();
        let authenticationInstance = this.getAuthenticationInstance();
        let userType = (await authenticationInstance.isRegistered(user)).toString();
        let userBalance = this.getUserBalance(user);
        let userData;
        switch (userType) {
            case '1':
                let citizenInstance = this.getCitizenInstance();
                userData = await citizenInstance.login(user);
                return {"type":userType,
                        "name": web3.toUtf8(userData[0]),
                        "surname": web3.toUtf8(userData[1]),
                        "fiscalCode": web3.toUtf8(userData[2]),
                        "email": web3.toUtf8(userData[3]),
                        "balance": userBalance.toString()};
            case '2':
                let businessOwnerInstance = this.getBusinessOwnerInstance();
                userData = await businessOwnerInstance.login(user);

                return {"type":userType,
                        "businessName": web3.toUtf8(userData[0]),
                        "location": web3.toUtf8(userData[1]),
                        "VATNumber": web3.toUtf8(userData[2]),
                        "CE": web3.toUtf8(userData[3]),
                        "balance": userBalance.toString()};
            case '3': return {"type":userType,"name":"Government","balance": userBalance.toString()};
            default: return {"type": '0'};
        }
    }
}