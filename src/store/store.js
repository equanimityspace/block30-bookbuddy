import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { registerReducer, loginReducer } from "../app/tokenSlice";
import api from "../api/api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: registerReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

// setupListeners(store.dispatch);

export default store;
