import {useEffect, useState} from "react";
import {getServr} from "../server/servr.ts";
import {Location} from "../data.ts";
import type {Group} from "../data.ts";
import {addError, setLocation} from "../reducer/header.ts";
import {setGroup} from "../reducer/business.ts";
import {useAppDispatch} from "../reducer/store.ts";
import {processError} from "../util/util.ts";
import {v7} from "uuid";
import {EditGroup} from "./EditGroup.tsx";
import {ConfirmDialog} from "./ConfirmDialog.tsx";

export const Groups = () => {
    const dispatch = useAppDispatch();

    const [groups, setGroups] = useState<Group[]>([])
    const [selected, setSelected] = useState<string[]>([])

    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [adding, setAdding] = useState<boolean>(false)
    const [editName, setEditName] = useState<string>('')
    const [editId, setEditId] = useState<string>('')
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

    useEffect(() => {
        getServr().getGroups().then((newGroups) => setGroups(newGroups))
    }, [])

    const allSelected = groups.length > 0 && groups.every((group) => selected.includes(group.id))

    const toggleAll = () => {
        setSelected(allSelected ? [] : groups.map((group) => group.id))
    }

    const toggleOne = (id: string) => {
        setSelected((current) =>
            current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
        )
    }

    const categoriesOf = (group: Group) => {
        return (ev: any) => {
            ev.preventDefault()

            dispatch(setGroup(group))
            dispatch(setLocation(Location.categories))
        }
    }

    const onHide = () => {
        setConfirmDialogOpen(false)
    }

    const onDelete = async () => {
        try {
            await getServr().deleteGroups(selected)

            // now remove the groups from the loaded list
            setGroups(groups.filter((group) => !selected.includes(group.id)))
            setSelected([]) // no more selected groups
        } catch (e: any) {
            processError(dispatch, e)
        }
    }

    const deleteGroups = () => {
        if (selected.length == 0) {
            dispatch(addError('Please select at least a group to delete'))
        } else {
            setConfirmDialogOpen(true)
        }
    }

    const editGroup = (id: string) => {
        return (ev: any) => {
            ev.preventDefault()

            setAdding(false)
            setEditId(id)

            // find the item
            const editGroups = groups.filter((group) => group.id === id)
            if (editGroups.length == 0) {
                dispatch(addError(`cannot find group with id: ${id}`))
            } else {
                setEditName(editGroups[0].name)

                setShowEdit(true);
            }
        }
    }

    const afterEdit = async () => {
        try {
            if (adding) {
                const newGroup: Group = {id: editId, name: editName}
                await getServr().addGroup(newGroup)

                // worked, add it to group list
                setGroups([...groups, newGroup])
            } else {
                const updatedGroup: Group = {id: editId, name: editName}
                await getServr().updateGroup(updatedGroup)

                setGroups(groups.map((group) => group.id === editId ? updatedGroup : group))
            }

            // ok, hide the stuff
            hideEdit()
        } catch (e: any) {
            processError(dispatch, e)
        }
    }

    const hideEdit = () => {
        setShowEdit(false)
    }

    const addGroup = () => {
        setAdding(true)
        setEditId(v7())

        setEditName('')

        setShowEdit(true);
    }

    return (
        <div className="container">

            <h1>Groups</h1>

            <table>
                <thead>
                <tr>
                    <td><input type="checkbox" checked={allSelected} onChange={toggleAll}/></td>
                    <td>Group</td>
                    <td>Categories</td>
                    <td>&nbsp;</td>
                </tr>
                </thead>
                <tbody>
                {groups.length === 0 && <tr><td colSpan={4}>no items...</td></tr>}
                {groups.map((group) => (
                    <tr key={group.id}>
                        <td><input type="checkbox" checked={selected.includes(group.id)} onChange={() => toggleOne(group.id)}/></td>
                        <td>{group.name}</td>
                        <td><a href="#" onClick={categoriesOf(group)}>categories</a></td>
                        <td><a href='#' onClick={editGroup(group.id)}>edit</a></td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="button-group">
                <button className="filter-btn-red" onClick={deleteGroups}>Delete</button>
                <button className="filter-btn" onClick={addGroup}>Add</button>
            </div>
            <ConfirmDialog open={confirmDialogOpen} message={'Do you really want to '} onConfirm={onDelete} onHide={onHide}></ConfirmDialog>
            <EditGroup open={showEdit} message={'Edit Group'} name={editName} onNameChange={setEditName} onConfirm={afterEdit} onHide={hideEdit}></EditGroup>
        </div>
    )
}
