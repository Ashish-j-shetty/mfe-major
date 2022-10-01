import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
  hslToRgb,
} from "@material-ui/core";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

export default function App({ onSignIn }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    /**
     ** why are we not using browser router ?
     *? this is not specific to MFE this is how react router works , whenever we create a browser router it creates a browser history for us
     *? we need to get access to that instance so that we can somehow  programatically redirect the user around application. Gettin access to
     *? history crated by browser router is rather challenging  in the same component where we are using browser router. So to get around this
     *? we can create history manully using `createBrowserHistory()` and creating instance of generic router.
     */
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardApp />
              </Route>
              <Route path="/" component={MarketingApp}></Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
}
