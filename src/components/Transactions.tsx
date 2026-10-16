import {useAppSelector} from "../reducer/store.ts";
import {useState} from "react";

export const Transactions = () => {
    const transactions = useAppSelector((store) => store.business.transactions)
    const selected = useAppSelector((store) => store.business.selected)

    return (
        <div className="container">

            <h1>Transactions</h1>
            <div className="search-filters">
                <div className="search-field">
                    <label>Search:</label>
                    <input type="text" placeholder="Search transactions"/>
                </div>
                <div className="search-field search-field-range">
                    <label>Date:</label>
                    <div className="input-range">
                        <input type="text" placeholder="From"/>
                        <span>-</span>
                        <input type="text" placeholder="To"/>
                    </div>
                </div>
                <div className="search-field search-field-range">
                    <label>Amount:</label>
                    <div className="input-range">
                        <input type="text" placeholder="From"/>
                        <span>-</span>
                        <input type="text" placeholder="To"/>
                    </div>
                </div>
                <div className="search-field">
                    <label>Account:</label>
                    <input type="text" placeholder="Select account"/>
                </div>
            </div>
            <div className="button-group">
                <button className="filter-btn">Search</button>
                <button className="filter-btn">Add</button>
                <button className="filter-btn">Unassigned</button>
                <button className="filter-btn">Trim</button>
                <button className="filter-btn">Clear</button>
                <button className="filter-btn">Remove</button>
            </div>
            <table>
                <thead>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>Account</td>
                    <td>Date</td>
                    <td>Amount</td>
                    <td>Name</td>
                    <td>Category</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>Credit Card</td>
                    <td>Jan 12, 2026</td>
                    <td>2.25</td>
                    <td>Longos</td>
                    <td>info:mix</td>
                </tr>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>Account 2</td>
                    <td>Jan 12, 2026</td>
                    <td>12.25</td>
                    <td>Highland</td>
                    <td>info:mix</td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}
