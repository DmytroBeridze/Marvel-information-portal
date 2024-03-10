import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
