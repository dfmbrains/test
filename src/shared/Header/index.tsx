import React from "react";
import "./header.scss";
import {Link} from "react-router-dom";
import LogoPNG from "../../assets/brand/logo.png";
import SearchInput from "../../components/SearchInput";
import SelectLang from "./components/SelectLang";
import Button from "../../components/Button";
import Navigation from "./components/Navigation";
import useMediaQuery from "../../hooks/useMediaQuery";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authModalStepState} from "../../store/settings/settings.states";
import {currentProfileState} from "../../store/profiles/profiles.states";
import ProfileCard from "../../components/ProfileCard";
import {CartIcon, HistoryIcon, HomeIcon, MessagesIcon} from "../../assets/icons/html-icons";
import {mediaQueriesConstants} from "../../helpers/constants";

const Header = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);
   const isDesktop = useMediaQuery("(min-width: 1260px)");

   const setModalStep = useSetRecoilState(authModalStepState);
   const currentProfile = useRecoilValue(currentProfileState);

   const navigationsAuthed = [
      {title: "Главная", link: "/", icon: <HomeIcon/>},
      {title: "История", link: "/history", icon: <HistoryIcon/>},
      {title: "Корзина", link: "/cart", icon: <CartIcon/>},
      {title: "Сообщения", link: "/messages", icon: <MessagesIcon/>}
   ];

   return (
     <header className="header" id="header">
        <div className="container">
           <div className="header__row">
              <div className="header__left">
                 <Link className="header__logo" to={"/"}>
                    <img className="logo" src={LogoPNG} alt="logo"/>
                 </Link>
                 {isDesktop && <Navigation navigationsAuthed={navigationsAuthed}/>}
              </div>

              <div className="header__right">
                 {isLargeTablet && <SearchInput/>}
                 <SelectLang/>

                 {currentProfile
                   ? isLargeTablet
                     ? <ProfileCard type={"header"} needMenu={true}/>
                     : <Button size={"small"} text={"Скачать приложение"} variant={"outlined"}
                               action={() => setModalStep("login")}/>
                   : <>
                      {isDesktop && (
                        <button className="header__cart">
                           <i className="ri-shopping-cart-line"></i>
                        </button>
                      )}
                      <Button size={isDesktop ? "medium" : "small"} text={"Войти"}
                              action={() => setModalStep("login")} clx={"header__right_login"}/>
                   </>
                 }
              </div>
           </div>
        </div>
     </header>
   );
};

export default Header;