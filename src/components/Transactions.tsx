import {useAppDispatch, useAppSelector} from "../reducer/store.ts";
import {setDeleteTransactions, setEditTransaction, setSelectedTransactions, setTransactions} from "../reducer/business.ts";
import {useEffect, useState} from "react";
import {Location} from "../data.ts";
import type {Account, CompleteGroup, SearchData} from "../data.ts";
import {getServr} from "../server/servr.ts";
import {formatDate, getCategoryName, parseAmount, parseDate, processError} from "../util/util.ts";
import {addError, setLocation} from "../reducer/header.ts";
import {v7} from "uuid";

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

    const searchTransactions = async () => {
        try {
            const searchData: SearchData = {
                search: search.trim() || null,
                accountFilter: accountFilter.trim() || null,
                dateFrom: dateFrom.trim() ? parseDate(dateFrom) : null,
                dateTo: dateTo.trim() ? parseDate(dateTo) : null,
                amountFrom: parseAmount(amountFrom),
                amountTo: parseAmount(amountTo)
            }

            dispatch(setTransactions(await getServr().searchTransactions(searchData)))
        } catch (e: any) {
            processError(dispatch, e)
        }
    }

    const addTransaction = () => {
        // new transaction, the id is generated here
        let newId = v7();

        dispatch(setEditTransaction({id: newId, adding: true}))
        dispatch(setLocation(Location.editTransaction))
    }

    const selectUnassigned = () => {
        // select only the transactions without a category, the list itself is not changed
        const unassignedIds = transactions
            .filter((transaction) => transaction.categoryId === null)
            .map((transaction) => transaction.id)

        dispatch(setSelectedTransactions(unassignedIds))
    }

    const trimTransactions = () => {
        // keep only the selected ones on screen, the selection itself stays as it is
        const filteredTransactions = transactions.filter((transaction) => selected.includes(transaction.id));

        dispatch(setTransactions(filteredTransactions))
    }

    const clear = () => {
        // only the list and the selection, the search fields stay as they are
        dispatch(setTransactions([]))
        dispatch(setSelectedTransactions([]))
    }

    const editTransaction = (id: string) => {
        return (ev: any) => {
            ev.preventDefault()

            // existing transaction, not adding
            dispatch(setEditTransaction({id: id, adding: false}))
            dispatch(setLocation(Location.editTransaction))
        }
    }

    const removeTransactions = () => {
        if (selected.length == 0) {
            dispatch(addError('Please select at least one transaction to delete'))
            return
        }

        // hand the selected transactions over to the confirmation screen
        dispatch(setDeleteTransactions(transactions.filter((transaction) => selected.includes(transaction.id))))
        dispatch(setLocation(Location.cDelTransaction))
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
                <button className="filter-btn" onClick={selectUnassigned}>Unassigned</button>
                <button className="filter-btn" onClick={trimTransactions}>Trim</button>
                <button className="filter-btn" onClick={clear}>Clear</button>
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
                    <td>Edit</td>
                </tr>
                </thead>
                <tbody>
                {transactions.length === 0 && <tr><td colSpan={7}>no items...</td></tr>}
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td><input type="checkbox" checked={selected.includes(transaction.id)} onChange={() => toggleOne(transaction.id)}/></td>
                        <td>{accountName(transaction.accountId)}</td>
                        <td>{formatDate(transaction.date)}</td>
                        <td>{transaction.amount.toFixed(2)}</td>
                        <td>{transaction.name}</td>
                        <td>{getCategoryName(transaction.categoryId, completeGroups)}</td>
                        <td><a href='#' onClick={editTransaction(transaction.id)}>edit</a></td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}
