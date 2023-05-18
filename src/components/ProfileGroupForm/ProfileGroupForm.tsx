import React, {FC} from 'react';
import TextField from "../TextField/TextField";
import FormHelperText from "../FormHelperText";
import {formatNewDate} from "../../helpers/utils";
import {IUpdateProfile} from "../../models/profiles";
import './ProfileGroupForm.scss'
import {GendersEnum} from "../../models";
import Button from "../Button";

interface GroupFormInterface {
    profile?: any,
    onChange: (value: string | number | boolean | Date, key: keyof IUpdateProfile) => void
    errors: IProfileEditErrors
}

interface IFormError {
    required: string,
    matches: string
}

export interface IProfileEditErrors {
    firstName: IFormError;
    lastName: IFormError;
    midName: IFormError;
    birthDate: IFormError;
    documentNo: IFormError;
    uin: IFormError;
}

const ProfileGroupForm: FC<GroupFormInterface> = ({profile, errors, onChange}) => {

    const getGenderActive = (sex: GendersEnum) => {
        switch (sex) {
            case profile.sex:
                return "ProfileGroupForm__genders_item-active";
            default:
                return "";
        }
    };


    return (
        <>
            <div className="ProfileGroupForm">

                <div className="ProfileGroupForm__label">
                    <div>
                        <TextField placeholder="Фамилия" type="text">
                            <input value={profile.lastName} name={"lastName"} type={"text"} placeholder={"Фамилия"}
                                   onChange={e => onChange(e.target.value, "lastName")}/>
                        </TextField>
                        {(errors.lastName.required || errors.lastName.matches) && (
                            <FormHelperText text={errors.lastName.required || errors.lastName.matches}/>
                        )}
                    </div>

                    <div>
                        <TextField placeholder="Имя" type="text">
                            <input value={profile.firstName} name={"firstName"} type={"text"} placeholder={"Имя"}
                                   onChange={e => onChange(e.target.value, "firstName")}/>
                        </TextField>
                        {(errors.firstName.required || errors.firstName.matches) && (
                            <FormHelperText text={errors.firstName.required || errors.firstName.matches}/>
                        )}
                    </div>

                    <div>
                        <TextField placeholder="Отчество" type="text">
                            <input value={profile.midName} name={"midName"} type={"text"} placeholder={"Отчество"}
                                   onChange={e => onChange(e.target.value, "midName")}/>
                        </TextField>
                        {errors.midName.matches && (
                            <FormHelperText text={errors.midName.matches}/>
                        )}
                    </div>


                </div>



                <div className="ProfileGroupForm__label">
                    <div>
                        <TextField placeholder="Дата рождения" type="date">
                            <input value={formatNewDate(profile.birthDate)} name={"birthDate"} type={"date"}
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
                                <TextField placeholder="ИИН" type="number">
                                    <input value={profile.uin} name={"uin"} type={"text"} placeholder={"ИИН"}
                                           onChange={e => onChange(e.target.value, "uin")}/>
                                </TextField>
                                {(errors.uin.required || errors.uin.matches) && (
                                    <FormHelperText text={errors.uin.required || errors.uin.matches}/>
                                )}
                            </>
                            : <>
                                <TextField placeholder="Номер документа" type="text">
                                    <input value={profile.documentNo} name={"documentNo"} type={"text"}
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

            <div className="ProfileGroupForm__gendersContainer">
                <span className="typography-h4">Пол пациента</span>
                <div className="ProfileGroupForm__genders">
                    <div onClick={() => onChange(GendersEnum.man, "sex")}
                         className={`ProfileGroupForm__genders_item ${getGenderActive(GendersEnum.man)}`}>
                        <span className="typography-h6">Мужчина</span>
                    </div>

                    <div onClick={() => onChange(GendersEnum.women, "sex")}
                         className={`ProfileGroupForm__genders_item ${getGenderActive(GendersEnum.women)}`}>
                        <span className="typography-h6">Женщина</span>
                    </div>
                </div>

                <Button type={'submit'} fullWidth text={'Добавить'}></Button>
            </div>
        </>
    );
};

export default ProfileGroupForm;