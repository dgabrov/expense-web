export interface ErrorMessage {
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

export interface CompleteGroup extends Group {
    categories: Category[]
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

export interface SearchData {
    search: string | null
    accountFilter: string | null
    dateFrom: Date | null
    dateTo: Date | null
    amountFrom: number | null
    amountTo: number | null
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

export interface EditTransaction {
    id: string
    adding: boolean
}

export interface DateFormat {
    languageValue: string
    displayValue: string
}

export interface Line {
    items: string[]
}
