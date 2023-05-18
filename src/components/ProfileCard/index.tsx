import React, {FC, useEffect, useRef, useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {currentProfileState} from "../../store/profiles/profiles.states";
import Avatar from "../Avatar";
import QomekCoin from "../../assets/icons/qomek-coin.svg";
import "./profileCard.scss";
import {Link, useNavigate} from "react-router-dom";
import {firstNameLastNameHandler} from "../../helpers/utils";
import {currentProfileBonusesState} from "../../store/billing/billing.states";
import {ExitIcon} from "../../assets/icons/html-icons";
import useLogout from "../../hooks/useLogout";
import {paymentMethodsModalStepState} from "../../store/settings/settings.states";

interface IProfileCard {
   type: "header" | "profileBar";
   needMenu: boolean;
}

const ProfileCard: FC<IProfileCard> = ({type, needMenu}) => {
   const handleLogout = useLogout();
   const navigate = useNavigate();

   const currentProfile = useRecoilValue(currentProfileState);
   const profileBonuses = useRecoilValue(currentProfileBonusesState);
   const setPaymentMethodsModalStep = useSetRecoilState(paymentMethodsModalStepState);

   const menuLinks = [
      {title: "Настройки профиля", action: () => navigate("/profile/edit")},
      {title: "Моя группа", action: () => navigate("/profile/my-group")},
      {title: "Способы оплаты", action: () => setPaymentMethodsModalStep("view")},
      {title: "Связь с нами", action: () => navigate("/contact")},
      {title: "FAQ", action: () => navigate("/faq")},
      {title: "Для специалистов", action: () => navigate("/application")},
   ];

   const tooltipButtonRef = useRef<HTMLDivElement>(null);
   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (tooltipButtonRef.current && !tooltipButtonRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
         }
      };

      if (isMenuOpen) {
         document.addEventListener("click", handleClickOutside);
      }

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [isMenuOpen]);

   return (
     <div className={`profileCard profileCard__${type}`}>
        <Avatar/>
        <div>
           <div className="profileCard__top">
              {type === "header"
                ? <Link to={"/profile"} className="typography-subtitle1">
                   {firstNameLastNameHandler(currentProfile?.firstName || "", currentProfile?.lastName || "")}
                </Link>
                : <h3 className="typography-h2">
                   {firstNameLastNameHandler(currentProfile?.firstName || "", currentProfile?.lastName || "")}
                </h3>
              }
              {needMenu && (
                <span style={{transform: `rotate(${isMenuOpen ? "-180deg" : "0"})`, transition: "0.2s"}}
                      ref={tooltipButtonRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                 <i className="ri-arrow-down-s-line"/>
              </span>
              )}
           </div>
           <div className="profileCard__bonuses">
              <img src={QomekCoin} alt="bonuses"/>
              <p className="typography-subtitle1">Бонусов {profileBonuses}</p>
           </div>
        </div>

        {needMenu && isMenuOpen && (
          <div className="profileCard__menu">
             {menuLinks.map((el, idx) => (
               <div className="profileCard__menu_item" key={idx}>
                  <p className="typography-subtitle1" onClick={() => {
                     setIsMenuOpen(false);
                     el.action();
                  }}>{el.title}</p>
               </div>
             ))}
             <button onClick={handleLogout} className="profileCard__menu_item typography-subtitle1">
                <ExitIcon/>
                Выйти
             </button>
          </div>
        )}
     </div>
   );
};

export default ProfileCard;