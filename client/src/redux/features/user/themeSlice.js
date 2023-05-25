import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "defaultLight",
    isServerThemeLoaded: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
      state.isServerThemeLoaded = true;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
