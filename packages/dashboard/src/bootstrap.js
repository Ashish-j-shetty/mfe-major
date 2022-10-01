import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

//? mount funtion to start up the app

const mount = (el) => {
  const app = createApp(Dashboard);

  //? this mount function is un related to the top mound function

  app.mount(el);
};

//? if we are in development and in isolation call mount function immediately

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");
  if (devRoot) {
    //? {} to satisfy the 2nd argument.
    mount(devRoot);
  }
}

//? if we are running thourgh a container then we should export the mound function.

export { mount };
