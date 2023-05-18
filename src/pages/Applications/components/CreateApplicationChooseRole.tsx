import React from "react";
import ChooseRolePNG from "../../../assets/imgs/doctor-and-nurse.png";
import BackButton from "../../../components/BackButton/BackButton";
import ServiceCard from "../../../components/ServiceCard";
import DoctorItemIcon from "../../../assets/icons/doctor-item.svg";
import NurseIcon from "../../../assets/icons/nurse.svg";
import {useSearchParams} from "react-router-dom";
import {ProfileRoles} from "../../../models/profiles";

const CreateApplicationChooseRole = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const handleSetParams = (role: ProfileRoles) => {
      setSearchParams({...searchParams, role});
   };

   return (
     <div className="container createApplicationChooseRole">
        <BackButton/>
        <div className="createApplicationChooseRole__box">
           <img className="createApplicationChooseRole__img" src={ChooseRolePNG} alt="choose role"/>
           <h2 className="typography-h2">Вы не зарегистрированы как специалист</h2>
           <h3 className="typography-h3 createApplicationChooseRole__box_text">Выберите ваш профиль</h3>

           <div>
              <ServiceCard title={"Врач"} type={"profile"} icon={DoctorItemIcon} color={"#115AFB"}
                           action={() => handleSetParams(ProfileRoles.doctor)}
                           actionButtons={<i className="ri-arrow-right-s-line"/>}/>
              <ServiceCard title={"Медсестра"} type={"profile"} icon={NurseIcon} color={"#FBC815"}
                           action={() => handleSetParams(ProfileRoles.nurse)}
                           actionButtons={<p className="typography-subtitle2">Скоро</p>}/>
           </div>
        </div>
     </div>
   );
};

export default CreateApplicationChooseRole;