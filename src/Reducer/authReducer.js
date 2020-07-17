const initialState = {
    isAuthenticated: false,
    isUserLoginLoading: false,
    user: {},
    hasRole: "",
    data: {},
    isSigningUpLoading: false

};

export default function (state = initialState, action) {
    switch (action.type) {
        case authConstants.USER_LOGIN_REQUEST:
            return {
                ...state, isUserLoginLoading: true
            }
        case authConstants.USER_LOGIN_SUCCESS:
            const data = action.data
            return { ...state, data, isUserLoginLoading: false }
        case authConstants.USER_LOGIN_FAILURE:
            let error = action.payload;
            return { ...state, isUserLoginLoading: false, error }
        case SET_CURRENT_USER:
            return {
                ...state, isAuthenticated: !isEmpty(action.payload), user: action.payload
            };
        case authConstants.USER_SIGN_UP_REQUEST:
            return {
                ...state, isSigningUpLoading: true
            }
        case authConstants.USER_SIGN_UP_SUCCESS:
            return { ...state, isSigningUpLoading: false }
        case authConstants.USER_SIGN_UP_FAILURE:
            {
                let error = action.payload;
                return { ...state, isSigningUpLoading: false, error }
            }
        default:
            return state;
    }
}