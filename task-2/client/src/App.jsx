import React, { PureComponent, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from './history/history';
import loginActions from './actions/login';
import SnackBar from './components/SnackBar';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';

class App extends PureComponent {
  constructor (props) {
    super(props);
    const { onCheckToken } = this.props;

    onCheckToken();
  }
  render () {
    const {login} = this.props;

    return (
      <Router history={history}>
        <Fragment>
          { login.error && <SnackBar message={login.error} /> }
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />

            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
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
    onCheckToken: () => loginActions.checkToken(),
  }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(App);
