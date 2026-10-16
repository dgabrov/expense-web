import {useAppDispatch, useAppSelector} from "../reducer/store.ts";
import {setSelectedTransactions} from "../reducer/business.ts";
import {useEffect, useState} from "react";
import type {Account, CompleteGroup} from "../data.ts";
import {getServr} from "../server/servr.ts";
import {formatDate, getCategoryName} from "../util/util.ts";

export const Transactions = () => {
    const transactions = useAppSelector((store) => store.business.transactions)
    const selected = useAppSelector((store) => store.business.selected)
    const dispatch = useAppDispatch()

    const [accounts, setAccounts] = useState<Account[]>([])
    const [completeGroups, setCompleteGroups] = useState<CompleteGroup[]>([])

    const [search, setSearch] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [amountFrom, setAmountFrom] = useState('')
    const [amountTo, setAmountTo] = useState('')
    const [accountFilter, setAccountFilter] = useState('')

    useEffect(() => {
        getServr().getAccounts().then((list) => setAccounts(list))
        getServr().getCompleteGroups().then((list) => setCompleteGroups(list))
    }, [])

    const allSelected = transactions.length > 0 && transactions.every((transaction) => selected.includes(transaction.id))

    const accountName = (id: string) => accounts.find((account) => account.id === id)?.name ?? ''

    const toggleAll = () => {
        dispatch(setSelectedTransactions(allSelected ? [] : transactions.map((transaction) => transaction.id)))
    }

    const toggleOne = (id: string) => {
        dispatch(setSelectedTransactions(
            selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]
        ))
    }

    const searchTransactions = () => {
        // TODO
    }

    const addTransaction = () => {
        // TODO
    }

    const showUnassigned = () => {
        // TODO
    }

    const trimTransactions = () => {
        // TODO
    }

    const clearFilters = () => {
        // TODO
    }

    const removeTransactions = () => {
        // TODO
    }

    return (
        <div className="container">

            <h1>Transactions</h1>
            <div className="search-filters">
                <div className="search-field">
                    <label>Search:</label>
                    <input type="text" placeholder="Search transactions" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <div className="search-field search-field-range">
                    <label>Date:</label>
                    <div className="input-range">
                        <input type="text" placeholder="From" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}/>
                        <span>-</span>
                        <input type="text" placeholder="To" value={dateTo} onChange={(e) => setDateTo(e.target.value)}/>
                    </div>
                </div>
                <div className="search-field search-field-range">
                    <label>Amount:</label>
                    <div className="input-range">
                        <input type="text" placeholder="From" value={amountFrom} onChange={(e) => setAmountFrom(e.target.value)}/>
                        <span>-</span>
                        <input type="text" placeholder="To" value={amountTo} onChange={(e) => setAmountTo(e.target.value)}/>
                    </div>
                </div>
                <div className="search-field">
                    <label>Account:</label>
                    <input type="text" placeholder="Select account" value={accountFilter} onChange={(e) => setAccountFilter(e.target.value)}/>
                </div>
            </div>
            <div className="button-group">
                <button className="filter-btn" onClick={searchTransactions}>Search</button>
                <button className="filter-btn" onClick={addTransaction}>Add</button>
                <button className="filter-btn" onClick={showUnassigned}>Unassigned</button>
                <button className="filter-btn" onClick={trimTransactions}>Trim</button>
                <button className="filter-btn" onClick={clearFilters}>Clear</button>
                <button className="filter-btn" onClick={removeTransactions}>Remove</button>
            </div>
            <table>
                <thead>
                <tr>
                    <td><input type="checkbox" checked={allSelected} onChange={toggleAll}/></td>
                    <td>Account</td>
                    <td>Date</td>
                    <td>Amount</td>
                    <td>Name</td>
                    <td>Category</td>
                </tr>
                </thead>
                <tbody>
                {transactions.length === 0 && <tr><td colSpan={6}>no items...</td></tr>}
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td><input type="checkbox" checked={selected.includes(transaction.id)} onChange={() => toggleOne(transaction.id)}/></td>
                        <td>{accountName(transaction.accountId)}</td>
                        <td>{formatDate(transaction.date)}</td>
                        <td>{transaction.amount.toFixed(2)}</td>
                        <td>{transaction.name}</td>
                        <td>{getCategoryName(transaction.categoryId, completeGroups)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}
