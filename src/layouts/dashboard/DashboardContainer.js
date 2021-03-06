import { connect } from 'react-redux'
import Dashboard from './Dashboard'

const mapStateToProps = (state) => {
    return {
        authData: state.user.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer
