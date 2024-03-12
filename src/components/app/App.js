import AppHeader from "../appHeader/AppHeader";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { useEffect } from "react";
import { MainPage, ComicsPage, NoMatch } from "../pages";
import SingleComic from "../pages/SingleComicPage";
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
            <Route path="/comics/:comicId" element={<SingleComic />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
