export interface ErrorMessage {
    code: string
    message: string
    date: number
}

export interface Account {
    id: string
    name: string
    cash: boolean
}

export interface Group {
    id: string
    name: string
}

export interface Category {
    id: string
    groupId: string
    name: string
}

export interface LoginData {
    login: string
    password: string
}

export interface LoggedUser {
    login: string
    name: string
    id: string
}

export interface Transaction {
    id: string
    name: string
    date: Date
    amount: number
    accountId: string
    categoryId: string | null
}

export const Location = {
    login: "login",
    accounts: "accounts",
    cash: "cash",
    categories: "categories",
    groups: "groups",
    cDelTransaction: "cDelTransaction",
    csv: "csv",
    editTransaction: "editTransaction",
    reports: "reports",
    transactions: "transactions"
}

