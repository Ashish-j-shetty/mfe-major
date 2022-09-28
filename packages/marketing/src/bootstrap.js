import React from "react";
import ReactDom from "react-dom";

import App from "./App";

//? mount funtion to start up the app

const mount = (el) => {
  ReactDom.render(<App />, el);
};

//? if we are in development and in isolation call mount function immediately

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}

//? if we are running thourgh a container then we should export the mound function.

export { mount };
