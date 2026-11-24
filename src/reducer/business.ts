import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {EditTransaction, Group, Transaction} from "../data.ts";

export interface BusinessStore {
    version: string
    group: Group | null
    deleteTransactions: Transaction[]
    editTransaction: EditTransaction
    transactions: Transaction[]
    assignTransactions: Transaction[]
    selected: string[]
}

const initialState : BusinessStore = {
    version: '',
    group: null,
    deleteTransactions: [],
    editTransaction: {adding: true, id: ''},
    transactions: [],
    assignTransactions: [],
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

const setAssignTransactionsImpl = (store: BusinessStore, data: PayloadAction<Transaction[]>) => {
    store.assignTransactions = data.payload
}

// sets the category of the transaction with the given id; an empty or null categoryId clears it
const setTransactionCategoryImpl = (store: BusinessStore, data: PayloadAction<{id: string, categoryId: string | null}>) => {
    const {id, categoryId} = data.payload

    store.transactions = store.transactions.map((txn) => txn.id === id ? {...txn, categoryId} : txn)
}

const addTransactionImpl = (store: BusinessStore, data: PayloadAction<Transaction>) => {
    store.transactions.push(data.payload)
}

const updateTransactionImpl = (store: BusinessStore, data: PayloadAction<Transaction>) => {
    const transaction = data.payload
    const id = transaction.id

    store.transactions = store.transactions.map((txn) => txn.id === id ? transaction : txn)
}

const deleteTransactionsImpl = (store: BusinessStore, data: PayloadAction<string[]>) => {
    const ids = data.payload

    store.transactions = store.transactions.filter((txn) => !ids.includes(txn.id))
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
        setAssignTransactions: setAssignTransactionsImpl,
        setTransactionCategory: setTransactionCategoryImpl,
        addTransaction: addTransactionImpl,
        updateTransaction: updateTransactionImpl,
        deleteTransactions: deleteTransactionsImpl,
        setSelectedTransactions: setSelectedTransactionsImpl

    }
})

export const {
    setVersion,
    setGroup,
    setDeleteTransactions,
    setEditTransaction,
    setTransactions,
    setAssignTransactions,
    setTransactionCategory,
    addTransaction,
    updateTransaction,
    deleteTransactions,
    setSelectedTransactions
} = businessReducer.actions
