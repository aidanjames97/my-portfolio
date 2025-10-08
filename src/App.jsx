import './App.css';
import site from "./site.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" Component={site}/>
        </Routes>  
    </Router>
  );
}

export default App;
