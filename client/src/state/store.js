import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";

// Import your user, admin, and theater reducers
import userSlice from "./user/userSlice";
import adminSlice from "./admin/adminSlice";
import theaterSlice from "./theater/theaterSlice";

const rootReducer = combineReducers({
  user: userSlice,
  admin: adminSlice,
  theater: theaterSlice,
});

const persistConfig = {
  key: "root", // Change the key to root
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
