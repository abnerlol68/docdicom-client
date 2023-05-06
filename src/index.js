import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";

// Contexts imports
import { UserCtxProvider } from "app/context/UserCtx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserCtxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserCtxProvider>
);
