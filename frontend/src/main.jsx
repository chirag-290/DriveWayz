import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Usercontext from "../context/Usercontext.jsx";
import CaptainContext from "../context/CaptainContext.jsx";
import SocketProvider from "../context/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContext>
    <Usercontext>
      <SocketProvider>
       <BrowserRouter>
        <App />
       </BrowserRouter>
       </SocketProvider>
    </Usercontext>
    </CaptainContext>
  </StrictMode>
);
