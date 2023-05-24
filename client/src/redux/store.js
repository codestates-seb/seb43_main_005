import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import learnSlice from "./features/user/learnSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    learn: learnSlice,
  },
});
