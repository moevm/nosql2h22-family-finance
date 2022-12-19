import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Main from './pages/Main.js';
import Login from "./components/Login/Login";
import useToken from "./components/Login/useToken";
import Users from "./components/Users/Users";
import Balances from "./components/Balances/Balances";
import Transactions from "./components/Transactions/Transactions";


function App() {
  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/users' element={<Users />} />
        <Route path='/balances' element={<Balances />} />
        <Route path='/transactions' element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
