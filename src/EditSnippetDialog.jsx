import { useEffect, useRef, useState } from "react"
import languageList from "./languageList"
import HighlightedCode from "./HighlightedCode"

export default function EditSnippetDialog({ activeSnippet, onClose, editSnippet }) {
    const dialogRef = useRef(null)
    const formRef = useRef(null)
    const [previewSnippet, setPreviewSnippet] = useState(null)
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
    function onPreview() {
        const formData = new FormData(formRef.current)
        const snippet = Object.fromEntries(formData.entries())
        setPreviewSnippet(snippet)
    }
    return <dialog ref={dialogRef} onClose={onClose} className="edit-dialog">
        <form ref={formRef} onSubmit={onSubmit} method="dialog" key={activeSnippet?._id ?? 'null'} className="edit-form">
            <input type="hidden" name="_id" value={activeSnippet?._id ?? 'null'}></input>
            <div className="form-field">
                <label>Title:</label>
                <input name="title" type="text" defaultValue={activeSnippet?.title} required />
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
                <button type="button" onClick={onPreview}>Preview</button>
                <button type="button" onClick={onClose}>Close</button>
            </div>
        </form>
        {previewSnippet && <HighlightedCode snippet={previewSnippet} />}
    </dialog>
}