import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {EditTransaction, Group, Transaction} from "../data.ts";

export interface BusinessStore {
    version: string
    group: Group | null
    deleteTransactions: Transaction[]
    editTransaction: EditTransaction
    transactions: Transaction[]
    selected: string[]
}

const initialState : BusinessStore = {
    version: '',
    group: null,
    deleteTransactions: [],
    editTransaction: {adding: true, id: ''},
    transactions: [],
    selected: []
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

const setTransactionsImpl = (store: BusinessStore, data: PayloadAction<Transaction[]>) => {
    store.transactions = data.payload
}

const addTransactionImpl = (store: BusinessStore, data: PayloadAction<Transaction>) => {
    store.transactions.push(data.payload)
}

const updateTransactionImpl = (store: BusinessStore, data: PayloadAction<Transaction>) => {
    const transaction = data.payload
    const id = transaction.id

    store.transactions = store.transactions.map((txn) => txn.id === id ? transaction : txn)
}

const deleteTransactionImpl = (store: BusinessStore, data: PayloadAction<string>) => {
    const id = data.payload

    store.transactions = store.transactions.filter((txn) => txn.id !== id)
}

const setSelectedTransactionsImpl = (store: BusinessStore, data: PayloadAction<string[]>)=> {
    store.selected = data.payload
}

export const businessReducer = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setVersion: setVersionImpl,
        setGroup: setGroupImpl,
        setDeleteTransactions: setDeleteTransactionsImpl,
        setEditTransaction: setEditTransactionImpl,
        setTransactions: setTransactionsImpl,
        addTransaction: addTransactionImpl,
        updateTransaction: updateTransactionImpl,
        deleteTransaction: deleteTransactionImpl,
        setSelectedTransactions: setSelectedTransactionsImpl

    }
})

export const {
    setVersion,
    setGroup,
    setDeleteTransactions,
    setEditTransaction,
    setTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setSelectedTransactions
} = businessReducer.actions
