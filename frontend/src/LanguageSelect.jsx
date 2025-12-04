export default function LanguageSelect({ language, setLanguage}) {
    return <select value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="">All</option>
        <option value="javascript">Javascript</option>
        <option value="python">Python</option>
    </select>
}