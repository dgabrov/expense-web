import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Group} from "../data.ts";

export interface BusinessStore {
    version: string
    group: Group | null
}

const initialState : BusinessStore = {
    version: '',
    group: null
}

const setVersionImpl = (store: BusinessStore, data: PayloadAction<string>)=> {
    store.version = data.payload
}

const setGroupImpl = (store: BusinessStore, data: PayloadAction<Group>) => {
    store.group = data.payload
}

export const businessReducer = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setVersion: setVersionImpl,
        setGroup: setGroupImpl,
    }
})

export const {
    setVersion,
    setGroup
} = businessReducer.actions
