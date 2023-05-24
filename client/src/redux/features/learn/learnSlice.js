import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../../api/apiUtil";

export const fetchLearnCheck = createAsyncThunk(
  "learn/fetchLearnCheck",
  async courseId => {
    const apiUrl = `/contents/${courseId}/learns/learnChecks`;
    const { result } = await getData(apiUrl);
    return { learnChecks: result?.content };
  }
);

// fetchLearnItem({ learnId: learn, courseId: id })
export const fetchLearnItem = createAsyncThunk(
  "learn/fetchLearnItem",
  async ({ learnId, courseId }) => {
    const apiUrl = `/contents/${courseId}/learns/${learnId}`;
    const { result } = await getData(apiUrl);
    return { learnContent: result };
  }
);

// ! Reducer
const learnSlice = createSlice({
  name: "learn",
  initialState: {
    learnId: null,
    learnIndex: 0,
    learnContent: null,
    learnChecks: null,
    loading: false,
  },
  reducers: {
    setLearnId: (state, action) => {
      state.learnId = action.payload;
    },
    setLearnIndex: (state, action) => {
      state.learnIndex = action.payload;
    },
    setlearnContent: (state, action) => {
      state.learnContent = action.payload;
    },
    setLearnChecks: (state, action) => {
      state.learnChecks = action.payload;
    },
    setClear: state => {
      state.learnId = null;
      // state.learnIndex = 0;
      state.learnContent = null;
      state.learnChecks = null;
    },
  },
  extraReducers: builder => {
    // fetchLearnItem
    builder.addCase(fetchLearnItem.fulfilled, (state, action) => {
      state.learnContent = action.payload.learnContent;
      state.loading = false;
    });
    builder.addCase(fetchLearnItem.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchLearnItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // fetchLearnCheck
    builder.addCase(fetchLearnCheck.fulfilled, (state, action) => {
      state.learnChecks = action.payload.learnChecks;
      state.loading = false;
    });
    builder.addCase(fetchLearnCheck.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchLearnCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setLearnId, setLearnIndex, setlearnContent, setClear } =
  learnSlice.actions;
export default learnSlice.reducer;
