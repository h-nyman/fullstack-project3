import { useEffect, useState } from 'react'
import './App.css'
import SnippetCard from './SnippetCard'
import LanguageSelect from './LanguageSelect'
import SnippetForm from './SnippetForm'

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

function pushSnippet(s) {
  setSnippets(snips => [s, ...snips])
}

  return (
    <>
    <SnippetForm pushSnippet={pushSnippet}></SnippetForm>
    <LanguageSelect language={language} setLanguage={setLanguage}></LanguageSelect>
    {snippets.map(s =>(
      <SnippetCard 
      key={s._id} 
      snippet={s}
      removeSnippet={id => setSnippets(snips => snips.filter(s => s._id !== id))}>

      </SnippetCard>))}

    </>
  )
}

export default App
