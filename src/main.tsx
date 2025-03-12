import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./component/Home.tsx";
import "./main.css";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { store } from "./store/store.ts";
import { Notification } from "./component/Notification.tsx";
import Error from "./component/Error.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={Error}>
        <>
          <Home />
          <Notification />
        </>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
);
