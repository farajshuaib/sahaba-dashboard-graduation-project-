import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;
//

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  </React.StrictMode>
);
