//import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import BusinessOwnerContract from '../../../../build/contracts/BusinessOwner.json'
import { loginUser } from '../loginbutton/LoginButtonActions'
import store from '../../../store'

const contract = require('truffle-contract');

export function signUpUser(businessName, location, VATNumber, CE) {
  let web3 = store.getState().web3.web3Instance;

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const businessOwner = contract(BusinessOwnerContract);
      businessOwner.setProvider(web3.currentProvider);

      // Declaring this for later so we can chain functions on Authentication.
      var businessOwnerInstance;

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        businessOwner.deployed().then(function(instance) {
          businessOwnerInstance = instance;

          // Attempt to sign up user.
          businessOwnerInstance.registerBusinessOwner(web3.fromUtf8(businessName), web3.fromUtf8(location), web3.fromUtf8(VATNumber), web3.fromUtf8(CE), {from: coinbase})
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
