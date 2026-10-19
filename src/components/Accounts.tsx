import {useEffect, useState} from "react";
import type {Account} from "../data.ts";
import {getServr} from "../server/servr.ts";
import {ConfirmDialog} from "./ConfirmDialog.tsx";
import {addError} from "../reducer/header.ts";
import {useAppDispatch} from "../reducer/store.ts";
import {processError} from "../util/util.ts";
import {v7} from "uuid";
import {EditAccount} from "./EditAccount.tsx";

export const Accounts = () => {
    const dispatch = useAppDispatch();

    const [accounts, setAccounts] = useState<Account[]>([])
    const [selected, setSelected] = useState<string[]>([])

    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [adding, setAdding] = useState<boolean>(false)
    const [editName, setEditName] = useState<string>('')
    const [editCash, setEditCash] = useState<boolean>(false)
    const [editId, setEditId] = useState<string>('')

    useEffect(() => {
        getServr().getAccounts().then((newAccounts) => setAccounts(newAccounts))
    }, [])

    const allSelected = accounts.length > 0 && accounts.every((account) => selected.includes(account.id))
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

    const toggleAll = () => {
        setSelected(allSelected ? [] : accounts.map((account) => account.id))
    }

    const toggleOne = (id: string) => {
        setSelected((current) =>
            current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
        )
    }

    const onHide = () => {
        setConfirmDialogOpen(false)
    }

    const onDelete = async () => {
        try {
            await getServr().deleteAccounts(selected)

            // now remove the accounts from the loaded list
            const newAccounts = accounts.filter((account) => !selected.includes(account.id))
            setAccounts(newAccounts)
            setSelected([]) // no more selected accounts
    } catch(e: any) {
            processError(dispatch, e)
        }
    }

    const deleteAccounts = () => {
        if (selected.length == 0) {
            dispatch(addError('Please select at least an account to delete'))
        } else {
            setConfirmDialogOpen(true)
        }
    }

    const editAccount = (id: string) => {
        return (ev: any) => {
            ev.preventDefault()

            setAdding(false)
            setEditId(id)

            // find the item
            const editAccounts = accounts.filter((account) => account.id === id)
            if (editAccounts.length == 0) {
                dispatch(addError(`cannot find account with id: ${id}`))
            } else {
                const editingAccount = editAccounts[0]
                const name = editingAccount.name
                const cash = editingAccount.cash

                setEditCash(cash)
                setEditName(name)

                setShowEdit(true);
            }
        }
    }

    const afterEdit = async () => {
        try {
            if(adding){
                let newAccount = {id: editId, cash: editCash, name: editName};
                await getServr().addAccount(newAccount)

                // worked, add it to account list
                setAccounts([...accounts, newAccount])
            } else {
                const updatedAccount: Account = {id: editId, cash: editCash, name: editName}
                await getServr().updateAccount(updatedAccount)

                setAccounts(accounts.map((acc) => acc.id === editId ? updatedAccount: acc))
            }

            // ok, hide the stuff
            hideEdit()
        } catch(e: any) {
            processError(dispatch, e)
        }
    }

    const hideEdit = () => {
        setShowEdit(false)
    }

    const addAccount = () => {
        setAdding(true)
        setEditId(v7())

        setEditCash(false)
        setEditName('')

        setShowEdit(true);
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
                    <td>&nbsp;</td>
                </tr>
                </thead>
                <tbody>
                {accounts.length === 0 && <tr><td colSpan={4}>no items...</td></tr>}
                {accounts.map((account) => (
                    <tr key={account.id}>
                        <td><input type="checkbox" checked={selected.includes(account.id)} onChange={() => toggleOne(account.id)}/></td>
                        <td>{account.name}</td>
                        <td>{account.cash ? 'Yes' : 'No'}</td>
                        <td><a href='#' onClick={editAccount(account.id)}>edit</a></td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="button-group">
                <button className="filter-btn-red" onClick={deleteAccounts}>Delete</button>
                <button className="filter-btn" onClick={addAccount}>Add</button>
            </div>
            <ConfirmDialog open={confirmDialogOpen} message={'Do you really want to delete those accounts?'} onConfirm={onDelete} onHide={onHide}></ConfirmDialog>
            <EditAccount open={showEdit} message={'Edit Account'} name={editName} cash={editCash} onNameChange={setEditName} onCashChange={setEditCash} onConfirm={afterEdit} onHide={hideEdit}></EditAccount>
        </div>
    )
}
