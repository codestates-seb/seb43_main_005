import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../../api/apiUtil";
import { decodeToken } from "../../../hooks/decodeToken";

// ! Get user info
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const [_, userRole] = decodeToken();
    const userInfo = await getData("/members/info");
    return { userInfo: userInfo?.result, userRole };
  }
);

// ! Reducer
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    userRole: null,
    loading: false,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    clearUserInfo: state => {
      state.userInfo = null;
      state.userRole = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.userRole = action.payload.userRole;
      // state.loading = false;
    });
    builder.addCase(fetchUserInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setUserInfo, clearUserInfo, setLoading } = userSlice.actions;
export default userSlice.reducer;
