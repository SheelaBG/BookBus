// import logo from './logo.svg';

import BookBus from "./Components/BookBus";
import Busdetails from "./Components/Busdetails";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Protect from "./Components/Protect";
import Signup from "./Components/Signup";
import {Routes,Route, BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/home" element={<Protect Child={Home}/>}/> 
      <Route path="/profile" element={<Protect Child={Profile}/>}/>
      <Route path="/bookbus" element={<Protect Child={BookBus}/>}/>
      <Route path='/busdetail/:busid' element={<Protect Child={Busdetails}/>}/>
      
      
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
