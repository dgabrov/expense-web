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
    // calendar date as "YYYY-MM-DD"
    date: string
    amount: number
    accountId: string
    categoryId: string | null
}

export interface SearchData {
    search: string | null
    accountFilter: string | null
    dateFrom: string | null
    dateTo: string | null
    amountFrom: number | null
    amountTo: number | null
}

export const Location = {
    login: "login",
    accounts: "accounts",
    assign: "assign",
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

export interface CsvLine {
    id: string
    payload: string[]
}
