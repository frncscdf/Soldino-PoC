import { connect } from 'react-redux'
import OperationsForm from './OperationsForm'
import { mintCubit, distributeCubit } from './OperationsFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    amountMint: state.amountMint,
    amountDist: state.amountDist
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMintFormSubmit: (amountMint) => {
      //event.preventDefault();

      dispatch(mintCubit(amountMint))
    },
    onDistributeFormSubmit: (amountDist) => {
      //event.preventDefault();

      dispatch(distributeCubit(amountDist))
    }
  }
};

const OperationsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationsForm);

export default OperationsFormContainer
