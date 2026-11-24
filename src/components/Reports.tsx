import {useEffect, useState} from "react";
import {Location, type Account, type Category, type Group, type Transaction} from "../data.ts";
import ReportGroup from "./reports/report-group.tsx";
import ReportCategory from "./reports/report-category.tsx";
import ReportList from "./reports/report-list.tsx";
import ReportLast from "./reports/report-last.tsx";
import type {
    ReportCategoryResponse,
    ReportFilter,
    ReportGroupResponse,
    ReportLastResponse,
    ReportListResponse,
    ReportRequest
} from "./reports/report-data.ts";
import {useAppDispatch} from "../reducer/store.ts";
import {setSelectedTransactions, setTransactions} from "../reducer/business.ts";
import {addError, setLocation} from "../reducer/header.ts";
import {getServr} from "../server/servr.ts";
import {processError} from "../util/util.ts";

type ReportType = "group" | "category" | "last" | "list"

const reportTypes: {id: ReportType, caption: string}[] = [
    {id: "group", caption: "Group"},
    {id: "category", caption: "Category"},
    {id: "last", caption: "Last"},
    {id: "list", caption: "List"},
]

const months: {id: string, caption: string}[] = [
    {id: "1", caption: "January"},
    {id: "2", caption: "February"},
    {id: "3", caption: "March"},
    {id: "4", caption: "April"},
    {id: "5", caption: "May"},
    {id: "6", caption: "June"},
    {id: "7", caption: "July"},
    {id: "8", caption: "August"},
    {id: "9", caption: "September"},
    {id: "10", caption: "October"},
    {id: "11", caption: "November"},
    {id: "12", caption: "December"},
]

// Parses one bound of the report; the month must be chosen and the year must be a whole number from 1 to 9999
const parseFilter = (label: string, month: string, year: string): ReportFilter => {
    if (month === '') {
        throw new Error(`Please select the ${label} month`)
    }

    const yearText = year.trim()
    const yearValue = Number(yearText)
    if (yearText === '' || !Number.isInteger(yearValue) || yearValue < 1 || yearValue > 9999) {
        throw new Error(`Please enter a valid ${label} year`)
    }

    return {Month: Number(month), Year: yearValue}
}

export const Reports = () => {
    const dispatch = useAppDispatch()

    const [accounts, setAccounts] = useState<Account[]>([])
    const [groups, setGroups] = useState<Group[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const load = async () => {
            try {
                const [accountList, groupList, completeGroups] = await Promise.all([
                    getServr().getAccounts(),
                    getServr().getGroups(),
                    getServr().getCompleteGroups(),
                ])

                setAccounts(accountList)
                setGroups(groupList)
                // categories are only served per group or nested in complete groups, so flatten them here
                setCategories(completeGroups.flatMap((group) => group.categories))
            } catch (e: unknown) {
                processError(dispatch, e)
            }
        }

        load()
    }, [dispatch])

    const [startMonth, setStartMonth] = useState('')
    const [startYear, setStartYear] = useState('')
    const [endMonth, setEndMonth] = useState('')
    const [endYear, setEndYear] = useState('')
    const [excludeNone, setExcludeNone] = useState(false)
    const [reportType, setReportType] = useState<ReportType>("group")

    const [lastReport, setLastReport] = useState<ReportLastResponse[]>([])
    const [groupReport, setGroupReport] = useState<ReportGroupResponse>({items: []})
    const [categoryReport, setCategoryReport] = useState<ReportCategoryResponse>({items: []})
    const [listReport, setListReport] = useState<ReportListResponse>({items: []})

    const buildReportRequest = (): ReportRequest => {
        const start = parseFilter("start", startMonth, startYear)

        // End is optional: when both of its fields are empty there is no upper bound
        const endGiven = endMonth !== '' || endYear.trim() !== ''
        const end = endGiven ? parseFilter("end", endMonth, endYear) : null

        return {Start: start, End: end, ExcludeNone: excludeNone}
    }

    const submit = async () => {
        try {
            const request = buildReportRequest()

            if (reportType === "group") {
                setGroupReport(await getServr().getReportGroup(request))
            } else if (reportType === "category") {
                setCategoryReport(await getServr().getReportCategory(request))
            } else if (reportType === "list") {
                setListReport(await getServr().getReportList(request))
            } else {
                setLastReport(await getServr().getReportLast(request))
            }
        } catch (e: unknown) {
            processError(dispatch, e)
        }
    }

    // loads the transactions behind a clicked value and opens the transactions page with them;
    // stays on the reports page when the load fails or finds nothing
    const showTransactions = async (load: () => Promise<Transaction[]>) => {
        try {
            const transactions = await load()

            if (!transactions || transactions.length === 0) {
                dispatch(addError('No transactions for this value'))
                return
            }

            dispatch(setTransactions(transactions))
            dispatch(setSelectedTransactions([]))
            dispatch(setLocation(Location.transactions))
        } catch (e: unknown) {
            processError(dispatch, e)
        }
    }

    const groupValueClick = (month: number, year: number, groupId: string) => {
        showTransactions(() => getServr().getMonthGroup(month, year, groupId))
    }

    const categoryValueClick = (month: number, year: number, categoryId: string) => {
        showTransactions(() => getServr().getMonthCategory(month, year, categoryId))
    }

    return (
        <div className="container">

            <h1>Reports</h1>
            <div className="search-filters">
                <div className="search-field search-field-range">
                    <label>Start:</label>
                    <div className="input-range">
                        <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
                            <option value={''}>Month</option>
                            {months.map((month) => <option key={month.id} value={month.id}>{month.caption}</option>)}
                        </select>
                        <input type="text" placeholder="Year" value={startYear} onChange={(e) => setStartYear(e.target.value)}/>
                    </div>
                </div>
                <div className="search-field search-field-range">
                    <label>End:</label>
                    <div className="input-range">
                        <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
                            <option value={''}>Month</option>
                            {months.map((month) => <option key={month.id} value={month.id}>{month.caption}</option>)}
                        </select>
                        <input type="text" placeholder="Year" value={endYear} onChange={(e) => setEndYear(e.target.value)}/>
                    </div>
                </div>
                <div className="search-field">
                    <label>Options:</label>
                    <div className="checkbox-row">
                        <input type="checkbox" checked={excludeNone} onChange={(e) => setExcludeNone(e.target.checked)}/>
                        Exclude none
                    </div>
                </div>
                <div className="search-field">
                    <label>Report:</label>
                    <select value={reportType} onChange={(e) => setReportType(e.target.value as ReportType)}>
                        {reportTypes.map((type) => <option key={type.id} value={type.id}>{type.caption}</option>)}
                    </select>
                </div>
            </div>
            <div className="button-group">
                <button className="filter-btn" onClick={submit}>Submit</button>
            </div>

            {reportType === "group" && <ReportGroup groupReport={groupReport} groups={groups} onValueClick={groupValueClick}/>}
            {reportType === "category" && <ReportCategory categoryReport={categoryReport} groups={groups} categories={categories} onValueClick={categoryValueClick}/>}
            {reportType === "list" && <ReportList listReport={listReport} accounts={accounts} groups={groups} categories={categories}/>}
            {reportType === "last" && <ReportLast lastReport={lastReport} accounts={accounts}/>}

        </div>
    )
}
