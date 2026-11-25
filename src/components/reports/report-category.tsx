import {Fragment} from "react";
import type {Category, Group} from "../../data.ts";
import type {ReportCategoryResponse} from "./report-data.ts";

type ReportCategoryProps = {
    categoryReport: ReportCategoryResponse
    groups: Group[]
    categories: Category[]
    // called when a month value is clicked; categoryId is empty for entries without a category
    onValueClick: (month: number, year: number, categoryId: string) => void
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Months are compared as one number (year * 12 + month index), so a range can be walked month by month
const monthKey = (year: number, month: number) => year * 12 + (month - 1)

const monthLabel = (key: number) => `${MONTH_NAMES[key % 12]} ${Math.floor(key / 12)}`

type Row = {
    id: string
    group: string
    category: string
    values: number[]
    total: number
    average: number
}

type Block = {
    group: string
    rows: Row[]
}

const ReportCategory = ({categoryReport, groups, categories, onValueClick}: ReportCategoryProps) => {
    const items = categoryReport.items

    if (items.length === 0) {
        return (
            <table>
                <tbody>
                <tr><td>no items...</td></tr>
                </tbody>
            </table>
        )
    }

    // every month between the first and the last entry gets a column, even when it has no values
    const keys = items.map((item) => monthKey(item.year, item.month))
    const first = Math.min(...keys)
    const last = Math.max(...keys)
    const months: number[] = []
    for (let key = first; key <= last; key++) {
        months.push(key)
    }

    // categoryId -> (month key -> summed amount)
    const amounts = new Map<string, Map<number, number>>()
    for (const item of items) {
        const byMonth = amounts.get(item.categoryId) ?? new Map<number, number>()
        const key = monthKey(item.year, item.month)
        byMonth.set(key, (byMonth.get(key) ?? 0) + item.amount)
        amounts.set(item.categoryId, byMonth)
    }

    const makeRow = (id: string, group: string, category: string): Row => {
        const byMonth = amounts.get(id)
        const values = months.map((key) => byMonth?.get(key) ?? 0)
        const total = values.reduce((sum, value) => sum + value, 0)
        // average over all months in the range; zero when there are no months to divide by
        const average = months.length === 0 ? 0 : total / months.length

        return {id, group, category, values, total, average}
    }

    // one block per group, listing all of its categories; entries without a category get their own block
    const blocks: Block[] = groups.map((group) => ({
        group: group.name,
        rows: categories
            .filter((category) => category.groupId === group.id)
            .map((category) => makeRow(category.id, group.name, category.name)),
    }))
    if (items.some((item) => item.categoryId === '')) {
        blocks.push({group: 'No group', rows: [makeRow('', 'No group', 'No category')]})
    }

    // rows that are zero in every month are hidden, and a group left with no rows is hidden too
    const visibleBlocks = blocks
        .map((block) => ({...block, rows: block.rows.filter((row) => row.values.some((value) => value !== 0))}))
        .filter((block) => block.rows.length > 0)

    // sums of a list of rows, per month and overall
    const sumRows = (rows: Row[]) => {
        const values = months.map((_, index) => rows.reduce((sum, row) => sum + row.values[index], 0))
        const total = values.reduce((sum, value) => sum + value, 0)
        const average = months.length === 0 ? 0 : total / months.length

        return {values, total, average}
    }

    const columnCount = 2 + months.length + 2
    const allRows = visibleBlocks.flatMap((block) => block.rows)
    const grand = sumRows(allRows)

    return (
        <table>
            <thead>
            <tr>
                <td>Group</td>
                <td>Category</td>
                {months.map((key) => <td className="num" key={key}>{monthLabel(key)}</td>)}
                <td className="num">Total</td>
                <td className="num">Average</td>
            </tr>
            </thead>
            <tbody>
            {visibleBlocks.map((block, blockIndex) => {
                const groupSum = sumRows(block.rows)

                return (
                    <Fragment key={blockIndex}>
                        {block.rows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.group}</td>
                                <td>{row.category}</td>
                                {row.values.map((value, index) => (
                                    <td className="num" key={months[index]}>
                                        <a href="#" onClick={(e) => {
                                            e.preventDefault()
                                            // inverse of monthKey: year is the quotient, month the remainder plus one
                                            onValueClick((months[index] % 12) + 1, Math.floor(months[index] / 12), row.id)
                                        }}>{value.toFixed(2)}</a>
                                    </td>
                                ))}
                                <td className="num">{row.total.toFixed(2)}</td>
                                <td className="num">{row.average.toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr style={{fontWeight: 600}}>
                            <td>{block.group}</td>
                            <td>Total</td>
                            {groupSum.values.map((value, index) => <td className="num" key={months[index]}>{value.toFixed(2)}</td>)}
                            <td className="num">{groupSum.total.toFixed(2)}</td>
                            <td className="num">{groupSum.average.toFixed(2)}</td>
                        </tr>
                        <tr><td colSpan={columnCount}>&nbsp;</td></tr>
                    </Fragment>
                )
            })}
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={2}>Total</td>
                {grand.values.map((value, index) => <td className="num" key={months[index]}>{value.toFixed(2)}</td>)}
                <td className="num">{grand.total.toFixed(2)}</td>
                <td className="num">{grand.average.toFixed(2)}</td>
            </tr>
            </tfoot>
        </table>
    )
}

export default ReportCategory
