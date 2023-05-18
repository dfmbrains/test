import React, {FC} from "react";
import "./profileEditForm.scss";
import TextField from "../TextField/TextField";
import {IProfile, IUpdateProfile} from "../../models/profiles";
import FormHelperText from "../FormHelperText";
import {formatNewDate} from "../../helpers/utils";
import {GendersEnum, IFormError} from "../../models";

interface ProfileEditFormInterface {
   profile: IUpdateProfile | IProfile,
   onChange: (value: string | number | boolean | Date, key: keyof IUpdateProfile) => void
   errors: IProfileEditErrors
}

export interface IProfileEditErrors {
   firstName: IFormError;
   lastName: IFormError;
   midName: IFormError;
   birthDate: IFormError;
   documentNo: IFormError;
   uin: IFormError;
}

const ProfileEditForm: FC<ProfileEditFormInterface> = ({profile, errors, onChange}) => {
   const getGenderActive = (sex: GendersEnum) => {
      switch (sex) {
         case profile.sex:
            return "profileEditForm__genders_item-active";
         default:
            return "";
      }
   };

   return (
     <>
        <div className="profileEditForm">
           <div className="profileEditForm__label">
              <div>
                 <TextField placeholder="Фамилия" type="text"
                            error={!!(errors.lastName.required || errors.lastName.matches)}>
                    <input value={profile.lastName || ""} name={"lastName"} type={"text"} placeholder={"Фамилия"}
                           onChange={e => onChange(e.target.value, "lastName")}/>
                 </TextField>
                 {(errors.lastName.required || errors.lastName.matches) && (
                   <FormHelperText text={errors.lastName.required || errors.lastName.matches}/>
                 )}
              </div>

              <div>
                 <TextField placeholder="Имя" type="text"
                            error={!!(errors.firstName.required || errors.firstName.matches)}>
                    <input value={profile.firstName || ""} name={"firstName"} type={"text"} placeholder={"Имя"}
                           onChange={e => onChange(e.target.value, "firstName")}/>
                 </TextField>
                 {(errors.firstName.required || errors.firstName.matches) && (
                   <FormHelperText text={errors.firstName.required || errors.firstName.matches}/>
                 )}
              </div>

              <div>
                 <TextField placeholder="Отчество" type="text"
                            error={!!(errors.midName.required || errors.midName.matches)}>
                    <input value={profile.midName || ""} name={"midName"} type={"text"} placeholder={"Отчество"}
                           onChange={e => onChange(e.target.value, "midName")}/>
                 </TextField>
                 {errors.midName.matches && (
                   <FormHelperText text={errors.midName.matches}/>
                 )}
              </div>
           </div>

           <div className="profileEditForm__label">
              <div>
                 <TextField placeholder="Дата рождения" type="date"
                            error={!!(errors.birthDate.required || errors.birthDate.matches)}>
                    <input defaultValue={formatNewDate(profile.birthDate)} name={"birthDate"} type={"date"}
                           placeholder={"Дата рождения"}
                           onChange={e => onChange(new Date(e.target.value), "birthDate")}/>
                 </TextField>
                 {(errors.birthDate.required || errors.birthDate.matches) && (
                   <FormHelperText text={errors.birthDate.required || errors.birthDate.matches}/>
                 )}
              </div>

              <div>
                 {profile.isResident
                   ? <>
                      <TextField placeholder="ИИН" type="number"
                                 error={!!(errors.uin.required || errors.uin.matches)}>
                         <input value={profile.uin || ""} name={"uin"} type={"text"} placeholder={"ИИН"}
                                onChange={e => onChange(e.target.value, "uin")}/>
                      </TextField>
                      {(errors.uin.required || errors.uin.matches) && (
                        <FormHelperText text={errors.uin.required || errors.uin.matches}/>
                      )}
                   </>
                   : <>
                      <TextField placeholder="Номер документа" type="text"
                                 error={!!(errors.documentNo.required || errors.documentNo.matches)}>
                         <input value={profile.documentNo || ""} name={"documentNo"} type={"text"}
                                placeholder={"Номер документа"}
                                onChange={e => onChange(e.target.value, "documentNo")}/>
                      </TextField>
                      {(errors.documentNo.required || errors.documentNo.matches) && (
                        <FormHelperText text={errors.documentNo.required || errors.documentNo.matches}/>
                      )}
                   </>
                 }
              </div>

              <TextField placeholder="Не резидент РК" type="checkbox">
                 <input name={"isResident"} checked={!profile.isResident}
                        placeholder={"Не резидент РК"} type={"checkbox"}
                        onChange={e => onChange(!e.target.checked, "isResident")}/>
              </TextField>
           </div>
        </div>

        <span className="typography-h6 profileEditForm__genders_title">Ваш пол</span>
        <div className="profileEditForm__genders">
           <div onClick={() => onChange(GendersEnum.man, "sex")}
                className={`profileEditForm__genders_item ${getGenderActive(GendersEnum.man)}`}>
              <span className="typography-h6">Мужчина</span>
           </div>

           <div onClick={() => onChange(GendersEnum.women, "sex")}
                className={`profileEditForm__genders_item ${getGenderActive(GendersEnum.women)}`}>
              <span className="typography-h6">Женщина</span>
           </div>
        </div>
     </>
   );
};

export default ProfileEditForm;