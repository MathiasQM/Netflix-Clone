import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    id: string;
    user: User | null;
    isLoading: boolean;
  };
}

interface User {
  email: string;
  name: string;
}

const initialState: UserState = {
  value: {
    id: "",
    user: null,
    isLoading: true,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value.user = action.payload;
      state.value.isLoading = false;
    },
    clearUser: (state) => {
      state.value.user = null;
      state.value.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
