import { useEffect, useState } from 'react'
import './App.css'
import SnippetCard from './SnippetCard'
import LanguageSelect from './LanguageSelect'

async function fetchSnippets(language) {
  const response = await fetch('/api/snippets?lang=' + language)
  return response.json()
}

function App() {
  const [snippets, setSnippets] = useState([])
  const [language, setLanguage] = useState("")
  useEffect(() => {
    fetchSnippets(language).then(setSnippets)
  }, [setSnippets,language])

  return (
    <>
    <LanguageSelect language={language} setLanguage={setLanguage}></LanguageSelect>
    {snippets.map(s =>(<SnippetCard key={s._id} snippet={s}></SnippetCard>))}

    </>
  )
}

export default App
