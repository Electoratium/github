import Axios from 'axios';
import {cookies} from '../utils/manageCookies'
import history from '../history/history';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGOUT = 'LOGOUT';

const baseApiUrl = 'http://127.0.0.1:8000/api',
    authData = {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        grant_type: "password",
    },
    settings = {
        headers: {"Access-Control-Allow-Origin": "*"}
    };

const invalidCredentialStatus = 401,
    invalidCredential = 'Sorry you entered incorrect data',
    serverError = 'Ooops something with server. Try again!';

const checkToken = () => {
    const sessionToken = sessionStorage.getItem('token'),
        cookieToken = cookies.get('token'),
        sessionUsername = sessionStorage.getItem('username'),
        cookieUsername = cookies.get('username'),
        token = sessionToken || cookieToken,
        username = sessionUsername || cookieUsername;

    return (dispatch) => {
        if(token) {
            dispatch({
                type: CHECK_TOKEN,
                payload: {
                    access_token: token,
                    username
                }
            });
        }
    };
};


const login = (loginData) => {
    return (dispatch) => {
        const dataToSend = {
            ...loginData,
            ...authData
        };

        Axios.post(
            `${baseApiUrl}/oauth/token`, dataToSend, settings)
            .then( (response) => {
                const {access_token, expires_in} = response.data;

                // set access token to cookies & local storage
                if(loginData.isRemember) {
                    cookies.set('token', access_token, expires_in);
                    cookies.set('username', loginData.username, expires_in);
                }

                sessionStorage.setItem('token', access_token);
                sessionStorage.setItem('username', loginData.username);

                history.push('/home');

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        username: loginData.username,
                        access_token
                    }
                });
            })
            .catch( (err) => {
                let errorText = err.response.status === invalidCredentialStatus ?
                    invalidCredential :
                    serverError;

                dispatch({
                    type: AUTH_ERROR,
                    payload: {
                        message: errorText
                    }
                })

            })
    };
};
const accessError = (errorMessage) => {
    return (dispatch) => {
        dispatch({
            type: AUTH_ERROR,
            payload: {
                message: errorMessage
            }
        });
    }
};

const logout = () => {
    cookies.delete('token');
    cookies.delete('username');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');

    history.push('/');

    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
    };
};

export default {
    login,
    checkToken,
    accessError,
    logout
};
