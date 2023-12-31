import { createReducer, on } from "@ngrx/store";
import { getUser, setUser } from "../actions/user.actions";

export const userStore = JSON.parse(localStorage.getItem('user') || '') || {};

export const userReducer = createReducer(
    userStore,
    on(setUser, (state: any, action: any) => {
        console.log(action.user);
        localStorage.setItem('user', JSON.stringify(action.user))
        return {
            ...state,
            user: action.user
        }
    }),
    on(getUser, (state) => state)
);