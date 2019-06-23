import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import loginActions from "../actions/login";

class User extends PureComponent {
    logout(e) {
        e.preventDefault();
        this.props.onLogout();
    }
    render () {
        const {login} = this.props,
            {logout} = this;

        return (
            <Paper>
                <Typography variant="h4" component="h3">
                  Hi, {login.username}
                </Typography>
                <Link onClick={logout.bind(this)}>
                  Logout
                </Link>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
	return {
		login: state.login,
	};
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		onLogout: loginActions.logout,
	}, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(User);



