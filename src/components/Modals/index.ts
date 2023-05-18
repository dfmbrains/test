import {lazy} from "react";
import "./modals.scss";
import Loadable from "../Loadable";

const Auth = Loadable(lazy(() => import("./Auth")));
const PaymentMethods = Loadable(lazy(() => import("./PaymentMethods")));
const ApplicationModal = Loadable(lazy(() => import("./ApplicationModal")));

export {Auth, PaymentMethods, ApplicationModal};