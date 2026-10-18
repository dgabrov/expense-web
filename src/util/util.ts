import type {CompleteGroup} from "../data.ts";
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

export const getCategoryName = (categoryId: string | null, completeGroups: CompleteGroup[]) => {
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