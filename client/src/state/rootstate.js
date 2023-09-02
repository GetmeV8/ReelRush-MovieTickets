const RootState = {
    user: {
      mode: "light",
      user: null,
      token: null,
      movies: [],
      date: null,
      selectedMovie: null,
      setBookedDetails: null,
      getSeatInformation: null,
      wishlist: [],
      isloading: false,
    },
    admin: {
      mode: "light",
      admin: null,
      token: null,
      count: [],
      posts: []
    },
    theater: {
      mode: "light",
      theater: null,
      token: null,
      count: [],
    },
  };
  
  module.exports = RootState;
  