import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Group, Transaction} from "../data.ts";

export interface BusinessStore {
    version: string
    group: Group | null
    deleteTransactions: Transaction[]
}

const initialState : BusinessStore = {
    version: '',
    group: null,
    deleteTransactions: []
}

const setVersionImpl = (store: BusinessStore, data: PayloadAction<string>)=> {
    store.version = data.payload
}

const setGroupImpl = (store: BusinessStore, data: PayloadAction<Group>) => {
    store.group = data.payload
}

const setDeleteTransactionsImpl = (store: BusinessStore, data: PayloadAction<Transaction[]>)=> {
    store.deleteTransactions = data.payload
}

export const businessReducer = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setVersion: setVersionImpl,
        setGroup: setGroupImpl,
        setDeleteTransactions: setDeleteTransactionsImpl
    }
})

export const {
    setVersion,
    setGroup,
    setDeleteTransactions,
} = businessReducer.actions
