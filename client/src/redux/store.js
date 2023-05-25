import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
<<<<<<< HEAD
import learnSlice from "./features/user/learnSlice";
import themeSlice from "./features/user/themeSlice";
=======
import learnSlice from "./features/learn/learnSlice";
>>>>>>> bf77eb9d44c2e7f110bbb711ae2bcf61dba4b624

export default configureStore({
  reducer: {
    user: userSlice,
    learn: learnSlice,
    theme: themeSlice,
  },
});
