import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSnippetView from "./AddSnippetView";
import SnippetListView from "./SnippetListView";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <nav>
        <Link to="/">Snippets</Link> | <Link to="/add">Add Snippet</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SnippetListView />} />
        <Route path="/add" element={<AddSnippetView />} />
      </Routes>
    </Router>
  );
}

export default App;
