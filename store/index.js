// import { configureStore } from "@reduxjs/toolkit";
// import searchReducer from "./searchSlice";

// export const store = configureStore({
//   reducer: {
//     search: searchReducer,
//   },
// });

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["search"], // ONLY persist search data
};

const rootReducer = combineReducers({
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
