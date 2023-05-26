import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import learnSlice from "./features/learn/learnSlice";
import themeSlice from "./features/theme/themeSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    learn: learnSlice,
    theme: themeSlice,
  },
});
