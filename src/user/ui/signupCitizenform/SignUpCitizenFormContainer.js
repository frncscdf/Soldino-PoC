import { connect } from 'react-redux'
import SignUpCitizenForm from './SignUpCitizenForm'
import { signUpUser } from './SignUpCitizenFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpCitizenFormSubmit: (name, surname, fiscalCode, email) => {
      dispatch(signUpUser(name, surname, fiscalCode, email))
    }
  }
};

const SignUpCitizenFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpCitizenForm);

export default SignUpCitizenFormContainer
