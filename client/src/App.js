// import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import Headers from './Components/Headers';
function App() {
  return (
    <>
    <Headers/>
    <Routes>
      <Route path = "/" element = {<Home/>} />
      <Route path = "/login" element = {<Login/>} />
      <Route path = "/dashboard" element = {<Dashboard/>} />
      <Route path = "*" element = {<Error/>} />
    </Routes>
    </>
  );
}

export default App;
