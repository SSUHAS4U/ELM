import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Home from './home';
import ChangePassword from './changepassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Myprofile from './myprofile';
import ApplyLeave from './applyleave';
import ForgotPassword from './forgotpassword';
import Viewstatus from './viewstatus';



function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/home' element={<Home/>} />
        <Route path = '/changepassword' element = {<ChangePassword/>}></Route>
        <Route path='/myprofile' element={<Myprofile/>}></Route>
        <Route path='/applyleave' element={<ApplyLeave/>}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route path='/viewstatus' element={<Viewstatus/>}></Route>
      </Routes>
    </BrowserRouter>

    // <div className='full-height'>
    //   <Home/>
    //   <Login/>
    // </div>
  );
}

ReactDOM.render(<Website/>, document.getElementById('root'));