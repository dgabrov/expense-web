import {useEffect, useState} from "react";
import type {Account} from "../data.ts";
import {getServr} from "../server/servr.ts";

export const Accounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        getServr().getAccounts().then((newAccounts) => setAccounts(newAccounts))
    }, [])

    const allSelected = accounts.length > 0 && accounts.every((account) => selected.includes(account.id))

    const toggleAll = () => {
        setSelected(allSelected ? [] : accounts.map((account) => account.id))
    }

    const toggleOne = (id: string) => {
        setSelected((current) =>
            current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
        )
    }

    const deleteAccounts = () => {
        // TODO
    }

    const editAccounts = () => {
        // TODO
    }

    const addAccount = () => {
        // TODO
    }

    return (
        <div className="container">

            <h1>Accounts</h1>

            <table>
                <thead>
                <tr>
                    <td><input type="checkbox" checked={allSelected} onChange={toggleAll}/></td>
                    <td>Account</td>
                    <td>Cash?</td>
                </tr>
                </thead>
                <tbody>
                {accounts.length === 0 && <tr><td colSpan={3}>no items...</td></tr>}
                {accounts.map((account) => (
                    <tr key={account.id}>
                        <td><input type="checkbox" checked={selected.includes(account.id)} onChange={() => toggleOne(account.id)}/></td>
                        <td>{account.name}</td>
                        <td>{account.cash ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="button-group">
                <button className="filter-btn-red" onClick={deleteAccounts}>Delete</button>
                <button className="filter-btn" onClick={editAccounts}>Edit</button>
                <button className="filter-btn" onClick={addAccount}>Add</button>
            </div>
        </div>
    )
}
