import {useEffect, useState} from "react";
import {getServr} from "../server/servr.ts";
import type {Account} from "../data.ts";
import {getFormats} from "../util/util.ts";

export const Csv = () => {

    const [accounts, setAccounts] = useState<Account[]>([])
    const [selectedAccount, setSelectedAccount] = useState<string>('')
    const formats = getFormats()
    const [selectedFormat, setSelectedFormat] = useState<string>(formats[0].languageValue)

    // TODO continue here, a lot of work to do

    useEffect(() => {
        getServr().getAccounts().then((newAccounts) => setAccounts(newAccounts))
    }, [])

    const upload = () => {
        // TODO
    }

    const process = () => {
        // TODO
    }

    return (
        <div className="container">
            <h1>Upload CSV</h1>
            <div className="search-filters search-filters-vertical">
                <div className="search-field">
                    <label>Date format:</label>
                    <select value={selectedFormat} onChange={e => setSelectedFormat(e.target.value)}>
                        {formats.map(format => <option key={format.languageValue} value={format.languageValue}>{format.displayValue}</option>)}
                    </select>
                </div>
                <div className="search-field">
                    <label>Account:</label>
                    <select value={selectedAccount} onChange={e => setSelectedAccount(e.target.value)}>
                        <option value={''}>Please select account</option>
                        {accounts.map(account => <option key={account.id} value={account.id}>{account.name}</option>)}
                    </select>
                </div>
                <div className="search-field">
                    <label>File:</label>
                    <input type="file"/>
                </div>
            </div>
            <div className="button-group">
                <button className="filter-btn" onClick={upload}>Upload</button>
                <button className="filter-btn" onClick={process}>Process</button>
            </div>


            <table>
                <thead>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>
                        <select name="" id="">
                            <option value="name">name</option>
                            <option value="date">date</option>
                            <option value="amount">amount</option>
                            <option value="amount negative">amount negative</option>
                        </select>
                    </td>
                    <td>
                        <select name="" id="">
                            <option value="name">name</option>
                            <option value="date">date</option>
                            <option value="amount">amount</option>
                            <option value="amount negative">amount negative</option>
                        </select>
                    </td>
                    <td>
                        <select name="" id="">
                            <option value="name">name</option>
                            <option value="date">date</option>
                            <option value="amount">amount</option>
                            <option value="amount negative">amount negative</option>
                        </select>
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>name here</td>
                    <td>12.25</td>
                    <td>Jan 12, 2023</td>
                </tr>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>name here</td>
                    <td>12.25</td>
                    <td>Jan 12, 2023</td>
                </tr>
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>name here</td>
                    <td>12.25</td>
                    <td>Jan 12, 2023</td>
                </tr>
                </tbody>
            </table>
            <div className="button-group">
                <button className="filter-btn">Remove</button>
            </div>

        </div>
    )
}
