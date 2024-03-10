import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import decoration from "../../resources/img/vision.png";
import React, { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const App = () => {
  const [charId, setCharId] = useState(null);

  const getCharId = (id) => {
    setCharId(id);
  };
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Route exact path="/">
            <RandomChar />
            <div className="char__content">
              <CharList getCharId={getCharId} />
              <ErrorBoundary>
                <CharInfo charId={charId} />
              </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
          </Route>
          <Route exact path="/comics">
            <AppBanner />
            <ComicsList />
          </Route>
        </main>
      </div>
    </Router>
  );
};

export default App;
