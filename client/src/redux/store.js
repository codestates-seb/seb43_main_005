import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import alertSlice from "./features/alert/alertSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
  },
});
