import React, { PureComponent} from 'react';
import { Redirect } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loginActions from "../actions/login";

function withAuth(WrappedComponent) {
  return class extends PureComponent {
    render() {
        const {props} = this;

        if(!props.login.access_token) {
            props.onAccessError('You have to authorize before access to this page!');
            return <Redirect to="/" />;
        }

        return (<WrappedComponent {...props} />);
    }
  };
}
function mapStateToProps(state) {
  return {
    login: state.login
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		onAccessError: (errorMessage) => loginActions.accessError(errorMessage),
	}, dispatch);
}

const composedWrapper = compose(
    connect(mapStateToProps, matchDispatchToProps),
    withAuth
);

export default composedWrapper;