import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./component/Home.tsx";
import "./main.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </StrictMode>
);
