import {useAppSelector} from "../reducer/store.ts";
import {useEffect, useState} from "react";
import type {Account, CompleteGroup} from "../data.ts";
import {getServr} from "../server/servr.ts";
import {formatDate, getCategoryName} from "../util/util.ts";

export const CDelTransaction = () => {

    const transactions = useAppSelector((store) => store.business.deleteTransactions)

    const [accounts, setAccounts] = useState<Account[]>([])
    const [completeGroups, setCompleteGroups] = useState<CompleteGroup[]>([])

    useEffect(() => {
        getServr().getAccounts().then((list) => setAccounts(list))
        getServr().getCompleteGroups().then((list) => setCompleteGroups(list))
    }, [])

    const accountName = (id: string) => accounts.find((account) => account.id === id)?.name ?? ''

    const confirmDelete = () => {
        // TODO
    }

    const cancelDelete = () => {
        // TODO
    }

    return (
        <div className="container">
            <h1>Confirm</h1>
            <h2>Do you really want to delete the transactions below?</h2>

            <table>
                <thead>
                <tr>
                    <td>Account</td>
                    <td>Date</td>
                    <td>Amount</td>
                    <td>Name</td>
                    <td>Category</td>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td>{accountName(transaction.accountId)}</td>
                        <td>{formatDate(transaction.date)}</td>
                        <td>{transaction.amount.toFixed(2)}</td>
                        <td>{transaction.name}</td>
                        <td>{getCategoryName(transaction.categoryId, completeGroups)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="button-group">
                <button className="filter-btn-red" onClick={confirmDelete}>Delete</button>
                <button className="filter-btn" onClick={cancelDelete}>Cancel</button>
            </div>

        </div>
    )
}
