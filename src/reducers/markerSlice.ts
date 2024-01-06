import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDatabase } from "../schemas/db";
import {
  ChecklistInterface,
  CustomMarkerInterface,
  ItemDetail,
} from "../interfaces/marker";
import { RxDocument } from "rxdb";

export interface MarkerState {
  markers: CustomMarkerInterface[];
  marker: CustomMarkerInterface | null;
  checklists: ChecklistInterface[];
  isLoading: boolean;
}

const initialState: MarkerState = {
  markers: [],
  checklists: [],
  marker: null,
  isLoading: true,
};

export const fetchMarkerDetails = createAsyncThunk(
  "marker/fetchMarkers",
  async () => {
    const db = await getDatabase();
    const usersCollection = db.users;
    const markersCollection = db.markers;

    const userId = localStorage.getItem("user_id");

    const query = usersCollection.findOne({
      selector: {
        id: Number(userId),
      },
    });

    const user = await query.exec();

    const markerQuery = markersCollection.find({
      selector: {
        createdBy: user.username,
      },
    });

    const markers = await markerQuery.exec();

    return markers.map((marker: RxDocument) => marker.toJSON());
  }
);

export const fetchMarkerById = createAsyncThunk(
  "marker/fetchMarkerById",
  async (id: number) => {
    const db = await getDatabase();
    const markersCollection = db.markers;
    const usersCollection = db.users;
    const checklistsCollection = db.checklists;

    const userId = localStorage.getItem('user_id')

    const userDocument = await usersCollection
      .findOne({
        selector: {
          id: Number(userId),
        },
      })
      .exec();

    const markerDocument = await markersCollection
      .findOne({
        selector: {
          id,
          createdBy: userDocument.username
        },
      })
      .exec();

    
    if (!markerDocument) {
      return
    }

    const marker = markerDocument?.toJSON();

    const checklists = await checklistsCollection
      .find({
        selector: {
          marker_id: marker.id.toString(),
        },
      })
      .exec();

    return {
      marker,
      checklists: checklists.map((checklist: RxDocument) => ({
        ...checklist.toJSON(),
        markerName: marker.name,
      })),
    };
  }
);

export const markerSlice = createSlice({
  name: "markerDetails",
  initialState,
  reducers: {
    setMarkers: (state, action: PayloadAction<CustomMarkerInterface>) => {
      state.markers = [...state.markers, action.payload];
    },
    setChecklists: (state, action: PayloadAction<ChecklistInterface[]>) => {
      state.checklists = action.payload;
    },
    setChecklistItem: (
      state,
      action: PayloadAction<{ newItem: ItemDetail; checklistIndex: number }>
    ) => {
      const { newItem, checklistIndex } = action.payload;

      const updatedChecklists = [...state.checklists];

      updatedChecklists[checklistIndex].items?.push(newItem);

      state.checklists = updatedChecklists;
    },
    setChecklistItemStatus: (
      state,
      action: PayloadAction<{
        itemIndex: number;
        checklistIndex: number;
        itemStatus: "blocked" | "notApplicable" | "completed" | "empty";
      }>
    ) => {
      const updatedChecklists = [...state.checklists];

      const { itemIndex, checklistIndex, itemStatus } = action.payload;
      const clickedItem =
        updatedChecklists[checklistIndex].items?.at(itemIndex);

      clickedItem!.status = itemStatus;

      clickedItem!.descriptionStatus = itemStatus as
        | "blocked"
        | "info"
        | "completed"
        | "warning"
        | "empty";
      const items = updatedChecklists[checklistIndex].items!;
      items[itemIndex] = clickedItem!;

      updatedChecklists[checklistIndex].items = items;

      state.checklists = updatedChecklists;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkerDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMarkerDetails.fulfilled, (state, action) => {
        state.markers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMarkerDetails.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchMarkerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMarkerById.fulfilled, (state, action) => {
        const { checklists, marker } = action.payload || {};

        state.checklists = checklists || [];
        state.marker = marker;
        state.isLoading = false;
      })
      .addCase(fetchMarkerById.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  setMarkers,
  setChecklists,
  setChecklistItem,
  setChecklistItemStatus,
} = markerSlice.actions;

export const getMarkersByUser = (state: RootState) =>
  state.markers.markers || [];
export const getMarkerDetails = (state: RootState) => state.markers.marker;
export const getChecklistsByUser = (state: RootState) =>
  state.markers.checklists || [];
export const isMarkerLoading = (state: RootState) => state.markers.isLoading;

export default markerSlice.reducer;
