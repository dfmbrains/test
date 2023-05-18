import React from "react";
import AnalysesIcon from "../../../assets/icons/analyses.svg";
import SearchIcon from "../../../assets/icons/search.svg";
import NurseIcon from "../../../assets/icons/nurse.svg";
import PharmacyIcon from "../../../assets/icons/pharmacy.svg";
import Loader from "../../../components/Loader";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {useNavigate} from "react-router-dom";
import ServiceCard from "../../../components/ServiceCard";
import {mediaQueriesConstants} from "../../../helpers/constants";
import {useRecoilValue} from "recoil";
import {currentProfileState} from "../../../store/profiles/profiles.states";
import HomePartners from "./HomePartners";

const NotActiveCardIndicator = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);
   const isTablet = useMediaQuery(mediaQueriesConstants.minSmallTablet);

   return (
     <div className="serviceCard__loader">
        {isLargeTablet && <Loader window={false} size={"small"}/>}
        <p className={isTablet ? "typography-h6" : "typography-subtitle2"}>Скоро</p>
     </div>
   );
};

const HomePromoBot = () => {
   const navigate = useNavigate();

   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const currentProfile = useRecoilValue(currentProfileState);

   return (
     <div className="container">
        <div className="home__promo_bot">
           <ServiceCard title={"Анализы"} subtitle={"Сдайте анализы"} color={"#115AFB"} type={"landing"}
                        action={() => navigate("/analyses")} icon={AnalysesIcon}
                        actionButtons={
                           isLargeTablet
                             ? <i className="ri-arrow-right-line"/>
                             : <i className="ri-arrow-right-s-line"/>
                        }/>
           <ServiceCard title={"Найти врача"} subtitle={"Онлайн/оффлайн"} color={"#FD385B"} icon={SearchIcon}
                        actionButtons={<NotActiveCardIndicator/>} type={"landing"}/>
           <ServiceCard title={"Медсестра"} subtitle={"Лекарства и другое"} color={"#FBC815"} icon={NurseIcon}
                        actionButtons={<NotActiveCardIndicator/>} type={"landing"}/>
           <ServiceCard title={"Аптека"} subtitle={"Процедурный кабинет"} color={"#5ACB3D"} icon={PharmacyIcon}
                        actionButtons={<NotActiveCardIndicator/>} type={"landing"}/>
        </div>

        {currentProfile && !isLargeTablet && (
          <HomePartners/>
        )}
     </div>
   );
};

export default HomePromoBot;