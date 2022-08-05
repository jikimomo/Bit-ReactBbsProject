import React from "react"
import {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import './main.css';
import Bbslist from "./Components/bbslist";
import Bbswrite from "./Components/bbswrite";
import Bbsdetail from "./Components/bbsdetail";
import Bbsupdate from "./Components/bbsupdate";
import Login from "./Components/login";
import Register from "./Components/register";

function App() {

  const [loginValue, setloginValue] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("login") === null){
      setloginValue(false);
    }
    else{
      setloginValue(true);
    }
  })

  const logoutBtn = () => {
    localStorage.removeItem("login");
    setloginValue(false);
  }

  return(
    <div>
      <header className='py-4'>
        <div className='container text-center'>
          <img alt='image' src='bible.jpg' width='960' height='150'/>
        </div>
      </header>

      <BrowserRouter>
        <nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
          <div className="container">

            <div className="collapse navbar-collapse justify-content-between" id="navbar-content">
              <ul className="navbar-nav mr-auto">
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>Home</Link>
                </li>
                <li className='nav-item dropdown'>
                  <div className="nav-link dropdown-toggle" id="navbarDropdown" 
                        role="button" data-toggle="dropdown" aria-haspopup="true" 
                        aria-expanded="false">
                    게시판
                  </div>

                  <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <Link className='dropdown-item' to='/bbslist'>글목록</Link>
                    <Link className='dropdown-item' to='/bbswrite'>글추가</Link>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className='nav-item'>
                  {loginValue
                  ? <button type="button" className="btn logoutBtn" onClick={logoutBtn}>로그아웃</button>
                  : <Link className='nav-link' to='/login'>로그인/회원가입</Link>
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <div className='py-4'>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/bbslist' element={<Bbslist/>}></Route>
                <Route path='/bbswrite' element={<Bbswrite/>}></Route>
                <Route path='/bbsdetail/:seq' element={<Bbsdetail/>}></Route>
                <Route path='/bbsupdate/:seq' element={<Bbsupdate/>}></Route>
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>

      <footer className="py-4 bg-info text-light">
        <div className="container text-center">
          <ul className="nav justify-content-center mb-3">
            <li className="nav-item">
              <a className="nav-link" href="/">Top</a>
            </li>
          </ul>

          <p>
            <small>Copyright &copy;Graphic Arts</small>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Home(){
  return (
    <div>
      <h2>HOME</h2>
    </div>
  )
}

// function Bbslist(){
//   return (
//     <div>
//       <h2>Bbslist</h2>
//     </div>
//   )
// }

// function Bbswrite(){
//   return (
//     <div>
//       <h2>Bbswrite</h2>
//     </div>
//   )
// }

export default App;