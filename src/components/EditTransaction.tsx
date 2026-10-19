import {useAppDispatch, useAppSelector} from "../reducer/store.ts";
import {useEffect, useState} from "react";
import type {CompleteGroup} from "../data.ts";
import {Location} from "../data.ts"
import {getServr} from "../server/servr.ts";
import {formatDate} from "../util/util.ts";
import {setLocation} from "../reducer/header.ts";

export const EditTransaction = () => {

    const dispatch = useAppDispatch()
    const editTransaction = useAppSelector((store) => store.business.editTransaction)

    const id = editTransaction.id
    const adding = editTransaction.adding

    const [groups, setGroups] = useState<CompleteGroup[]>([])
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [name, setName] = useState('')
    const [groupId, setGroupId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categoryGroupMap, setCategoryGroupMap] = useState<{[key: string]: string}>({})

    useEffect(() => {
        getServr().getCompleteGroups().then((newGroups) => {
            setGroups(newGroups)

            const map: {[key: string]: string} = {}
            newGroups.forEach((group) => group.categories.forEach((category) => {
                map[category.id] = group.id
            }))
            setCategoryGroupMap(map)
        })

        if (!adding) {
            getServr().getTransactionById(id).then((transaction) => {
                if (!transaction) {
                    return
                }

                setDate(formatDate(transaction.date))
                setAmount(transaction.amount.toString())
                setName(transaction.name)
                setCategoryId(transaction.categoryId ?? '')
            })
        }
    }, [adding, id])

    // Group of the saved category, used until the user picks a group themselves
    const savedGroupId = categoryGroupMap[categoryId] ?? ''

    const selectedGroupId = adding
        ? (groupId || groups[0]?.id || '')
        : (groupId || savedGroupId)

    const categories = groups.find((group) => group.id === selectedGroupId)?.categories ?? []

    const selectedCategoryId = adding
        ? (categoryId || categories[0]?.id || '')
        : categoryId

    const changeGroup = (newGroupId: string) => {
        setGroupId(newGroupId)
        // Clear so the first category of the new group gets selected
        setCategoryId('')
    }

    const save = () => {
        console.log(id)
        // TODO
    }

    const cancel = () => {
        dispatch(setLocation(Location.transactions))
    }

    return (
        <div className="container">
            <h1>{adding ? 'Add' : 'Edit'} Transaction</h1>

            <div className="form-group">
                <label htmlFor="login">Date</label>
                <input className="mbottom" type="text" id="login" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)}/>

                <label htmlFor="account">Account</label>
                <input className="mbottom" type="text" id="account" placeholder="Account"/>

                <label htmlFor="amount">Amount</label>
                <input className="mbottom" type="text" id="amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>

                <label htmlFor="name">Name</label>
                <input className="mbottom" type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="group">Group</label>
                <select id={'group'} value={selectedGroupId} onChange={(e) => changeGroup(e.target.value)}>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>

                <label htmlFor="category">Category</label>
                <select id={'category'} value={selectedCategoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="button-group">
                <button className="filter-btn" onClick={save}>Save</button>
                <button className="filter-btn" onClick={cancel}>Cancel</button>
            </div>

        </div>
    )
}
