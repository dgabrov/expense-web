import type {Servr} from "./servr.ts";
import type {Account, Category, CompleteGroup, Group, LoggedUser, LoginData, Transaction} from "../data.ts";

// Mock ids are v7-shaped guids, hardcoded so they stay stable between reloads
const accounts: Account[] = [
    {id: "0190a1f2-3b4c-7d5e-8f60-1a2b3c4d5e01", name: "Credit card", cash: false},
    {id: "0190a1f2-7e8f-7a9b-9c0d-2e3f4a5b6c02", name: "Debit card", cash: false},
    {id: "0190a1f3-1d2e-7f30-a142-3b4c5d6e7f03", name: "Mastercard", cash: false},
]

const groups: Group[] = [
    {id: "0190a1f3-5a6b-7c7d-8e8f-4a5b6c7d8e11", name: "Food"},
    {id: "0190a1f3-9b0c-7d1e-9f2a-5b6c7d8e9f12", name: "Transport"},
    {id: "0190a1f3-d3e4-7f5a-a061-6c7d8e9f0a13", name: "Housing"},
    {id: "0190a1f4-1f2a-7b6c-b172-7d8e9f0a1b14", name: "Entertainment"},
]

const categories: Category[] = [
    {id: "0190a1f4-3c4d-7e7f-8283-8e9f0a1b2c21", groupId: "0190a1f3-5a6b-7c7d-8e8f-4a5b6c7d8e11", name: "Groceries"},
    {id: "0190a1f4-5e6f-7a8b-9c0d-9f0a1b2c3d22", groupId: "0190a1f3-5a6b-7c7d-8e8f-4a5b6c7d8e11", name: "Restaurants"},
    {id: "0190a1f4-7a8b-7c9d-8e0f-0a1b2c3d4e23", groupId: "0190a1f3-5a6b-7c7d-8e8f-4a5b6c7d8e11", name: "Other"},
    {id: "0190a1f4-9c0d-7e1f-9a2b-1b2c3d4e5f31", groupId: "0190a1f3-9b0c-7d1e-9f2a-5b6c7d8e9f12", name: "Fuel"},
    {id: "0190a1f4-b1c2-7f3a-8b4c-2c3d4e5f6a32", groupId: "0190a1f3-9b0c-7d1e-9f2a-5b6c7d8e9f12", name: "Public transport"},
    {id: "0190a1f4-d3e4-7a5b-9c6d-3d4e5f6a7b33", groupId: "0190a1f3-9b0c-7d1e-9f2a-5b6c7d8e9f12", name: "Other"},
    {id: "0190a1f4-f5a6-7b7c-8d8e-4e5f6a7b8c41", groupId: "0190a1f3-d3e4-7f5a-a061-6c7d8e9f0a13", name: "Rent"},
    {id: "0190a1f5-0b7c-7d9e-9f0a-5f6a7b8c9d42", groupId: "0190a1f3-d3e4-7f5a-a061-6c7d8e9f0a13", name: "Utilities"},
    {id: "0190a1f5-2d8e-7f1a-a2b3-6a7b8c9d0e43", groupId: "0190a1f3-d3e4-7f5a-a061-6c7d8e9f0a13", name: "Other"},
    {id: "0190a1f5-4f9a-7a2b-b3c4-7b8c9d0e1f51", groupId: "0190a1f4-1f2a-7b6c-b172-7d8e9f0a1b14", name: "Movies"},
    {id: "0190a1f5-6a0b-7b3c-84d5-8c9d0e1f2a52", groupId: "0190a1f4-1f2a-7b6c-b172-7d8e9f0a1b14", name: "Games"},
    {id: "0190a1f5-8c1d-7c4e-95e6-9d0e1f2a3b53", groupId: "0190a1f4-1f2a-7b6c-b172-7d8e9f0a1b14", name: "Other"},
]

