import type {Servr} from "./servr.ts";
import type {Account, Category, CompleteGroup, Group, Transaction} from "../data.ts";

export class ServerImpl implements Servr {
    async version(): Promise<string> {
        // TODO
        return "";
    }

    async addAccount(_account: Account): Promise<void> {
        // TODO
    }

    async addCategory(_category: Category): Promise<void> {
        // TODO
    }

    async addGroup(_group: Group): Promise<void> {
        // TODO
    }

    async getAccounts(): Promise<Account[]> {
        // TODO
        return [];
    }

    async getCategories(_groupId: string): Promise<Category[]> {
        // TODO
        return [];
    }

    async getGroups(): Promise<Group[]> {
        // TODO
        return [];
    }

    async updateAccount(_account: Account): Promise<void> {
        // TODO
    }

    async updateCategory(_category: Category): Promise<void> {
        // TODO
    }

    async updateGroup(_group: Group): Promise<void> {
        // TODO
    }

    getCompleteGroups(): Promise<CompleteGroup[]> {
        // TODO
        return Promise.resolve([]);
    }

    getTransactionById(_id: string): Promise<Transaction | null> {
        // TODO
        return Promise.resolve(null);
    }

}
