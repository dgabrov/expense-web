import {useState} from "react";
import type {Account} from "../data.ts";

export const Accounts = () => {
    // TODO
    const [accounts, setAccounts] = useState<Account[]>([])


    return (
        <div className="container">

            <h1>Accounts</h1>

            <table>
                <thead>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>Account</td>
                    <td>Cash?</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>Credit Card</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>Cash account</td>
                    <td>Yes</td>
                </tr>
                </tbody>
            </table>

            <div className="button-group">
                <button className="filter-btn-red">Delete</button>
                <button className="filter-btn">Edit</button>
                <button className="filter-btn">Add</button>
            </div>
        </div>
    )
}
