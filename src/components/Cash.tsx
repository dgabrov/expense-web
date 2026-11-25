import {useEffect, useState} from "react";
import Papa from "papaparse";
import {v7} from "uuid";
import {useAppDispatch} from "../reducer/store.ts";
import {setSelectedTransactions, setTransactions} from "../reducer/business.ts";
import {setLocation} from "../reducer/header.ts";
import {Location, type Account, type Transaction} from "../data.ts";
import {getServr} from "../server/servr.ts";
import {parseLongDateOrCurrentYear, processError} from "../util/util.ts";

// Turns the pasted text into transactions, one per non-blank line: date,comment,amount
const parseCashEntries = (text: string, accountId: string): Transaction[] => {
    const transactions: Transaction[] = []

    text.split(/\r?\n/).forEach((line, lineIndex) => {
        if (line.trim() === '') {
            return
        }

        const rowNumber = lineIndex + 1

        try {
            const parsed = Papa.parse<string[]>(line, {delimiter: ','})
            if (parsed.errors.length > 0) {
                throw new Error(parsed.errors[0].message)
            }

            const fields = (parsed.data[0] ?? []).map((field) => field.trim())
            if (fields.length !== 3) {
                throw new Error(`expected 3 fields (date,comment,amount), found ${fields.length}`)
            }

            const [dateText, name, amountText] = fields
            if (!dateText) {
                throw new Error('date is empty')
            }
            if (!name) {
                throw new Error('comment is empty')
            }
            if (!amountText) {
                throw new Error('amount is empty')
            }

            const amount = Number(amountText)
            if (!Number.isFinite(amount)) {
                throw new Error(`cannot parse amount: "${amountText}"`)
            }

            transactions.push({
                id: v7(),
                name,
                date: parseLongDateOrCurrentYear(dateText),
                amount,
                accountId,
                categoryId: null,
            })
        } catch (e) {
            const message = e instanceof Error ? e.message : String(e)
            throw new Error(`Row ${rowNumber}: ${message}`, {cause: e})
        }
    })

    return transactions
}

export const Cash = () => {
    const dispatch = useAppDispatch()

    // id of the account marked as cash, empty when there is none
    const [cashAccountId, setCashAccountId] = useState<string>('')
    const [text, setText] = useState<string>('')

    useEffect(() => {
        getServr().getAccounts()
            .then((accounts: Account[]) => setCashAccountId(accounts.find((account) => account.cash)?.id ?? ''))
            .catch((e) => processError(dispatch, e))
    }, [dispatch])

    const submit = async () => {
        try {
            if (!cashAccountId) {
                throw new Error('No cash account found, mark an account as Cash first')
            }

            if (text.trim() === '') {
                throw new Error('Please insert at least one cash transaction')
            }

            const transactions = parseCashEntries(text, cashAccountId)

            await getServr().addBulk(transactions)

            dispatch(setTransactions(transactions))
            dispatch(setSelectedTransactions([]))
            dispatch(setLocation(Location.transactions))
        } catch (e) {
            processError(dispatch, e)
        }
    }

    return (
        <div className="container">
            <h1>Cash</h1>
            <div>please paste cash transactions one per row, format date,comment,amount</div>
            <textarea
                className="cash-entries"
                rows={20}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="button-group">
                <button className="filter-btn" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}
