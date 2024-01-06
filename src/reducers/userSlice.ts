import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDatabase } from "../schemas/db";

interface User {
  id?: string;
  username: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: true,
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    const db = await getDatabase();
    const usersCollection = db.users;

    const userId = localStorage.getItem("user_id");

    const user = await usersCollection.findOne({
      selector: {
        id: Number(userId),
      },
    }).exec();

    return user.toJSON();
  }
);

export const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setUserDetails } = userSlice.actions;

export const getUserDetails = (state: RootState) => state.user.user;

export const isUserLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
