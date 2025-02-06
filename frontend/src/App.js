import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './Components/Home';
import Department from './Components/Department';
import Designation from './Components/Designation';
import Employee from './Components/Employee';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     
     <Route path="/Home" element={<Home />} />   
     <Route path="/" element={<Department />} />
     <Route path="/Designation" element={<Designation/>} /> 
     <Route path="/Employee" element={<Employee/>} />  
     </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
