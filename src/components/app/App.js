import AppHeader from "../appHeader/AppHeader";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";

// lazy load
const MainPage = lazy(() => import("../pages/MainPage"));
const SingleComic = lazy(() => import("../pages/SingleComicPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const NoMatch = lazy(() => import("../pages/404"));
const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={"Loading..."}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComic />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
