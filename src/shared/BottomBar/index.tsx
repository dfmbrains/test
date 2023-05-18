import React from "react";
import "./bottomBar.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import Navigation from "../Header/components/Navigation";
import {CartIcon, HistoryIcon, HomeIcon, MessagesIcon, ProfileIcon} from "../../assets/icons/html-icons";
import {mediaQueriesConstants} from "../../helpers/constants";

const BottomBar = () => {
   const isDesktop = useMediaQuery(mediaQueriesConstants.minDesktop);

   if (isDesktop) return null;

   const navigationsAuthed = [
      {title: "Главная", link: "/", icon: <HomeIcon/>},
      {title: "История", link: "/history", icon: <HistoryIcon/>},
      {title: "Корзина", link: "/cart", icon: <CartIcon/>},
      {title: "Сообщения", link: "/messages", icon: <MessagesIcon/>},
      {title: "Профиль", link: "/profile", icon: <ProfileIcon/>}
   ];

   return (
     <aside className="bottomBar">
        <Navigation navigationsAuthed={navigationsAuthed}/>
     </aside>
   );
};

export default BottomBar;