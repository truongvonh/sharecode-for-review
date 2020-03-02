import { AUTH_ACTION_TYPES } from 'constants/actionTypes';
import { User } from 'models/user';

const initialState = {
    user: null,
    authError: ''
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case AUTH_ACTION_TYPES.USER_INFO: {
            return {
                ...state,
                user: new User(action.payload)
            };
        }
        case AUTH_ACTION_TYPES.AUTH_ERROR: {
            return {
                ...state,
                authError: action.errorMessage
            };
        }
        case AUTH_ACTION_TYPES.CLEAR_AUTH_ERROR: {
            return {
                ...state,
                authError: initialState.authError
            };
        }
        case AUTH_ACTION_TYPES.UPDATE_USER_INFO: {
            return {
                ...state,
                user: new User(action.userInfo)
            };
        }
        case AUTH_ACTION_TYPES.LOGOUT:
            return initialState;
        default: return state;
    }
}
