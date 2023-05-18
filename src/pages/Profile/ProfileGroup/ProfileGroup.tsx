import React, {FormEvent, useState} from "react";
import "./ProfileGroup.scss";
import BackButton from "../../../components/BackButton/BackButton";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../helpers/constants";
import {useRecoilState} from "recoil";
import {currentProfileGroupState} from "../../../store/profiles/profiles.states";
import {addProfileToGroup} from "../../../api/profile.api";
import ProfileGroupForm from "../../../components/ProfileGroupForm/ProfileGroupForm";
import {IProfileEditErrors} from "../../../components/ProfileEditForm";
import SearchIcon from "../../../assets/icons/searchGroupIcon.svg";
import {handleValidateGroupUser} from "../../../helpers/utils";
import Button from "../../../components/Button";
import {IGroup} from "../../../models/profiles";
import GroupCard from "./GroupCard/GroupCard";

const ProfileGroup = () => {
   const isTablet = useMediaQuery(mediaQueriesConstants.minMediumTablet);
   const [profileGroup, setProfileGroup] = useRecoilState(currentProfileGroupState);

   const [currentGroup, setCurrentGroup] = useState<IGroup>({
      uin: "",
      documentNo: "",
      firstName: "",
      midName: "",
      lastName: "",
      birthDate: new Date(),
      sex: 0,
      isResident: true,
   });

   const [errors, setErrors] = useState<IProfileEditErrors>({
      firstName: {required: "", matches: ""},
      lastName: {required: "", matches: ""},
      midName: {required: "", matches: ""},
      birthDate: {required: "", matches: ""},
      uin: {required: "", matches: ""},
      documentNo: {required: "", matches: ""}
   });

   const changeInputVal = (val: any, key: string) => {
      setCurrentGroup({...currentGroup, [key]: val});
   };

   const formValidator = () => {
      if (currentGroup) {
         const res = handleValidateGroupUser(errors, currentGroup);
         setErrors(res.data);
         return res.status;
      } else {
         return false;
      }
   };

   const submitHandler = (e: FormEvent) => {
      e.preventDefault();
      const validateStatus = formValidator();
      if (validateStatus) {
         addProfileToGroup(currentGroup).then((res) => {
            setProfileGroup(res);
         });
      }
   };


   return (
     <section className="ProfileGroup">
        <div className="container">

           {
             !isTablet && <BackButton/>
           }

           <div className="ProfileGroup__content">

              <aside className={`ProfileGroup__aside ${!isTablet ? "ProfileGroup__asideTablet" : ""}`}>

                 <h3 className="typography-h2">Моя группа</h3>
                 <div className={`ProfileGroup__groups ${!isTablet ? "ProfileGroup__groupsTablet" : ""}`}>
                    {
                       profileGroup?.length ? <>
                            {profileGroup?.map((user) => (
                              <GroupCard card={user}/>
                            ))}
                         </>
                         : <div
                           className={`ProfileGroup__groups_empty ${!isTablet ? "ProfileGroup__groups_emptyTablet" : ""}`}>
                            <img src={SearchIcon} alt=""/>
                            <span className="typography-h3 secondary-light">В вашей группе пока нет людей, добавьте пациента</span>
                         </div>
                    }
                    {
                      !isTablet && <Button clx={"buttonAdd"} variant={"contained"} text={"Добавить"}/>
                    }
                 </div>

              </aside>


              <div className={`ProfileGroup__right ${!isTablet ? "ProfileGroup__rightTablet" : ""}`}>
                 {
                   currentGroup &&
                     <form onSubmit={submitHandler} className="ProfileGroup__form">
                        <span className="typography-h3">Добавить в мою группу</span>
                        <ProfileGroupForm profile={currentGroup} onChange={changeInputVal} errors={errors}/>
                     </form>
                 }
              </div>

           </div>
        </div>
     </section>
   );
};

export default ProfileGroup;