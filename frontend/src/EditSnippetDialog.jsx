import { useEffect, useRef } from "react"

export default function EditSnippetDialog({ activeSnippet, onClose }) {
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
        const response = await fetch("/api/snippets/" + activeSnippet._id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(snippet)
        })
    }
    return <dialog ref={dialogRef} onClose={onClose}>
        <form onSubmit={onSubmit} method="dialog">
            <label>Title:
                <input name="title" type="text"></input>
            </label>
            <label>Language:
                <select name="language">
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                </select>
            </label>
            <label>Code:
                <textarea name="code"></textarea>
            </label>
            <button type="submit">Edit Snippet</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    </dialog>
}