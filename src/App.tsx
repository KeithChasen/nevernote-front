import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { GlobalStyles } from "./components/GlobalStyle";
import {Layout} from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
        <GlobalStyles />
        <Layout>
            <Routes>
                <Route path='login' element={<Login />}/>
                <Route path='signup' element={<Signup />}/>
                <Route index element={<Home />}/>
            </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;
