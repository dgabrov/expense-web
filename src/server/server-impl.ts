import type {Servr} from "./servr.ts";
import type {Account, Category, CompleteGroup, Group, LoggedUser, LoginData, SearchData, Transaction} from "../data.ts";
import {getServerUrl} from "./get-url.ts";

// Wire form of Date fields: the backend expects and returns calendar dates as "YYYY-MM-DD" (no time, no zone).
interface WireTransaction extends Omit<Transaction, "date"> {
    date: string
}

interface WireSearchData extends Omit<SearchData, "dateFrom" | "dateTo"> {
    dateFrom: string | null
    dateTo: string | null
}

// Mirrors data.ErrorResponse, which the backend sends with status 400 on failure
interface ErrorResponse {
    message: string
    items: string[]
}

const formatDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
}

// Parsed as local midnight so the calendar day is not shifted by the timezone
const parseDate = (value: string): Date => {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
}

const toWireTransaction = (transaction: Transaction): WireTransaction => ({
    ...transaction,
    date: formatDate(transaction.date),
});

const fromWireTransaction = (transaction: WireTransaction): Transaction => ({
    ...transaction,
    date: parseDate(transaction.date),
});

const toWireSearch = (search: SearchData): WireSearchData => ({
    ...search,
    dateFrom: search.dateFrom ? formatDate(search.dateFrom) : null,
    dateTo: search.dateTo ? formatDate(search.dateTo) : null,
});

// Endpoints are relative to the server URL; all of them are GET or POST (see router.go)
const request = async <T>(method: "GET" | "POST", endpoint: string, options?: {query?: Record<string, string>, body?: unknown}): Promise<T> => {
    const serverUrl = await getServerUrl();
    const query = options?.query ? `?${new URLSearchParams(options.query)}` : "";
    const hasBody = options?.body !== undefined;

    const response = await fetch(`${serverUrl.replace(/\/$/, "")}/${endpoint}${query}`, {
        method,
        headers: hasBody ? {"Content-Type": "application/json"} : undefined,
        body: hasBody ? JSON.stringify(options?.body) : undefined,
    });

    // Responses are always JSON; a void endpoint answers with null
    const payload = await response.json();

    if (!response.ok) {
        throw new Error((payload as ErrorResponse).message);
    }

    return payload as T;
}

export class ServerImpl implements Servr {
    async version(): Promise<string> {
        return request<string>("GET", "version");
    }

    async addAccount(account: Account): Promise<void> {
        await request<null>("POST", "addAccount", {body: account});
    }

    async addCategory(category: Category): Promise<void> {
        await request<null>("POST", "addCategory", {body: category});
    }

    async addGroup(group: Group): Promise<void> {
        await request<null>("POST", "addGroup", {body: group});
    }

    async getAccounts(): Promise<Account[]> {
        return request<Account[]>("GET", "getAccounts");
    }

    async getCategories(groupId: string): Promise<Category[]> {
        return request<Category[]>("GET", "getCategories", {query: {groupId}});
    }

    async getGroups(): Promise<Group[]> {
        return request<Group[]>("GET", "getGroups");
    }

    async updateAccount(account: Account): Promise<void> {
        await request<null>("POST", "updateAccount", {body: account});
    }

    async updateCategory(category: Category): Promise<void> {
        await request<null>("POST", "updateCategory", {body: category});
    }

    async deleteCategories(ids: string[]): Promise<void> {
        await request<null>("POST", "deleteCategories", {body: {ids}});
    }

    async updateGroup(group: Group): Promise<void> {
        await request<null>("POST", "updateGroup", {body: group});
    }

    async deleteAccounts(ids: string[]): Promise<void> {
        await request<null>("POST", "deleteAccounts", {body: {ids}});
    }

    async deleteGroups(ids: string[]): Promise<void> {
        await request<null>("POST", "deleteGroups", {body: {ids}});
    }

    async deleteTransactions(ids: string[]): Promise<void> {
        await request<null>("POST", "deleteTransactions", {body: {ids}});
    }

    async getCompleteGroups(): Promise<CompleteGroup[]> {
        return request<CompleteGroup[]>("GET", "getCompleteGroups");
    }

    async addTransaction(transaction: Transaction): Promise<void> {
        await request<null>("POST", "addTransaction", {body: toWireTransaction(transaction)});
    }

    async addBulk(transactions: Transaction[]): Promise<void> {
        await request<null>("POST", "addBulk", {body: transactions.map(toWireTransaction)});
    }

    async updateTransaction(transaction: Transaction): Promise<void> {
        await request<null>("POST", "updateTransaction", {body: toWireTransaction(transaction)});
    }

    async searchTransactions(search: SearchData): Promise<Transaction[]> {
        const transactions = await request<WireTransaction[]>("POST", "searchTransactions", {body: toWireSearch(search)});
        return transactions.map(fromWireTransaction);
    }

    async getTransactionById(id: string): Promise<Transaction | null> {
        const transaction = await request<WireTransaction | null>("GET", "getTransactionById", {query: {id}});
        return transaction ? fromWireTransaction(transaction) : null;
    }

    async login(loginData: LoginData): Promise<LoggedUser> {
        return request<LoggedUser>("POST", "login", {body: loginData});
    }

    async logout(): Promise<void> {
        await request<null>("POST", "logout");
    }
}
