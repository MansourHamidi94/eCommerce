import React from "react";
import { Route, Routes } from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";
import HomePageLayout from "./layouts/HomePageLayout";

// pages
import Homepage from './pages/Homepage'
import Registration from "./pages/Registration";
import Login from './pages/Login';
import './default.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <HomePageLayout>
            <Homepage />
          </HomePageLayout>
        } />
        <Route path="/registration" element={
          <MainLayout>
            <Registration />
          </MainLayout>
        } />
        <Route path="/login" element={
          <MainLayout>
            <Login />
          </MainLayout>
        } />
      </Routes>
    </div>
  );
}

export default App;