const transactions: Transaction[] = [
    {id: "0190a1f6-2a3b-7c4d-8e5f-6a7b8c9d0e61", name: "Lidl", date: new Date(2026, 0, 12), amount: 45.3, accountId: "0190a1f2-3b4c-7d5e-8f60-1a2b3c4d5e01", categoryId: "0190a1f4-3c4d-7e7f-8283-8e9f0a1b2c21"},
    {id: "0190a1f6-4b5c-7d6e-9f70-8b9c0d1e2f62", name: "Shell", date: new Date(2026, 0, 13), amount: 62.1, accountId: "0190a1f2-7e8f-7a9b-9c0d-2e3f4a5b6c02", categoryId: "0190a1f4-9c0d-7e1f-9a2b-1b2c3d4e5f31"},
    {id: "0190a1f6-6c7d-7e8f-a081-9c0d1e2f3a63", name: "Netflix", date: new Date(2026, 0, 14), amount: 15.99, accountId: "0190a1f3-1d2e-7f30-a142-3b4c5d6e7f03", categoryId: "0190a1f5-4f9a-7a2b-b3c4-7b8c9d0e1f51"},
    {id: "0190a1f6-8d9e-7f0a-b192-0d1e2f3a4b64", name: "January rent", date: new Date(2026, 0, 1), amount: 850, accountId: "0190a1f2-7e8f-7a9b-9c0d-2e3f4a5b6c02", categoryId: "0190a1f4-f5a6-7b7c-8d8e-4e5f6a7b8c41"},
    {id: "0190a1f6-ae0f-7a1b-82a3-1e2f3a4b5c65", name: "Bistro Central", date: new Date(2026, 0, 15), amount: 23.5, accountId: "0190a1f2-3b4c-7d5e-8f60-1a2b3c4d5e01", categoryId: "0190a1f4-5e6f-7a8b-9c0d-9f0a1b2c3d22"},
]

export class ServerMock implements Servr {
    async version(): Promise<string> {
        return "1.0";
    }

    async addAccount(account: Account): Promise<void> {
        accounts.push(structuredClone(account));
    }

    async addCategory(category: Category): Promise<void> {
        categories.push(structuredClone(category));
    }

    async addGroup(group: Group): Promise<void> {
        groups.push(structuredClone(group));
    }

    async getAccounts(): Promise<Account[]> {
        return structuredClone(accounts);
    }

    async getCategories(groupId: string): Promise<Category[]> {
        return structuredClone(categories.filter((category) => category.groupId === groupId));
    }

    async getGroups(): Promise<Group[]> {
        return structuredClone(groups);
    }

    async updateAccount(account: Account): Promise<void> {
        const index = accounts.findIndex((item) => item.id === account.id);
        if (index !== -1) {
            accounts[index] = structuredClone(account);
        }
    }

    async updateCategory(category: Category): Promise<void> {
        const index = categories.findIndex((item) => item.id === category.id);
        if (index !== -1) {
            categories[index] = structuredClone(category);
        }
    }

    async updateGroup(group: Group): Promise<void> {
        const index = groups.findIndex((item) => item.id === group.id);
        if (index !== -1) {
            groups[index] = structuredClone(group);
        }
    }

    getCompleteGroups(): Promise<CompleteGroup[]> {
        return Promise.resolve(structuredClone(groups.map((group) => ({
            ...group,
            categories: categories.filter((category) => category.groupId === group.id),
        }))));
    }

    getTransactionById(id: string): Promise<Transaction|null> {
        const transaction = transactions.find((item) => item.id === id);
        return Promise.resolve(transaction ? structuredClone(transaction) : null);
    }

    login(loginData: LoginData): Promise<LoggedUser> {
        const login = loginData.login;

        if(login === 'test'){
            return Promise.resolve({
                login: 'test',
                name: 'Test Name',
                id: 'idhere'
            })
        } else {
            throw new Error('invalid credentials')
        }
    }

    logout(): Promise<void> {
        console.log("logout")

        return Promise.resolve(undefined)
    }

    async deleteAccounts(ids: string[]): Promise<void> {
        if (transactions.some((transaction) => ids.includes(transaction.accountId))) {
            throw new Error('account has transactions');
        }

        for (let i = accounts.length - 1; i >= 0; i--) {
            if (ids.includes(accounts[i].id)) {
                accounts.splice(i, 1);
            }
        }
    }

}
