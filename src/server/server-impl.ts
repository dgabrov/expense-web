import type {Servr} from "./servr.ts";
import type {Account, Category, Group} from "../data.ts";

export class ServerImpl implements Servr {
    version(): string {
        // TODO
        return "";
    }

    addAccount(_account: Account): void {
        // TODO
    }

    addCategory(_category: Category): void {
        // TODO
    }

    addGroup(_group: Group): void {
        // TODO
    }

    getAccounts(): Account[] {
        // TODO
        return [];
    }

    getCategories(): Category[] {
        // TODO
        return [];
    }

    getGroups(): Group[] {
        // TODO
        return [];
    }

    updateAccount(_account: Account): void {
        // TODO
    }

    updateCategory(_category: Category): void {
        // TODO
    }

    updateGroup(_group: Group): void {
        // TODO
    }

}