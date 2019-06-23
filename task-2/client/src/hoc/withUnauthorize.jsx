import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

function withUnauthorize(WrappedComponent) {
  return class extends PureComponent {
    render() {
        const {props} = this;

        if(props.login.access_token) {
            return <Redirect to="home" />
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

const composedWrapper = compose(
    connect(mapStateToProps, null),
    withUnauthorize
);

export default composedWrapper;