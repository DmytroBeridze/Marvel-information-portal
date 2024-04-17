import AppHeader from "../appHeader/AppHeader";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { Suspense, createContext, lazy, useState } from "react";
import FindOneCharacterPage from "../findOneCharacterPage/FindOneCharacterPage";
import SingleComicPageElement from "../singleComicPageElement/SingleComicPageElement";

// lazy load
const MainPage = lazy(() => import("../pages/MainPage"));
const SingleComic = lazy(() => import("../pages/SingleComicPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const NoMatch = lazy(() => import("../pages/404"));

const App = () => {
  const [find, setFind] = useState(null);

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={"Loading..."}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:comicId"
                element={
                  <SingleComic
                    Component={SingleComicPageElement}
                    dataType="comics"
                  />
                }
              />

              <Route
                path="/:oneCharNameId"
                element={
                  <SingleComic
                    Component={FindOneCharacterPage}
                    dataType="chatacter"
                  />
                }
              ></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
  // return (
  //   <Router>
  //     <div className="app">
  //       <AppHeader />
  //       <main>
  //         <Suspense fallback={"Loading..."}>
  //           <Routes>
  //             <Route path="/" element={<MainPage />} />
  //             <Route path="/comics" element={<ComicsPage />} />
  //             <Route
  //               path="/comics/:comicId"
  //               element={
  //                 <SingleComic
  //                   Component={SingleComicPageElement}
  //                   customDta="comics"
  //                 />
  //               }
  //             />

  //             <Route
  //               path="/:oneCharNameId"
  //               element={<FindOneCharacterPage />}
  //             ></Route>
  //           </Routes>
  //         </Suspense>
  //       </main>
  //     </div>
  //   </Router>
  // );
};

export default App;
