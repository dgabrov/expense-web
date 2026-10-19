@src/components/Transactions.tsx

you see there are the following lines starting with 19

    const [search, setSearch] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [amountFrom, setAmountFrom] = useState('')
    const [amountTo, setAmountTo] = useState('')
    const [accountFilter, setAccountFilter] = useState('')

- in data.ts, create interface SearchData that mimics the six fields above
- search, accountFilter - string or null
- dateFrom, dateTo - date or null. 
- amount from or to - number or null

then in transaction.tsx
- implement search
- it parses the fields to an instance of Search Data
- the date must be like jan 12, 2026 or jan12,2026 or jan 12,2026 or jan12, 2026 see where are the spaces. The date fields if trimmed are empty, then null
- number for amountFrom and to must be parsed as well. Negative values are ok 

then call searchTransactions in servr. The method does not exist, add it, and implement in the two implementing classes. In the mock try to make somethng from it, not very big deal


