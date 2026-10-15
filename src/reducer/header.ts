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

const addErrorImpl = (store: HeaderStore, data: PayloadAction<string>) => {
    const message = data.payload
    const date = Date.now()

    store.errors.push({date, message})
}

const filterExpiredErrorsImpl = (store: HeaderStore) => {
    const minimumPastDate= Date.now() - 3000

    store.errors = store.errors.filter((error) => error.date > minimumPastDate)
}

export const headerReducer = createSlice({
    name: 'header',
    initialState,
    reducers: {
        location: locationImpl,
        clear: clearImpl,
        loggedUser: loggedUserImpl,
        addError: addErrorImpl,
        filterExpiredErrors: filterExpiredErrorsImpl,
    }
})

export const {
    location,
    clear,
    loggedUser,
    addError,
    filterExpiredErrors,
} = headerReducer.actions

