import CubitContract from '../../../../build/contracts/Cubit.json'
import CitizenContract from '../../../../build/contracts/Citizen.json'
import BusinessOwnerContract from '../../../../build/contracts/BusinessOwner.json'
import GovernmentContract from '../../../../build/contracts/Government.json'
import store from '../../../store'
import { browserHistory } from 'react-router'


const contract = require('truffle-contract');

export const USER_UPDATED = 'USER_UPDATED';
function userUpdated(user) {
  return {
    type: USER_UPDATED,
    payload: user
  }
}

export function mintCubit(amount) {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const cubit = contract(CubitContract);

      cubit.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        let cubitInstance = await cubit.deployed();

        await cubitInstance.mint(coinbase, amount,{from: coinbase});
        let userBalance = await cubitInstance.balanceOf(coinbase);
        dispatch(userUpdated({"type": '3', "name":"Government","balance": userBalance.toString()}));

        // Used a manual redirect here as opposed to a wrapper.
        // This way, once logged in a user can still access the home page.
        var currentLocation = browserHistory.getCurrentLocation();

        if ('redirect' in currentLocation.query)
        {
          return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }

        return browserHistory.push('/operations');
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function distributeCubit(amount) {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const cubit = contract(CubitContract);
      const government = contract(GovernmentContract);
      const citizen = contract(CitizenContract);
      const businessOwner = contract(BusinessOwnerContract);

      cubit.setProvider(web3.currentProvider);
      government.setProvider(web3.currentProvider);
      citizen.setProvider(web3.currentProvider);
      businessOwner.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        let cubitInstance = await cubit.deployed();
        let governmentInstance = await government.deployed();
        let citizenInstance = await citizen.deployed();
        let businessOwnerInstance = await businessOwner.deployed();

        let numberOfRegisteredCitizens = (await citizenInstance.getAllCitizens()).length;
        let numberOfRegisteredBusinessOwners = (await businessOwnerInstance.getAllBusinessOwners()).length;
        await cubitInstance.approve(governmentInstance.address,  amount * (numberOfRegisteredBusinessOwners + numberOfRegisteredCitizens),{from: coinbase});
        await governmentInstance.distributeToAll(amount,{from: coinbase});

        let userBalance = await cubitInstance.balanceOf(coinbase);
        dispatch(userUpdated({"type": '3', "name":"Government","balance": userBalance.toString()}));

        // Used a manual redirect here as opposed to a wrapper.
        // This way, once logged in a user can still access the home page.
        const currentLocation = browserHistory.getCurrentLocation();

        if ('redirect' in currentLocation.query)
        {
          return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }

        return browserHistory.push('/operations');
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
