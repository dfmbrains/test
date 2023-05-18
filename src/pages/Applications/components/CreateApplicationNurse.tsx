import React from "react";
import BackButton from "../../../components/BackButton/BackButton";
import Settings from "../../../assets/imgs/settings.webp";
import NurseIcon from "../../../assets/icons/nurse.svg";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../helpers/constants";
import {useNavigate} from "react-router-dom";

const CreateApplicationNurse = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const navigate = useNavigate();

   return (
     <div className="container createApplicationNurse">
        <BackButton action={isLargeTablet ? () => navigate("/profile") : undefined}/>
        <img className="createApplicationNurse__img" src={Settings} alt="unable"/>

        <div className="createApplicationNurse__box">
           <div className="createApplicationNurse__box_img">
              <img src={NurseIcon} alt="nurse"/>
           </div>
           <p className="typography-h3">Скоро вы сможете зарегистрироваться и оказывать услуги выездной медсестры</p>
        </div>
     </div>
   );
};

export default CreateApplicationNurse;