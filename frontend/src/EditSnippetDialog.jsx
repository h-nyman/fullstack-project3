import { useEffect, useRef } from "react"

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
    return <dialog ref={dialogRef} onClose={onClose}>
        <form onSubmit={onSubmit} method="dialog" key={activeSnippet?._id ?? 'null'}>
            <input type="hidden" name="_id" value={activeSnippet?._id ?? 'null'}></input>
            <label>Title:
                <input name="title" type="text" defaultValue={activeSnippet?.title}></input>
            </label>
            <label>Language:
                <select name="language" defaultValue={activeSnippet?.language}>
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                </select>
            </label>
            <label>Code:
                <textarea name="code" defaultValue={activeSnippet?.code}></textarea>
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    </dialog>
}