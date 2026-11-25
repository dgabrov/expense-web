import type {Servr} from "./servr.ts";
import type {Account, Category, CompleteGroup, Group, LoggedUser, LoginData, SearchData, Transaction} from "../data.ts";
import type {
    ReportCategoryResponse,
    ReportGroupResponse,
    ReportLastResponse,
    ReportListResponse,
    ReportRequest
} from "../components/reports/report-data.ts";
import {getServerUrl} from "./get-url.ts";

// Mirrors data.ErrorResponse, which the backend sends with status 400 on failure
interface ErrorResponse {
    message: string
    items: string[]
}

// Endpoints are relative to the server URL; all of them are GET or POST (see router.go)
const request = async <T>(method: "GET" | "POST" | "PUT", endpoint: string, options?: {query?: Record<string, string>, body?: unknown}): Promise<T> => {
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
        await request<null>("POST", "addTransaction", {body: transaction});
    }

    async addBulk(transactions: Transaction[]): Promise<void> {
        await request<null>("POST", "addBulk", {body: transactions});
    }

    async updateTransaction(transaction: Transaction): Promise<void> {
        await request<null>("POST", "updateTransaction", {body: transaction});
    }

    async setCategory(transactionId: string, categoryId: string | null): Promise<void> {
        // the backend clears the category when categoryId is empty
        await request<null>("PUT", "setCategory", {body: {transactionId, categoryId: categoryId ?? ''}});
    }

    async searchTransactions(search: SearchData): Promise<Transaction[]> {
        return request<Transaction[]>("POST", "searchTransactions", {body: search});
    }

    async getMonthGroup(month: number, year: number, groupId: string): Promise<Transaction[]> {
        return request<Transaction[]>("GET", "month/group", {
            query: {month: String(month), year: String(year), groupId},
        });
    }

    async getMonthCategory(month: number, year: number, categoryId: string): Promise<Transaction[]> {
        return request<Transaction[]>("GET", "month/category", {
            query: {month: String(month), year: String(year), categoryId},
        });
    }

    async getTransactionById(id: string): Promise<Transaction | null> {
        return request<Transaction | null>("GET", "getTransactionById", {query: {id}});
    }

    async login(loginData: LoginData): Promise<LoggedUser> {
        return request<LoggedUser>("POST", "login", {body: loginData});
    }

    async getReportLast(reportRequest: ReportRequest): Promise<ReportLastResponse[]> {
        return request<ReportLastResponse[]>("POST", "report/last", {body: reportRequest});
    }

    async getReportGroup(reportRequest: ReportRequest): Promise<ReportGroupResponse> {
        return request<ReportGroupResponse>("POST", "report/group", {body: reportRequest});
    }

    async getReportCategory(reportRequest: ReportRequest): Promise<ReportCategoryResponse> {
        return request<ReportCategoryResponse>("POST", "report/category", {body: reportRequest});
    }

    async getReportList(reportRequest: ReportRequest): Promise<ReportListResponse> {
        return request<ReportListResponse>("POST", "report/list", {body: reportRequest});
    }

    async logout(): Promise<void> {
        await request<null>("POST", "logout");
    }
}
