import type {CompleteGroup, DateFormat} from "../data.ts";
import type {AppDispatch} from "../reducer/store.ts";
import {addError} from "../reducer/header.ts";

export const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

// Accepts "Jan 12, 2026", "Jan12, 2026" and "Jan12,2026"
export const parseDate = (text: string): Date => {
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

    const date = new Date(year, month, day)
    // Date rolls over invalid days (e.g. Feb 31), so check the parts survived
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
        throw new Error(`Invalid date: "${text}"`)
    }

    return date
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

export function processError(dispatch: AppDispatch, e: any) {

    if (e instanceof Error) {
        dispatch(addError(e.message))
    } else {
        dispatch(addError('' + e))
    }
}

export const getFormats = () : DateFormat[] => {
    return [
        { languageValue: 'Jan 2, 2006', displayValue: 'MMM d, yyyy' },
        { languageValue: 'Jan2, 2006', displayValue: 'MMMd, yyyy' },
        { languageValue: 'Jan 2,2006', displayValue: 'MMM d,yyyy' },
        { languageValue: 'Jan2,2006', displayValue: 'MMMd,yyyy' },
        { languageValue: '2006-01-02', displayValue: 'yyyy-MM-dd' },
        { languageValue: '01/02/2006', displayValue: 'MM/dd/yyyy' }
    ]
}
