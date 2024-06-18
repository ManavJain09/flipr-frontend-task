import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import './App.css';
import Auth from'./Components/UserAuth.js'
import SelectTopics from './Components/SelectTopics.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}></Route>
        <Route path="/topics" element={<SelectTopics />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
