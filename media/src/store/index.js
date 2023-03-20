import {configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "./slices/UsersList";

export const store = configureStore({
    reducer:{
        users: usersReducer
    }
});
