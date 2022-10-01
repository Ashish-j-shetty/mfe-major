import React from "react";
import ReactDom from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

//? mount funtion to start up the app

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDom.render(<App onSignIn={onSignIn} history={history} />, el);

  //? to have some line of communication from container to this application we provide some function that the container app can call.
  return {
    onParentNavigate(location) {
      const { pathname: nextPathname } = location;

      //current path
      const pathname = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

//? if we are in development and in isolation call mount function immediately

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    //? {} to satisfy the 2nd argument.
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

//? if we are running thourgh a container then we should export the mound function.

export { mount };
