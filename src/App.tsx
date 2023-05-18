import React, {lazy} from "react";
import "./theme.scss";
import {Route, Routes} from "react-router-dom";
import Loadable from "./components/Loadable";
import {createPortal} from "react-dom";
import {Auth, PaymentMethods, ApplicationModal} from "./components/Modals";
import RequireMobile from "./shared/Layouts/RequireMobile";

//shared components
const Header = Loadable(lazy(() => import("./shared/Header")));
const BottomBarLayout = Loadable(lazy(() => import("./shared/Layouts/BottomBarLayout")));
const FooterLayout = Loadable(lazy(() => import("./shared/Layouts/FooterLayout")));
const RequireAuth = Loadable(lazy(() => import("./shared/Layouts/RequireAuth")));

//pages
const Home = Loadable(lazy(() => import("./pages/Home")));
const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
//Profile
const Profile = Loadable(lazy(() => import("./pages/Profile")));
const ProfileEdit = Loadable(lazy(() => import("./pages/Profile/ProfileEdit/ProfileEdit")));
const ProfileGroup = Loadable(lazy(() => import("./pages/Profile/ProfileGroup/ProfileGroup")));
const ProfilePaymentMethods = Loadable(lazy(() => import("./mobile-pages/ProfilePaymentMethods")));
//Application
const CreateApplication = Loadable(lazy(() => import("./pages/Applications/CreateApplication")));
//Templates
const ReferralTemplates = Loadable(lazy(() => import("./pages/ReferralTemplates")));


function App() {
   return (
     <>
        <Header/>

        <Routes>
           <Route element={<BottomBarLayout/>}>
              <Route element={<FooterLayout/>}>
                 <Route element={<Home/>} path={"/"}/>
              </Route>
           </Route>

           <Route element={<BottomBarLayout/>}>
              <Route element={<RequireAuth/>}>
                 <Route element={<Profile/>} path={"/profile"}/>
              </Route>
           </Route>

           <Route element={<RequireAuth/>}>
              <Route element={<ProfileEdit/>} path={"/profile/edit"}/>
              <Route element={<ProfileGroup/>} path={"/profile/my-group"}/>
              <Route element={<CreateApplication/>} path={"/create-application"}/>
              <Route element={<ReferralTemplates/>} path={"/templates"}/>

              <Route element={<RequireMobile/>}>
                 <Route element={<ProfilePaymentMethods/>} path={"/profile/payment-methods"}/>
              </Route>
           </Route>

           <Route element={<NotFound/>} path={"*"}/>
        </Routes>

        {createPortal(
          <>
             <Auth/>
             <PaymentMethods/>
             <ApplicationModal/>
          </>,
          document.getElementById("modal-root")!
        )}
     </>
   );
}

export default App;
