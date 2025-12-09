import { useEffect, useRef } from "react"
import languageList from "./languageList"

export default function EditSnippetDialog({ activeSnippet, onClose, editSnippet }) {
    const dialogRef = useRef(null)
    useEffect(() => {
        if (activeSnippet) {
            dialogRef.current?.showModal()
        }
        else {
            dialogRef.current?.close()
        }
    })
    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const snippet = Object.fromEntries(formData.entries())
        editSnippet(snippet)
        onClose()
    }
    return <dialog ref={dialogRef} onClose={onClose} className="edit-dialog">
        <form onSubmit={onSubmit} method="dialog" key={activeSnippet?._id ?? 'null'} className="edit-form">
            <input type="hidden" name="_id" value={activeSnippet?._id ?? 'null'}></input>
            <div className="form-field">
                <label>Title:</label>
                <input name="title" type="text" defaultValue={activeSnippet?.title} />
            </div>
            <div className="form-field">
                <label>Language:</label>
                <select name="language" defaultValue={activeSnippet?.language}>
                    {languageList.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
            </div>
            <div className="form-field">
                <label>Code:</label>
                <textarea name="code" defaultValue={activeSnippet?.code} />
            </div>
            <div className="dialog-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Close</button>
            </div>
        </form>
    </dialog>
}