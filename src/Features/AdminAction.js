import { setAdmin,setAdminAccessToken,logoutAdmin } from "./AdminSlice";

export const loginAdmin = (admin, adminAccessToken) => (dispatch) => {
    dispatch(setAdmin(admin));
    dispatch(setAdminAccessToken(adminAccessToken));
  };
  
  export const logoutAdminUser = () => (dispatch) => {
    dispatch(logoutAdmin());
  };