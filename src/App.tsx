import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { GlobalStyles } from "./components/GlobalStyle";
import {Layout} from "./components/Layout";
import {isAuth} from "./helper/auth";

function App() {
  return (
    <BrowserRouter>
        <GlobalStyles />
        <Layout>
            <Routes>
                <Route path='login' element={<Login />}/>
                <Route path='signup' element={<Signup />}/>
                <Route index element={
                    <AuthRoute>
                        <Home />
                    </AuthRoute>
                } />
            </Routes>
        </Layout>
    </BrowserRouter>
  );
}
const AuthRoute = ({ children }: any) => {
    if (isAuth()) {
        return children
    }
    return <Navigate to='/login' />
}

export default App;
