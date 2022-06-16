import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Signup />}/>
        <Route index element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
