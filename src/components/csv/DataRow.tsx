import type {CsvLine} from "../../data.ts";
import {UploadType} from "./UploadType.tsx";

type DataRowProps = {
    item: CsvLine
    selected: string[]
    select: (id: string, checked: boolean) => void
}

export const DataRow = ({item, selected, select}: DataRowProps) => {

    const id = item.id
    const checkedAlready = selected.includes(id)

    if (item.payload?.length === 0) {
        // empty rows will not get anything rendered
        return null
    }

    const triggerSelect = (ev: any) => {
        const checked = ev.target.checked

        select(id, checked)
    }

    const rows = item.payload.map((cell, index) => {
        return (<td key={index}>{cell}</td>)
    })

    return (
        <tr>
            <td><input type="checkbox" onChange={triggerSelect} checked={checkedAlready}/></td>
            {rows}
        </tr>
    );
}


type DataHeaderProps = {
    size: number
    value: {[key: number]: string}
    change: (index: number, value: string) => void
}

export const DataHeader = ({size, value, change}: DataHeaderProps) => {

    const columns: React.JSX.Element[] = []
    for (let i = 0; i < size; i++) {
        columns.push(
            <td key={i}>
                <UploadType
                    index={i}
                    selected={(index: number) => value[index] ?? ''}
                    updateElement={change}
                />
            </td>
        )
    }

    return (
        <tr>
            <td>&nbsp;</td>
            {columns}
        </tr>
    )
}
