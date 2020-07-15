// Register
export const registerUser = (userData) => dispatch => {
    dispatch({type: authConstants.USER_SIGN_UP_REQUEST})
    API.post("users", userData)
      .then(result => {
        let data = result.data
        dispatch({type: authConstants.USER_SIGN_UP_SUCCESS, data})
        history.push(routes.USER_AVATAR);
      })
      .catch(err => {
        dispatch({ type: authConstants.USER_SIGN_UP_FAILURE, payload: err.response.data });
      });
  };

  export const loginUser = (userData) => dispatch => {
    dispatch({type: authConstants.USER_LOGIN_REQUEST})
    API.post("api/login", userData)
      .then(result => {
        // SAVE to local storage
        const data = result.data;
        const token = data.token;
        // Set token to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("name",data.displayName);
        localStorage.setItem("avatar",data.avatar);
        // // Set Token to Auth Header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // // Set Current User
        dispatch(setCurrentUser(decoded));
        dispatch({type: authConstants.USER_LOGIN_SUCCESS, data})
        history.push(routes.MY_ACCOUNT);
      }).catch((err) => {
        dispatch({ type: authConstants.USER_LOGIN_FAILURE, payload: err.response.data });
      })}

  // Set loggedin users
  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

  // Log user out
  export const logoutUser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem("token");
    // remove Auth header
    setAuthToken(false);
    // Set current user to {} which will also set isAuthenticated to false
    dispatch(setCurrentUser({}));
    history.push(routes.LOGIN);
  };

  // Reset password

  export const forgotPassword = (userData, history) => dispatch => {
    API.post("/api/forgot-password", userData)
      .then(result => {
        history.push("/reset-password");
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  };
  export const resetPassword = (userData, history) => dispatch => {
    API.post("/api/reset-password", userData)
      .then(result => {
        history.push("/");
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  };

  export const updateUser = (userData) => dispatch => {
    dispatch({type: authConstants.USER_UPDATE_REQUEST, payload: userData})
    API.put("/api/users/" + localStorage.user_id, userData)
      .then(result => {
        dispatch({type: authConstants.USER_UPDATE_SUCCESS, payload: result.data})
        history.push(routes.MY_ACCOUNT);
      })
      .catch(err => {
        dispatch({ type: authConstants.USER_UPDATE_FAILURE, payload: err.response.data });
      });
  };