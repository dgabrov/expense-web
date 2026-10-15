import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface BusinessStore {
    version: string
}

const initialState : BusinessStore = {
    version: ''
}

const setVersionImpl = (store: BusinessStore, data: PayloadAction<string>)=> {
    store.version = data.payload
}

export const businessReducer = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setVersion: setVersionImpl,
    }
})

export const {
    setVersion,
} = businessReducer.actions
