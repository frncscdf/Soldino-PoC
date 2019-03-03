import { connect } from 'react-redux'
import SignUpBusinessOwnerForm from './SignUpBusinessOwnerForm'
import { signUpUser } from './SignUpBusinessOwnerFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpBusinessOwnerFormSubmit: (businessName, location, VATNumber, CE) => {
      dispatch(signUpUser(businessName, location, VATNumber, CE))
    }
  }
};

const SignUpBusinessOwnerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpBusinessOwnerForm);

export default SignUpBusinessOwnerFormContainer
