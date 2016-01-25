import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,

    LOGOUT_SUCCESS,
    LOGOUT_FAILURE } from '../constants/ActionTypes';

import redirectBackAfter from '../utils/redirectBackAfter';
import axios from 'axios';


const baseUrl = 'http://localhost:7000/api';

// TODO: решить вопрос с переходом при авторизации
export function login(username, password, router) {
  return async (dispatch) => {
    try {
          const { data: { success, message, token } } = await axios.post(`${baseUrl}/login`, {
            username,
            password
          });

          if (success === true) {
                // Сохраняем в Session storage
                if(token !== 'undefined') {
                    sessionStorage.setItem('token',token);
                }

                dispatch({ type: LOGIN_SUCCESS, token: token });
                //Временная переадресация при логине
                const { query } = router.state.location;
                const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/home';
                router.transitionTo(redirectTo);
            }
            else{
                dispatch({ type: LOGIN_FAILURE, error:message});
            }

        }
        catch (e) {
            dispatch({ type: LOGIN_FAILURE, error: e.data.message});
        }

    }
}


export function logout(router) {
    return async(dispatch) => {

        try {
            const { data:{ success }} = await axios.get(`${baseUrl}/logout`,{
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            sessionStorage.removeItem('token');

            dispatch({ type: LOGOUT_SUCCESS});

            router.transitionTo(...redirectBackAfter('/login', router.state));
        }
        catch (e) {
            dispatch({ type: LOGOUT_FAILURE});
        }
    }
}