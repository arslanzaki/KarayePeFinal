import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  ads: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setAds: (state, action) => {
      state.ads = action.payload.ads;
    },
    setProfilePicture: (state, action) => {
      state.user.picturePath = action.payload;
    },
    setMode: (state, action) => {
      state.user.accountType = action.payload;
    },
    // setFavourites: (state, action) => {
    //   state.user.favouriteAds.push(action.payload);
    // },
    // removeFavourites: (state, action) => {
    //   state.user.favouriteAds = state.user.favouriteAds.filter((item) => {
    //     return item !== action.payload;
    //   });
    //},
  },
});

export const { setLogin, setLogout, setAds, setProfilePicture, setMode } =
  authSlice.actions;
export default authSlice.reducer;
