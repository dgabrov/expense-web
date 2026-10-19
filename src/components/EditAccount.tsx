type EditAccountProps = {
    open: boolean
    message: string
    name: string
    cash: boolean
    onNameChange: (name: string) => void
    onCashChange: (cash: boolean) => void
    onConfirm: () => void
    onHide: () => void
}

export const EditAccount = ({open, message, name, cash, onNameChange, onCashChange, onConfirm, onHide}: EditAccountProps) => {

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
                    <label>Name:</label>
                    <input type="text" value={name} onChange={e => onNameChange(e.target.value)} style={{width: '100%'}}/>
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={cash} onChange={e => onCashChange(e.target.checked)}/>
                        Cash?
                    </label>
                </div>
                <div className="button-group">
                    <button className="filter-btn" onClick={ok}>OK</button>
                    <button className="filter-btn" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
