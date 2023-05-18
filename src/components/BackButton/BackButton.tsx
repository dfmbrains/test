import React from "react";
import BackArrow from "../../assets/icons/back-arrow.svg";
import "./BackButton.scss";
import {useNavigate} from "react-router-dom";

const BackButton = ({action}: { action?: () => void }) => {
   const navigate = useNavigate();

   return (
     <button className="BackButton" onClick={() => action ? action() : navigate(-1)}>
        <img src={BackArrow} alt=""/>
        <span className="typography-h4">Назад</span>
     </button>
   );
};

export default BackButton;