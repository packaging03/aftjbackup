import {UserActionTypes} from './user-types';

export const setCurrentUser = user => ({
    type:UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const setUserToken = token => ({
    type: UserActionTypes.SET_USER_TOKEN,
    payload: token
});

export const setUser = token => ({
    type: UserActionTypes.SET_USER,
    payload: token
});

export const setAccessToken = token => ({
    type: UserActionTypes.SET_ACCESS_TOKEN,
    payload: token
});

export const setRouteName = token => ({
    type: UserActionTypes.SET_ROUTE_NAME,
    payload: token
});

export const setLogoutUser = token => ({
    type: UserActionTypes.SET_LOGOUT_USER,
    payload: token
});

