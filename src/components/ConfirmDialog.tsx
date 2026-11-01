type ConfirmDialogProps = {
    open: boolean
    message: string
    onConfirm: () => void
    onHide: () => void
}

export const ConfirmDialog = ({open, message, onConfirm, onHide}: ConfirmDialogProps) => {

    if (!open) return null

    const yes = () => {
        onConfirm()
        onHide()
    }

    const no = () => {
        onHide()
    }

    return (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
            <div style={{background: '#fff', padding: '1.5rem', borderRadius: '8px', minWidth: '300px', maxWidth: '90vw'}}>
                <p className="mbottom">{message}</p>
                <div className="button-group">
                    <button className="filter-btn" onClick={yes}>Yes</button>
                    <button className="filter-btn" onClick={no}>No</button>
                </div>
            </div>
        </div>
    )
}
