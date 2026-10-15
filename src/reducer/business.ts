import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {EditTransaction, Group, Transaction} from "../data.ts";

export interface BusinessStore {
    version: string
    group: Group | null
    deleteTransactions: Transaction[]
    editTransaction: EditTransaction
}

const initialState : BusinessStore = {
    version: '',
    group: null,
    deleteTransactions: [],
    editTransaction: {adding: true, id: ''}
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

const setEditTransactionImpl = (store: BusinessStore, data: PayloadAction<EditTransaction>)=> {
    store.editTransaction = data.payload
}

export const businessReducer = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setVersion: setVersionImpl,
        setGroup: setGroupImpl,
        setDeleteTransactions: setDeleteTransactionsImpl,
        setEditTransaction: setEditTransactionImpl
    }
})

export const {
    setVersion,
    setGroup,
    setDeleteTransactions,
    setEditTransaction
} = businessReducer.actions
