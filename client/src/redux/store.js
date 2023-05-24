import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import learnSlice from "./features/learn/learnSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    learn: learnSlice,
  },
});
