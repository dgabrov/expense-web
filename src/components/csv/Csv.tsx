import {useEffect, useState} from "react";
import Papa from "papaparse";
import {v7} from "uuid";
import {getServr} from "../../server/servr.ts";
import {Location, type Account, type CsvLine} from "../../data.ts";
import {getFormats, processError} from "../../util/util.ts";
import {useDispatch} from "react-redux";
import {addError, setLocation} from "../../reducer/header.ts";
import {setTransactions} from "../../reducer/business.ts";
import {DataHeader, DataRow} from "./DataRow.tsx";
import {buildTransactions, checkSettings} from "./upload.ts";

export const Csv = () => {

    const [accounts, setAccounts] = useState<Account[]>([])
    const [selectedAccount, setSelectedAccount] = useState<string>('')
    const formats = getFormats()
    const [selectedFormat, setSelectedFormat] = useState<string>(formats[0].languageValue)
    const [uploadField, setUploadField] = useState<HTMLInputElement | null>(null)
    const [processData, setProcessData] = useState<CsvLine[]>([])
    const [selected, setSelected] = useState<string[]>([])
    const [dropValues, setDropValues] = useState<{[key:number] : string }>({})

    const dispatch = useDispatch()

    useEffect(() => {
        getServr().getAccounts().then((newAccounts) => setAccounts(newAccounts))
    }, [])

    const loadData = (): Promise<CsvLine[]> => {
        // The ref callback sets uploadField on mount, so it is only null before the first render.
        const file = uploadField?.files?.[0]
        if (!file) {
            return Promise.resolve([])
        }

        return new Promise((resolve, reject) => {
            Papa.parse<string[]>(file, {
                skipEmptyLines: true,
                complete: (results) => resolve(results.data.map(payload => ({id: v7(), payload}))),
                error: (error) => reject(error),
            })
        })
    }

    const upload = () => {
        loadData()
            .then(setProcessData)
            .catch((err) => dispatch(addError(err)))
    }

    const processUpload = async () => {
        const transactions = buildTransactions({
            lines: processData,
            format: selectedFormat,
            account: selectedAccount,
            columns,
        })

        await getServr().addBulk(transactions)

        dispatch(setTransactions(transactions))
        dispatch(setLocation(Location.transactions))
    }

    const process = async () => {
        try {
            checkSettings({
                rowCount: processData.length,
                format: selectedFormat,
                account: selectedAccount,
                columns,
            });

            await processUpload()
        } catch (e) {
            processError(dispatch, e)
        }
    }

    const selectTrigger = (id: string, checked: boolean) => {
        const newSelected = selected.filter((crtId) => crtId !== id)

        if (checked){
            newSelected.push(id)
        }

        setSelected(newSelected)
    }


    const removeSelected = () => {
        setProcessData(crtData => crtData.filter((it) => !selected.includes(it.id)))
        setSelected([])
    }

    const size = processData.length > 0 ? processData[0].payload.length : 0
    // upload key mapped to each column index (undefined when not selected)
    const columns = Array.from({length: size}, (_, index) => dropValues[index])

    const changeValue = (index: number, value: string)  => {
        const newDropValues = {...dropValues}
        newDropValues[index] = value

        setDropValues(newDropValues)
    }

    const showheader = <DataHeader size={size} value={dropValues} change={changeValue}/>
    const showData = processData.map((it) => <DataRow key={it.id} item={it} selected={selected} select={selectTrigger}/>)

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
                    <input type="file" ref ={setUploadField}/>
                </div>
            </div>
            <div className="button-group">
                <button className="filter-btn" onClick={upload}>Upload</button>
                <button className="filter-btn" onClick={process}>Process</button>
            </div>


            <table>
                <thead>
                {showheader}
                </thead>
                <tbody>
                {showData}
                </tbody>
            </table>
            <div className="button-group">
                <button className="filter-btn" onClick={removeSelected}>Remove</button>
            </div>

        </div>
    )
}
