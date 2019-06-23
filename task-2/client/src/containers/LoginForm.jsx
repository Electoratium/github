import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from "@material-ui/core/styles/index";
import loginActions from "../actions/login";
import withUnauthorize from '../hoc/withUnauthorize';

const styles = (theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
});


class LoginForm extends PureComponent {
    login(e) {
        e.preventDefault();
        const {onLogin} = this.props,
            {resetFields} = this;

        let username = document.getElementById('email').value,
            password = document.getElementById('password').value,
            isRemember = document.getElementById('remember-checkbox').checked;


        onLogin({username, password, isRemember});
        resetFields();
    };
    resetFields() {
        let username = document.getElementById('email'),
            password = document.getElementById('password');

        username.value = '';
        password.value = '';
    };

    render () {
        const {classes} = this.props;

        return (
            <form className={classes.form} onSubmit={ this.login.bind(this)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" id="remember-checkbox"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                  Login
                </Button>
          </form>
        )
    }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    onLogin: (userData) => loginActions.login(userData),
  }, dispatch);
}

const connectedComponent = connect(
  null,
  matchDispatchToProps,
)(withStyles(styles)(LoginForm));


export default withUnauthorize(connectedComponent);