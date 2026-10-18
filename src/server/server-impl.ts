import type {Servr} from "./servr.ts";
import type {Account, Category, CompleteGroup, Group, LoggedUser, LoginData, Transaction} from "../data.ts";

export class ServerImpl implements Servr {
    async version(): Promise<string> {
        return "";
    }

    async addAccount(_account: Account): Promise<void> {
    }

    async addCategory(_category: Category): Promise<void> {
    }

    async addGroup(_group: Group): Promise<void> {
    }

    async getAccounts(): Promise<Account[]> {
        return [];
    }

    async getCategories(_groupId: string): Promise<Category[]> {
        return [];
    }

    async getGroups(): Promise<Group[]> {
        return [];
    }

    async updateAccount(_account: Account): Promise<void> {
    }

    async updateCategory(_category: Category): Promise<void> {
    }

    async updateGroup(_group: Group): Promise<void> {
    }

    getCompleteGroups(): Promise<CompleteGroup[]> {
        return Promise.resolve([]);
    }

    getTransactionById(_id: string): Promise<Transaction | null> {
        return Promise.resolve(null);
    }

    login(_loginData: LoginData): Promise<LoggedUser> {
        throw new Error('not implemented')
    }

    logout(): Promise<void> {
        console.log('logout')

        return Promise.resolve(undefined);
    }
}
