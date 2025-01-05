import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProductPage from "./pages/ProductPage"
import AuthHeader from "./components/AuthHeader"
import LoginPage from "./pages/AuthPage/LoginPage/LoginPage"
import SignupPage from "./pages/AuthPage/SignupPage/SignupPage"

function App() {

  return (
    <BrowserRouter>
      <AuthHeader />
      <Routes>
        <Route path="/" element={<ProductPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
