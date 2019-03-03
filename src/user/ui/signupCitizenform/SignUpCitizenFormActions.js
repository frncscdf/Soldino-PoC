//import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import CitizenContract from '../../../../build/contracts/Citizen.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

const contract = require('truffle-contract');

export function signUpUser(name, surname, fiscalCode, email) {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const citizen = contract(CitizenContract);
      citizen.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var citizenInstance;

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        citizen.deployed().then(function(instance) {
          citizenInstance = instance;

          // Attempt to sign up user.
          citizenInstance.registerCitizen(web3.fromUtf8(name),
                                          web3.fromUtf8(surname),
                                          web3.fromUtf8(fiscalCode),
                                          web3.fromUtf8(email),
                                          {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            return dispatch(loginUser());
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
