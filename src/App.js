import './App.css';
import site from "./site.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" Component={site}/>
          <Analytics/>
        </Routes>  
    </Router>
  );
}

export default App;