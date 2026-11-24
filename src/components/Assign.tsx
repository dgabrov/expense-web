import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../reducer/store.ts";
import {setTransactionCategory} from "../reducer/business.ts";
import {addError} from "../reducer/header.ts";
import type {Account, CompleteGroup, Transaction} from "../data.ts";
import {getServr} from "../server/servr.ts";
import {formatDate, processError} from "../util/util.ts";

// Index of the next transaction without a category after the given index, wrapping around to the start.
// Stays on the given index when every transaction already has a category.
const nextUnassigned = (list: Transaction[], after: number): number => {
    for (let i = after + 1; i < list.length; i++) {
        if (!list[i].categoryId) return i
    }

    for (let i = 0; i < list.length; i++) {
        if (!list[i].categoryId) return i
    }

    return after
}

export const Assign = () => {
    const dispatch = useAppDispatch()
    const assignTransactions = useAppSelector((store) => store.business.assignTransactions)

    const [accounts, setAccounts] = useState<Account[]>([])
    const [completeGroups, setCompleteGroups] = useState<CompleteGroup[]>([])
    // row of assignTransactions that the next category click applies to
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        getServr().getAccounts()
            .then((list) => setAccounts(list))
            .catch((e) => processError(dispatch, e))
        getServr().getCompleteGroups()
            .then((list) => setCompleteGroups(list))
            .catch((e) => processError(dispatch, e))
    }, [dispatch])

    const accountName = (id: string) => accounts.find((account) => account.id === id)?.name ?? ''

    // group and category names for a categoryId, both empty when the transaction has no category
    const categoryNames = (categoryId: string | null): {group: string, category: string} => {
        for (const group of completeGroups) {
            const category = group.categories.find((crt) => crt.id === categoryId)
            if (category) {
                return {group: group.name, category: category.name}
            }
        }

        return {group: '', category: ''}
    }

    const assignCategory = async (categoryId: string) => {
        const transaction = assignTransactions[currentIndex]
        if (!transaction) {
            dispatch(addError('There is no transaction to assign'))
            return
        }

        try {
            await getServr().setCategory(transaction.id, categoryId)

            // the store is updated only after the server accepted the change
            dispatch(setTransactionCategory({id: transaction.id, categoryId}))

            const updated = assignTransactions.map((txn) => txn.id === transaction.id ? {...txn, categoryId} : txn)
            setCurrentIndex(nextUnassigned(updated, currentIndex))
        } catch (e) {
            processError(dispatch, e)
        }
    }

    return (
        <div className="container">

            <h1>Assign Categories</h1>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <div style={{flex: '1 1 40%', minWidth: '300px'}}>
                    <table>
                        <thead>
                        <tr>
                            <td>Account</td>
                            <td>Date</td>
                            <td>Amount</td>
                            <td>Name</td>
                            <td>Group</td>
                            <td>Category</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {assignTransactions.length === 0 && <tr><td colSpan={7}>no items...</td></tr>}
                        {assignTransactions.map((transaction, index) => {
                            const names = categoryNames(transaction.categoryId)

                            return (
                                <tr key={transaction.id}>
                                    <td>{accountName(transaction.accountId)}</td>
                                    <td>{formatDate(transaction.date)}</td>
                                    <td>{transaction.amount.toFixed(2)}</td>
                                    <td>{transaction.name}</td>
                                    <td>{names.group}</td>
                                    <td>{names.category}</td>
                                    <td style={{cursor: 'pointer'}} onClick={() => setCurrentIndex(index)}>
                                        {index === currentIndex && (
                                            <svg width="24" height="24" viewBox="0 0 24 24" aria-label="current" style={{display: 'block'}}>
                                                <path d="M20 12H5M11 5l-7 7 7 7" fill="none" stroke="green" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div style={{flex: '1 1 40%', display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                    {completeGroups.map((group) => (
                        <table key={group.id} style={{width: 'auto'}}>
                            <thead>
                            <tr><td>{group.name}</td></tr>
                            </thead>
                            <tbody>
                            {group.categories.map((category) => (
                                <tr key={category.id}>
                                    <td>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault()
                                            assignCategory(category.id)
                                        }}>{category.name}</a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>

        </div>
    )
}
