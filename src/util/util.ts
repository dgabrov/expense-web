import type {CompleteGroup, DateFormat} from "../data.ts";
import type {AppDispatch} from "../reducer/store.ts";
import {addError} from "../reducer/header.ts";

// Calendar dates are plain "YYYY-MM-DD" strings; this only turns one into the display form, e.g. "Nov 23, 2026"
export const formatDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number)
    return `${monthLabels[month - 1]} ${day}, ${year}`
}

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Builds the "YYYY-MM-DD" form of a calendar date (month 1 to 12), throws when the day does not exist (e.g. Feb 31)
export const toIsoDate = (year: number, month: number, day: number, text: string): string => {
    const date = new Date(year, month - 1, day)
    // Date rolls over invalid days (e.g. Feb 31), so check the parts survived
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        throw new Error(`Invalid date: "${text}"`)
    }

    return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export interface uploadItem {
    key: string
    display: string
}

export const UPLOAD_DATE = "upload_date";
export const UPLOAD_NAME = "upload_name";
export const UPLOAD_PLUS = "upload_plus";
export const UPLOAD_MINUS = "upload_minus";

export const uploadItems : uploadItem[] = [
    {key: UPLOAD_DATE, display: "Date"},
    {key: UPLOAD_NAME, display: "Description"},
    {key: UPLOAD_PLUS, display: "Amount"},
    {key: UPLOAD_MINUS, display: "Negative"}
]

// Accepts "Jan 12, 2026", "Jan12, 2026" and "Jan12,2026"
export const parseLongDate = (text: string): string => {
    const match = /^([A-Za-z]{3})\s*(\d{1,2}),\s*(\d{4})$/.exec(text.trim())
    if (!match) {
        throw new Error(`Cannot parse date: "${text}"`)
    }

    const month = months.indexOf(match[1].toLowerCase())
    const day = Number(match[2])
    const year = Number(match[3])
    if (month === -1) {
        throw new Error(`Cannot parse month in date: "${text}"`)
    }

    return toIsoDate(year, month + 1, day, text)
}

// Like parseLongDate, but the year is optional: "Nov 12" and "Nov12" take the current year
export const parseLongDateOrCurrentYear = (text: string): string => {
    const trimmed = text.trim()
    if (/^[A-Za-z]{3}\s*\d{1,2}$/.test(trimmed)) {
        return parseLongDate(`${trimmed}, ${new Date().getFullYear()}`)
    }

    return parseLongDate(trimmed)
}

// Empty text means no value, negative numbers are fine
export const parseAmount = (text: string): number | null => {
    const trimmed = text.trim()
    if (trimmed === '') {
        return null
    }

    const value = Number(trimmed)
    if (isNaN(value)) {
        throw new Error(`Cannot parse amount: "${text}"`)
    }

    return value
}

export const getCategoryName =(categoryId: string | null, completeGroups: CompleteGroup[]) => {
    for (const group of completeGroups) {
        const category = group.categories.find((category) => category.id === categoryId)
        if (category) {
            return `${group.name}:${category.name}`
        }
    }

    return ''
}

export function processError(dispatch: AppDispatch, e: unknown) {

    if (e instanceof Error) {
        dispatch(addError(e.message))
    } else {
        dispatch(addError('' + e))
    }
}

// Date format values (language layouts) accepted by the CSV upload
export const DATE_FORMAT_MMM_D_YYYY = 'Jan 2, 2006'
export const DATE_FORMAT_MMMD_YYYY = 'Jan2, 2006'
export const DATE_FORMAT_MMM_D_YYYY_NO_SPACE = 'Jan 2,2006'
export const DATE_FORMAT_MMMD_YYYY_NO_SPACE = 'Jan2,2006'
export const DATE_FORMAT_ISO = '2006-01-02'
export const DATE_FORMAT_US = '01/02/2006'

export const getFormats = () : DateFormat[] => {
    return [
        { languageValue: DATE_FORMAT_MMM_D_YYYY, displayValue: 'MMM d, yyyy' },
        { languageValue: DATE_FORMAT_MMMD_YYYY, displayValue: 'MMMd, yyyy' },
        { languageValue: DATE_FORMAT_MMM_D_YYYY_NO_SPACE, displayValue: 'MMM d,yyyy' },
        { languageValue: DATE_FORMAT_MMMD_YYYY_NO_SPACE, displayValue: 'MMMd,yyyy' },
        { languageValue: DATE_FORMAT_ISO, displayValue: 'yyyy-MM-dd' },
        { languageValue: DATE_FORMAT_US, displayValue: 'MM/dd/yyyy' }
    ]
}
