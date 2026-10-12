import {configureStore} from "@reduxjs/toolkit";
import {headerReducer} from "./header.ts";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        header: headerReducer.reducer
    }
})

// Add these two lines at the bottom:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

