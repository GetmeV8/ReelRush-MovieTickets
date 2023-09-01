import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  movies: [],
  date: null,
  selectedMovie: null,
  setBookedDetails: null,
  getSeatInformation: null,
  wishlist:[],
  isloading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      if (user && user.wishlist) {
        state.wishlist = user.wishlist;
      }
    },
    
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
   
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
   
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload.searchKey;
    },
    setMovies: (state, action) => {
      state.movies = action.payload.movies;
    },
    setOtp: (state, action) => {
      state.otp = action.payload.otp;
    },
    setTempemail: (state, action) => {
      state.tempemail = action.payload.tempemail;
    },
    setDates:(state, action) => {
      state.date = action.payload.date;
    },
    handleSelectDate: (state, action) => {
      state.date = action.payload.date;
      state.day = action.payload.day;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload.wishlist;
    },
    showLoading: (state) => {
      state.isloading = true;
    },
    hideLoading: (state) => {
      state.isloading = false;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setToken,
  setPosts,
  setPost,
  setUser,
  setMovie,
  setSearchKey,
  setMovies,
  setOtp,
  setTempemail,
  setDates,
  handleSelectDate,
  setWishlist,
  showLoading,
  hideLoading,
} = authSlice.actions;
export default authSlice.reducer;