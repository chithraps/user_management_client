import { setUser,setAccessToken,logout } from "./UserSlices";

// Action for setting the user and access token
export const login = (user, accessToken) => (dispatch) => {
  dispatch(setUser(user));
  dispatch(setAccessToken(accessToken));
};

// Action for logging out
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
