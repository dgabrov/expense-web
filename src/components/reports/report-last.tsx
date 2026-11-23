import type {Account} from "../../data.ts";
import type {ReportLastResponse} from "./report-data.ts";

type ReportLastProps = {
    lastReport: ReportLastResponse[]
    accounts: Account[]
}

const ReportLast = ({lastReport, accounts}: ReportLastProps) => {
    // accountId -> lastDate, for fast lookup per account
    const lastDates = new Map(lastReport.map((last) => [last.accountId, last.lastDate]))

    // only the accounts that have a last date, keeping the account name for display
    const rows = accounts
        .filter((account) => lastDates.has(account.id))
        .map((account) => ({id: account.id, name: account.name, lastDate: lastDates.get(account.id) ?? ''}))

    return (
        <table>
            <thead>
            <tr>
                <td>Account</td>
                <td>Last date</td>
            </tr>
            </thead>
            <tbody>
            {rows.length === 0 && <tr><td colSpan={2}>no items...</td></tr>}
            {rows.map((row) => (
                <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.lastDate}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default ReportLast
