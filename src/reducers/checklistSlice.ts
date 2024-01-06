import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDatabase } from "../schemas/db";
import { ChecklistInterface } from "../interfaces/marker";

export interface CheckListState {
  checklists: ChecklistInterface[];
  isLoading: boolean;
}

const initialState: CheckListState = {
  checklists: [],
  isLoading: true,
};

export const fetchCheckListByMarkerId = createAsyncThunk(
  "marker/fetchCheckLists",
  async (id) => {
    const db = await getDatabase();
    const checklistsCollection = db.checklists;

    const marker = await checklistsCollection.findOne({
      selector: {
        markerId: id
      }
    }).exec();

    return marker.toJSON();
  }
);

export const markerSlice = createSlice({
  name: "markerDetails",
  initialState,
  reducers: {
    setCheckLists: (state, action: PayloadAction<ChecklistInterface>) => {
      state.checklists = [...state.checklists, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckListByMarkerId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCheckListByMarkerId.fulfilled, (state, action) => {
        state.checklists = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCheckListByMarkerId.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCheckLists } = markerSlice.actions;

export const getCheckListsByUser = (state: RootState) => state.markers.checklists || [];

export const isCheckListLoading = (state: RootState) => state.markers.isLoading;

export default markerSlice.reducer;
