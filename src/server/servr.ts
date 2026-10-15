import {ServerMock} from "./server-mock.ts";
import type {Account, Category, Group} from "../data.ts";

export interface Servr {
    version: () => string
    getAccounts: () => Account[]
    addAccount: (account: Account) => void
    updateAccount: (account: Account) => void

    getGroups: () => Group[]
    addGroup: (group: Group) => void
    updateGroup: (group: Group) => void

    getCategories: () => Category[]
    addCategory: (category: Category) => void
    updateCategory: (category: Category) => void


}

const servr = new ServerMock()

export const getServr = () : Servr => {
    return servr;
}
