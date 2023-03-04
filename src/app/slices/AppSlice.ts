import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isLoading: true,
  userInfo: undefined,
  toasts: [],
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserStatus: (state, action: PayloadAction<{ email: string }>) => {
      state.userInfo = action.payload;
    },
    setToast: (state, action: PayloadAction<string>) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoading, setUserStatus, setToast, clearToasts } =
  AppSlice.actions;
