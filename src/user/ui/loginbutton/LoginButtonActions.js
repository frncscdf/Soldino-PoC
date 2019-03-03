import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import CitizenContract from '../../../../build/contracts/Citizen.json'
import BusinessOwnerContract from '../../../../build/contracts/BusinessOwner.json'
import CubitContract from '../../../../build/contracts/Cubit.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract');

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract);
      authentication.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance;

      // Get current ethereum wallet.
      web3.eth.getCoinbase(async (error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        let instance = await authentication.deployed();
        authenticationInstance = instance;

          // Attempt to login user.
        let userType = (await authenticationInstance.login({from: coinbase})).toString();
        let userData;

        const cubit = contract(CubitContract);
        cubit.setProvider(web3.currentProvider);
        let cubitInstance = await  cubit.deployed();
        let userBalance = await cubitInstance.balanceOf(coinbase);
        switch (userType) {
          case '1':
            const citizen = contract(CitizenContract);
            citizen.setProvider(web3.currentProvider);
            let citizenInstance = await citizen.deployed();
            userData = await citizenInstance.login(coinbase);

            dispatch(userLoggedIn({"type":userType,
              "name": web3.toUtf8(userData[0]),
              "surname": web3.toUtf8(userData[1]),
              "fiscalCode": web3.toUtf8(userData[2]),
              "email": web3.toUtf8(userData[3]),
              "balance": userBalance.toString()}));
            break;
          case '2':
            const businessOwner = contract(BusinessOwnerContract);
            businessOwner.setProvider(web3.currentProvider);
            let businessOwnerInstance = await businessOwner.deployed();
            userData = await businessOwnerInstance.login(coinbase);

            dispatch(userLoggedIn({"type":userType,
              "businessName": web3.toUtf8(userData[0]),
              "location": web3.toUtf8(userData[1]),
              "VATNumber": web3.toUtf8(userData[2]),
              "CE": web3.toUtf8(userData[3]),
              "balance": userBalance.toString()}));
            break;
          case '3':
            dispatch(userLoggedIn({"type":userType,"name":"Government","balance": userBalance.toString()}));
            break;
          default:
            console.error('Wallet ' + coinbase + ' does not have an account!');
            return browserHistory.push('/signup');
        }

        // Used a manual redirect here as opposed to a wrapper.
        // This way, once logged in a user can still access the home page.
        var currentLocation = browserHistory.getCurrentLocation();

        if ('redirect' in currentLocation.query)
        {
          return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
        }

        return browserHistory.push('/dashboard')
      })/*.catch(function(result) {
        // If error, go to signup page.

      })*/
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
