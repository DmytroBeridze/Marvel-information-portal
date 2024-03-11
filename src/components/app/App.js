import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React from "react";
import { MainPage, ComicsPage } from "../pages";
// import MainPage from "../pages/MainPage";
// import ComicsPage from "../pages/ComicsPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
