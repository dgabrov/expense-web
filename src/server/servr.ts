import {ServerMock} from "./server-mock.ts";
import type {Account, Category, CompleteGroup, Group, LoggedUser, LoginData, SearchData, Transaction} from "../data.ts";

export interface Servr {
    version: () => Promise<string>

    login: (login: LoginData) => Promise<LoggedUser>

    getAccounts: () => Promise<Account[]>
    addAccount: (account: Account) => Promise<void>
    updateAccount: (account: Account) => Promise<void>
    deleteAccounts: (ids: string[]) => Promise<void>

    getGroups: () => Promise<Group[]>
    addGroup: (group: Group) => Promise<void>
    updateGroup: (group: Group) => Promise<void>
    deleteGroups: (ids: string[]) => Promise<void>

    getCategories: (groupId: string) => Promise<Category[]>
    addCategory: (category: Category) => Promise<void>
    updateCategory: (category: Category) => Promise<void>
    deleteCategories: (ids: string[]) => Promise<void>

    deleteTransactions: (ids: string[]) => Promise<void>

    getCompleteGroups: () => Promise<CompleteGroup[]>

    getTransactionById: (id: string) => Promise<Transaction|null>
    searchTransactions: (search: SearchData) => Promise<Transaction[]>
    addTransaction: (transaction: Transaction) => Promise<void>
    updateTransaction: (transaction: Transaction) => Promise<void>

    logout(): Promise<void>;
}

const servr = new ServerMock()

export const getServr = () : Servr => {
    return servr;
}
