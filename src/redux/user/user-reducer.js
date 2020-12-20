import {UserActionTypes} from './user-types';

const INITIAL_STATE = {
    currentUser: null,
    userToken: 0,
    accessToken: null,
    user:null,
    routeName:'Home'

}
const userReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }

        case UserActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
        }

        // case UserActionTypes.SET_USER:
        //     return {
        //         ...state,
        //         currentUser: action.payload
        //     }

        case UserActionTypes.SET_USER_TOKEN:
            return {
                ...state,
                userToken: action.payload
            }
        
        case UserActionTypes.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }

        case UserActionTypes.SET_ROUTE_NAME:
            return {
                ...state,
                routeName: action.payload
            }
            
        default:
            return state;
    }

}

export default userReducer;