import type {Account, Category, Group} from "../../data.ts";
import type {ReportListResponse} from "./report-data.ts";

type ReportListProps = {
    listReport: ReportListResponse
    accounts: Account[]
    groups: Group[]
    categories: Category[]
}

const ReportList = ({listReport, accounts, groups, categories}: ReportListProps) => {
    // lookups by id, so each transaction can show names instead of ids
    const accountNames = new Map(accounts.map((account) => [account.id, account.name]))
    const groupNames = new Map(groups.map((group) => [group.id, group.name]))
    const categoriesById = new Map(categories.map((category) => [category.id, category]))

    const rows = listReport.items.map((transaction) => {
        const category = transaction.categoryId === null ? undefined : categoriesById.get(transaction.categoryId)

        return {
            id: transaction.id,
            group: category ? groupNames.get(category.groupId) ?? '' : '',
            category: category?.name ?? '',
            date: transaction.date,
            name: transaction.name,
            amount: transaction.amount,
            account: accountNames.get(transaction.accountId) ?? '',
        }
    })

    return (
        <table>
            <thead>
            <tr>
                <td>Group</td>
                <td>Category</td>
                <td>Date</td>
                <td>Name</td>
                <td className="num">Amount</td>
                <td>Account</td>
            </tr>
            </thead>
            <tbody>
            {rows.length === 0 && <tr><td colSpan={6}>no items...</td></tr>}
            {rows.map((row) => (
                <tr key={row.id}>
                    <td>{row.group}</td>
                    <td>{row.category}</td>
                    <td>{row.date}</td>
                    <td>{row.name}</td>
                    <td className="num">{row.amount.toFixed(2)}</td>
                    <td>{row.account}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ReportList
