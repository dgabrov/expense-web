import {useEffect, useState} from "react";
import type {Category} from "../data.ts";
import {useAppSelector} from "../reducer/store.ts";
import {getServr} from "../server/servr.ts";

export const Categories = () => {
    const group = useAppSelector((store) => store.business.group)
    const [categories, setCategories] = useState<Category[]>([])
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        if (group) {
            getServr().getCategories(group.id).then((newCategories) => setCategories(newCategories))
        }
    }, [group])

    const allSelected = categories.length > 0 && categories.every((category) => selected.includes(category.id))

    const toggleAll = () => {
        setSelected(allSelected ? [] : categories.map((category) => category.id))
    }

    const toggleOne = (id: string) => {
        setSelected((current) =>
            current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
        )
    }

    const deleteCategories = () => {
        // TODO
    }

    const editCategories = () => {
        // TODO
    }

    const addCategory = () => {
        // TODO
    }

    return (


        <div className="container">

            <h1>Categories</h1>
            <h2>Group: {group?.name}</h2>

            <table>
                <thead>
                <tr>
                    <td><input type="checkbox" checked={allSelected} onChange={toggleAll}/></td>
                    <td>Category</td>
                </tr>
                </thead>
                <tbody>
                {categories.length === 0 && <tr><td colSpan={2}>no items...</td></tr>}
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td><input type="checkbox" checked={selected.includes(category.id)} onChange={() => toggleOne(category.id)}/></td>
                        <td>{category.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="button-group">
                <button className="filter-btn-red" onClick={deleteCategories}>Delete</button>
                <button className="filter-btn" onClick={editCategories}>Edit</button>
                <button className="filter-btn" onClick={addCategory}>Add</button>
            </div>
        </div>
    )
}
