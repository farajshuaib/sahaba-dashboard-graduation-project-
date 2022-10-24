import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Wrapper from "./components/Wrapper";
import { Buffer } from "buffer";

globalThis.Buffer = Buffer;
//

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Wrapper >
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
