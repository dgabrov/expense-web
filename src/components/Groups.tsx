import {useEffect, useState} from "react";
import {getServr} from "../server/servr.ts";
import type {Group} from "../data.ts";

export const Groups = () => {

    const [groups, setGroups] = useState<Group[]>([])
    const [selected, setSelected] = useState<string[]>([])

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

    const deleteGroups = () => {
        // TODO
    }

    const editGroups = () => {
        // TODO
    }

    const addGroup = () => {
        // TODO
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
                </tr>
                </thead>
                <tbody>
                {groups.length === 0 && <tr><td colSpan={3}>no items...</td></tr>}
                {groups.map((group) => (
                    <tr key={group.id}>
                        <td><input type="checkbox" checked={selected.includes(group.id)} onChange={() => toggleOne(group.id)}/></td>
                        <td>{group.name}</td>
                        <td><a href="#">categories</a></td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="button-group">
                <button className="filter-btn-red" onClick={deleteGroups}>Delete</button>
                <button className="filter-btn" onClick={editGroups}>Edit</button>
                <button className="filter-btn" onClick={addGroup}>Add</button>
            </div>
        </div>
    )
}
