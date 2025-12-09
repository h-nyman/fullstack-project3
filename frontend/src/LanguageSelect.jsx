import languageList from "./languageList"

export default function LanguageSelect({ language, setLanguage }) {
    return <label>
        <span>Language: </span>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
            <option value="">All</option>
            {languageList.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
        </select>
    </label>
}
