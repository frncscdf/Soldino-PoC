import React, { Component } from 'react'
import SignUpCitizenFormContainer from '../../ui/signupCitizenform/SignUpCitizenFormContainer'
import SignUpBusinessOwnerFormContaienr from "../../ui/signupBusinessOwnerform/SignUpBusinessOwnerFormContainer";

class SignUp extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
            <div className="pure-u-1-1">
                <h1>Sign Up as Citizen</h1>
                <p>We've got your wallet information, simply input your data and your citizen account is made!</p>
                <SignUpCitizenFormContainer />
            </div>
            <hr />
            <div className="pure-u-1-1">
                <h1>Sign Up as Business Owner</h1>
                <p>We've got your wallet information, simply input your data and your citizen account is made!</p>
                <SignUpBusinessOwnerFormContaienr />
            </div>
        </div>
      </main>
    )
  }
}

export default SignUp
