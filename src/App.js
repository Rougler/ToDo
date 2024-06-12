import { Routes, Route } from 'react-router-dom';

import Sidebar from "./components/sidebar.js"; 
import Dashboard from "./components/Dashboard.js";
import Home from "./components/Home.js";


function App() {

  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </Sidebar>
  );
}

export default App;
