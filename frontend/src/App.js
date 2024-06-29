import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import SignUp from "./Pages/auth/SignUp";
import SignIn from "./Pages/auth/SignIn";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";

export default function App() { 
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
