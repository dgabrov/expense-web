import {type ErrorMessage, Location, type LoggedUser} from "../data.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface HeaderStore {
    loggedUser: LoggedUser | null
    location: string
    errors: ErrorMessage[]
}

const initialState : HeaderStore = {
    loggedUser: null,
    location: Location.login,
    errors: []
}

const locationImpl = (store: HeaderStore, data: PayloadAction<string>)=> {
    store.location = data.payload;
}

const clearImpl = (): HeaderStore => {
    return {...initialState}
}

const loggedUserImpl = (store: HeaderStore, data: PayloadAction<LoggedUser | null>) => {
    store.loggedUser = data.payload;
    store.location = data.payload === null ? Location.login : Location.transactions;
}

export const headerReducer = createSlice({
    name: 'header',
    initialState,
    reducers: {
        location: locationImpl,
        clear: clearImpl,
        loggedUser: loggedUserImpl
    }
})

export const {
    location,
    clear,
    loggedUser
} = headerReducer.actions

