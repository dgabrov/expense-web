import {ServerMock} from "./server-mock.ts";
import type {Account, Category, CompleteGroup, Group} from "../data.ts";

export interface Servr {
    version: () => Promise<string>
    getAccounts: () => Promise<Account[]>
    addAccount: (account: Account) => Promise<void>
    updateAccount: (account: Account) => Promise<void>

    getGroups: () => Promise<Group[]>
    addGroup: (group: Group) => Promise<void>
    updateGroup: (group: Group) => Promise<void>

    getCategories: (groupId: string) => Promise<Category[]>
    addCategory: (category: Category) => Promise<void>
    updateCategory: (category: Category) => Promise<void>

    getCompleteGroups: () => Promise<CompleteGroup[]>
}

const servr = new ServerMock()

export const getServr = () : Servr => {
    return servr;
}
