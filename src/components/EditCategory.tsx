type EditCategoryProps = {
    open: boolean
    message: string
    groupName: string
    name: string
    onNameChange: (name: string) => void
    onConfirm: () => void
    onHide: () => void
}

export const EditCategory = ({open, message, groupName, name, onNameChange, onConfirm, onHide}: EditCategoryProps) => {

    if (!open) return null

    const ok = () => {
        onConfirm()
        onHide()
    }

    const cancel = () => {
        onHide()
    }

    return (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
            <div style={{background: '#fff', padding: '1.5rem', borderRadius: '8px', minWidth: '300px', maxWidth: '90vw'}}>
                <p>{message}</p>
                <div>
                    <label>Group: {groupName}</label>
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => onNameChange(e.target.value)} style={{width: '100%'}}/>
                </div>
                <div className="button-group">
                    <button className="filter-btn" onClick={ok}>OK</button>
                    <button className="filter-btn" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
