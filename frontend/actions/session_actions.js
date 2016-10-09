export const SessionConstants = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
  RECEIVE_CURRENT_USER: "RECEIVE_CURRENT_USER",
  RECEIVE_ERRORS: "RECEIVE_ERRORS",
  EMPTY_ERRORS: "EMPTY_ERRORS"
};

export const signup = (user, success) => ({
  type: SessionConstants.SIGNUP,
  user,
  success
});

export const login = (user, success) => ({
  type: SessionConstants.LOGIN,
  user,
  success
});

export const logout = () => ({
  type: SessionConstants.LOGOUT
});

export const receiveCurrentUser = (currentUser, success) => ({
  type: SessionConstants.RECEIVE_CURRENT_USER,
  currentUser,
  success
});

export const receiveErrors = errors => ({
  type: SessionConstants.RECEIVE_ERRORS,
  errors
});

export const emptyErrors = () => ({
  type: SessionConstants.EMPTY_ERRORS
});
