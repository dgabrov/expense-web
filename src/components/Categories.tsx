import {useEffect, useState} from "react";
import type {Category} from "../data.ts";
import {Location} from "../data.ts";
import {useAppDispatch, useAppSelector} from "../reducer/store.ts";
import {getServr} from "../server/servr.ts";
import {ConfirmDialog} from "./ConfirmDialog.tsx";
import {addError, setLocation} from "../reducer/header.ts";
import {processError} from "../util/util.ts";
import {v7} from "uuid";
import {EditCategory} from "./EditCategory.tsx";

export const Categories = () => {
    const dispatch = useAppDispatch();
    const group = useAppSelector((store) => store.business.group)

    const [categories, setCategories] = useState<Category[]>([])
    const [selected, setSelected] = useState<string[]>([])

    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [adding, setAdding] = useState<boolean>(false)
    const [editName, setEditName] = useState<string>('')
    const [editId, setEditId] = useState<string>('')
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

    // categories only make sense inside a group, so go back to the groups screen without one
    useEffect(() => {
        if (!group) {
            dispatch(setLocation(Location.groups))
        }
    }, [group])

    useEffect(() => {
        if (group) {
            getServr().getCategories(group.id).then((newCategories) => setCategories(newCategories))
        }
    }, [group])

    if (!group) return null

    const allSelected = categories.length > 0 && categories.every((category) => selected.includes(category.id))

    const toggleAll = () => {
        setSelected(allSelected ? [] : categories.map((category) => category.id))
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
            await getServr().deleteCategories(selected)

            // now remove the categories from the loaded list
            setCategories(categories.filter((category) => !selected.includes(category.id)))
            setSelected([]) // no more selected categories
        } catch (e: any) {
            processError(dispatch, e)
        }
    }

    const deleteCategories = () => {
        if (selected.length == 0) {
            dispatch(addError('Please select at least a category to delete'))
        } else {
            setConfirmDialogOpen(true)
        }
    }

    const editCategory = (id: string) => {
        return (ev: any) => {
            ev.preventDefault()

            setAdding(false)
            setEditId(id)

            // find the item
            const editCategories = categories.filter((category) => category.id === id)
            if (editCategories.length == 0) {
                dispatch(addError(`cannot find category with id: ${id}`))
            } else {
                setEditName(editCategories[0].name)

                setShowEdit(true);
            }
        }
    }

    const afterEdit = async () => {
        try {
            if (adding) {
                const newCategory: Category = {id: editId, groupId: group.id, name: editName}
                await getServr().addCategory(newCategory)

                // worked, add it to category list
                setCategories([...categories, newCategory])
            } else {
                const updatedCategory: Category = {id: editId, groupId: group.id, name: editName}
                await getServr().updateCategory(updatedCategory)

                setCategories(categories.map((category) => category.id === editId ? updatedCategory : category))
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

    const addCategory = () => {
        setAdding(true)
        setEditId(v7())

        setEditName('')

        setShowEdit(true);
    }

    return (


        <div className="container">

            <h1>Categories</h1>
            <h2>Group: {group.name}</h2>

            <table>
                <thead>
                <tr>
                    <td><input type="checkbox" checked={allSelected} onChange={toggleAll}/></td>
                    <td>Category</td>
                    <td>&nbsp;</td>
                </tr>
                </thead>
                <tbody>
                {categories.length === 0 && <tr><td colSpan={3}>no items...</td></tr>}
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td><input type="checkbox" checked={selected.includes(category.id)} onChange={() => toggleOne(category.id)}/></td>
                        <td>{category.name}</td>
                        <td><a href='#' onClick={editCategory(category.id)}>edit</a></td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="button-group">
                <button className="filter-btn-red" onClick={deleteCategories}>Delete</button>
                <button className="filter-btn" onClick={addCategory}>Add</button>
            </div>
            <ConfirmDialog open={confirmDialogOpen} message={'Do you really want to '} onConfirm={onDelete} onHide={onHide}></ConfirmDialog>
            <EditCategory open={showEdit} message={'Edit Category'} groupName={group.name} name={editName} onNameChange={setEditName} onConfirm={afterEdit} onHide={hideEdit}></EditCategory>
        </div>
    )
}
