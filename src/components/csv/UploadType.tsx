import {uploadItems} from "../../util/util.ts";

export const UploadType = (index: number, selected: (index: number) => string, updateElement: (index: number, newSelected: string) => void) => {

    const items = uploadItems

    const selectChanged = (event: any) => {
        const selectedValue = event.target.value

        updateElement(index, selectedValue)
    }

    const options = items.map(item => <option key={item.key} value={item.key}>{item.display}</option>);
    const selectedValue = selected(index)

    return (
        <select value={selectedValue} onChange={selectChanged}>
            <option key={''} value={''}>Select...</option>
            {options}
        </select>
    )
}
