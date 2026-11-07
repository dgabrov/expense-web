import {
    DATE_FORMAT_ISO,
    DATE_FORMAT_MMM_D_YYYY,
    DATE_FORMAT_MMM_D_YYYY_NO_SPACE,
    DATE_FORMAT_MMMD_YYYY,
    DATE_FORMAT_MMMD_YYYY_NO_SPACE,
    DATE_FORMAT_US,
    UPLOAD_DATE,
    UPLOAD_MINUS,
    UPLOAD_NAME,
    UPLOAD_PLUS,
    parseAmount,
    parseLongDate
} from "../../util/util.ts";
import type {CsvLine, Transaction} from "../../data.ts";

export type UploadSettings = {
    rowCount: number
    format: string
    account: string
    // upload key mapped to each column, by column index (undefined when not selected)
    columns: (string | undefined)[]
}

// Counts how many columns are mapped to the given upload key
const countColumns = (columns: (string | undefined)[], key: string) =>
    columns.filter((column) => column === key).length

// Throws an Error describing the first problem found with the settings
export const checkSettings = ({rowCount, format, account, columns}: UploadSettings) => {
    if (rowCount < 1) {
        throw new Error('No rows to process, upload a file first')
    }

    if (!format) {
        throw new Error('Select the date format')
    }

    if (!account) {
        throw new Error('Select the account')
    }

    if (countColumns(columns, UPLOAD_DATE) !== 1) {
        throw new Error('Select exactly one Date column')
    }

    if (countColumns(columns, UPLOAD_NAME) !== 1) {
        throw new Error('Select exactly one Description column')
    }

    const plusCount = countColumns(columns, UPLOAD_PLUS)
    const minusCount = countColumns(columns, UPLOAD_MINUS)

    if (plusCount > 1) {
        throw new Error('Select at most one Amount column')
    }

    if (minusCount > 1) {
        throw new Error('Select at most one Negative column')
    }

    if (plusCount + minusCount === 0) {
        throw new Error('Select an Amount or a Negative column')
    }
}

const buildDate = (text: string, year: number, monthIndex: number, day: number): Date => {
    const date = new Date(year, monthIndex, day)
    // Date rolls over invalid days (e.g. Feb 31), so check the parts survived
    if (date.getFullYear() !== year || date.getMonth() !== monthIndex || date.getDate() !== day) {
        throw new Error(`Invalid date: "${text}"`)
    }

    return date
}

// Parses text written in one of the formats offered by getFormats()
export const parseUploadDate = (text: string, format: string): Date => {
    const value = text.trim()

    switch (format) {
        case DATE_FORMAT_MMM_D_YYYY:
        case DATE_FORMAT_MMMD_YYYY:
        case DATE_FORMAT_MMM_D_YYYY_NO_SPACE:
        case DATE_FORMAT_MMMD_YYYY_NO_SPACE:
            return parseLongDate(value)
        case DATE_FORMAT_ISO: {
            const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value)
            if (!match) {
                throw new Error(`Cannot parse date: "${text}"`)
            }
            return buildDate(text, Number(match[1]), Number(match[2]) - 1, Number(match[3]))
        }
        case DATE_FORMAT_US: {
            const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value)
            if (!match) {
                throw new Error(`Cannot parse date: "${text}"`)
            }
            return buildDate(text, Number(match[3]), Number(match[1]) - 1, Number(match[2]))
        }
        default:
            throw new Error(`Unknown date format: "${format}"`)
    }
}

export type BuildSettings = {
    lines: CsvLine[]
    format: string
    account: string
    columns: (string | undefined)[]
}

// Value of the cell at the given column index, empty when the column is not selected or the row is short
const cellAt = (payload: string[], index: number): string => index === -1 ? '' : (payload[index] ?? '')

// Converts every csv line into a Transaction, the first problem found throws an Error naming the row
export const buildTransactions = ({lines, format, account, columns}: BuildSettings): Transaction[] => {
    const dateIndex = columns.indexOf(UPLOAD_DATE)
    const nameIndex = columns.indexOf(UPLOAD_NAME)
    const plusIndex = columns.indexOf(UPLOAD_PLUS)
    const minusIndex = columns.indexOf(UPLOAD_MINUS)

    return lines.map((line, lineIndex) => {
        try {
            // empty amount counts as zero, so either column (or both) may be missing from a row
            const plus = parseAmount(cellAt(line.payload, plusIndex)) ?? 0
            const minus = parseAmount(cellAt(line.payload, minusIndex)) ?? 0

            return {
                id: line.id,
                name: cellAt(line.payload, nameIndex),
                date: parseUploadDate(cellAt(line.payload, dateIndex), format),
                amount: plus - minus,
                accountId: account,
                categoryId: null,
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : String(e)
            throw new Error(`Row ${lineIndex + 1}: ${message}`, {cause: e})
        }
    })
}


