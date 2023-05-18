import React, {lazy} from "react";
import "react-phone-input-2/lib/style.css";
import "remixicon/fonts/remixicon.css";
import "./index.scss";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import Loadable from "./components/Loadable";

const PrefetchProvider = Loadable(lazy(() => import("./shared/PrefetchProvider")));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
     <PrefetchProvider>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
     </PrefetchProvider>
  </RecoilRoot>
);