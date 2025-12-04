import { useEffect, useState } from 'react'
import './App.css'
import SnippetCard from './SnippetCard'

async function fetchSnippets(){
  const response = await fetch('/api/snippets')
  return response.json()
}

function App() {
  const [snippets, setSnippets] = useState([])
  useEffect(() => {
    fetchSnippets().then(setSnippets)
  }, [setSnippets])

  return (
    <>
    {snippets.map(s =>(<SnippetCard key={s._id} snippet={s}></SnippetCard>))}

    </>
  )
}

export default App
