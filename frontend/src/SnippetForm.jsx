import languageList from "./languageList"

export default function SnippetForm({ createSnippet }) {
    async function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const snippet = Object.fromEntries(formData.entries())
        createSnippet(snippet)
        e.target.reset()
    }
    return (
        <form onSubmit={onSubmit} className="snippet-form">
            <div className="form-field">
                <label htmlFor="title">Title:</label>
                <input name="title" id="title" type="text" />
            </div>

            <div className="form-field">
                <label htmlFor="language">Language:</label>
                <select name="language" id="language">
                    {languageList.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="code">Code:</label>
                <textarea name="code" id="code"></textarea>
            </div>

            <button type="submit">Create Snippet</button>
        </form>
    );
}