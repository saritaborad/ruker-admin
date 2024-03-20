import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";
export interface rukkorStore {
  factorId: any;
  isResetPassword: any;
  isNewPassword: any;
  step: any;
  userDetail: any;
  isNavigatedFrom: any;
}
const initialState: rukkorStore = {
  factorId: [],
  isResetPassword: null,
  isNewPassword: null,
  step: null,
  userDetail: null,
  isNavigatedFrom: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    userFactorId: (state, action) => {
      state.factorId = [state.factorId, action.payload];
    },
    resetPassword: (state, action) => {
      state.isResetPassword = action.payload;
    },
    newPassword: (state, action) => {
      state.isNewPassword = action.payload;
    },
    newStep: (state, action) => {
      state.step = action.payload;
    },
    ActiveUser: (state, action) => {
      state.userDetail = action.payload;
    },
    NavigatedFrom: (state, action) => {
      state.isNavigatedFrom = action.payload;
    },
  },
});

export const selectFactorId: any = (state: RootState) => state.factorId;
export const selectResetPassword: any = (state: RootState) =>
  state.isResetPassword;
export const selectNewPassword: any = (state: RootState) => state.isNewPassword;
export const selectStep: any = (state: RootState) => state.step;
export const selectedUser: any = (state: RootState) => state.userDetail;
export const selectNavigatedFrom: any = (state: RootState) => state.isNavigatedFrom;


export const { userFactorId, resetPassword, newPassword, newStep, ActiveUser,NavigatedFrom } =
  adminSlice.actions;

export default adminSlice.reducer;
