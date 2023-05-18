import React, {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import "./ProfileEdit.scss";
import Button from "../../../components/Button";
import ProfileEditForm, {IProfileEditErrors} from "../../../components/ProfileEditForm";
import {useRecoilState} from "recoil";
import {currentProfileAvatarState, currentProfileState} from "../../../store/profiles/profiles.states";
import {IUpdateProfile} from "../../../models/profiles";
import {fileCompressor, handleValidateProfileForm} from "../../../helpers/utils";
import {deleteFileById, FileTypes, StorageTypes, uploadFile} from "../../../api/files.api";
import Avatar from "../../../components/Avatar";
import {updateCurrentProfile} from "../../../api/profile.api";
import BackButton from "../../../components/BackButton/BackButton";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../helpers/constants";

const ProfileEdit = () => {
   const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileState);
   const [currentProfileAvatar, setCurrentProfileAvatar] = useRecoilState(currentProfileAvatarState);

   const fileInputRef = useRef<HTMLInputElement | null>(null);

   const [profileData, setProfileData] = useState<IUpdateProfile | null>(null);
   const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
   const [loader, setLoader] = useState<boolean>(false);
   const [isAvatarDeleted, setIsAvatarDeleted] = useState<boolean>(false);

   const [errors, setErrors] = useState<IProfileEditErrors>({
      firstName: {required: "", matches: ""},
      lastName: {required: "", matches: ""},
      midName: {required: "", matches: ""},
      birthDate: {required: "", matches: ""},
      uin: {required: "", matches: ""},
      documentNo: {required: "", matches: ""}
   });

   const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         setSelectedAvatar(e.target.files[0]);
         setIsAvatarDeleted(false);
      } else {
         setSelectedAvatar(null);
      }
   };
   const handleChange = useCallback((value: string | number | boolean | Date, key: string) => {
      setProfileData((prevState) => prevState ? ({...prevState, [key]: value}) : null);
   }, []);
   const formValidator = () => {
      if (profileData) {
         const res = handleValidateProfileForm(errors, profileData);
         setErrors(res.data);
         return res.status;
      } else {
         return false;
      }
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      //checking form validations
      const validateStatus = formValidator();

      if (profileData && validateStatus) {
         setLoader(true);

         const updateProfile = async (createdData: IUpdateProfile) => {
            createdData[createdData.isResident ? "documentNo" : "uin"] = "";

            const updatedProfile = await updateCurrentProfile(createdData);
            setCurrentProfile(updatedProfile);
         };

         //delete if user deleted prev avatar
         if (isAvatarDeleted && profileData.avatarPath && !selectedAvatar) {
            deleteFileById(profileData.avatarPath);
            setCurrentProfileAvatar("");
            profileData.avatarPath = "";
         }

         //if selected new avatar
         if (selectedAvatar) {
            //delete file before uploading a new one
            if (profileData.avatarPath && selectedAvatar) {
               deleteFileById(profileData.avatarPath);
            }
            //upload file
            const compressedFile = await fileCompressor(selectedAvatar);
            const formData = new FormData();
            formData.append("file", compressedFile);
            const updatedAvatar = await uploadFile(formData, {
               storageType: StorageTypes.directory,
               fileType: FileTypes.avatar
            });
            //set new profile avatar
            setCurrentProfileAvatar(URL.createObjectURL(selectedAvatar));

            //update profile
            await updateProfile({...profileData, avatarPath: updatedAvatar.value.id});
         } else {
            //else if didn't select new avatar
            await updateProfile(profileData);
         }

         setLoader(false);
      }
   };

   useEffect(() => {
      if (currentProfile) {
         setProfileData({
            id: currentProfile.id,
            userId: currentProfile.userId,
            name: "",
            phoneNumber: currentProfile.phoneNumber,
            firstName: currentProfile.firstName,
            midName: currentProfile.midName,
            lastName: currentProfile.lastName,
            uin: currentProfile.uin,
            documentNo: currentProfile.documentNo,
            type: currentProfile.type,
            role: currentProfile.role,
            isResident: currentProfile.isResident,
            avatarPath: currentProfile.avatarPath,
            birthDate: new Date(currentProfile.birthDate).getTime() > -2000000000000 ? new Date(currentProfile.birthDate) : new Date(),
            sex: currentProfile.sex,
            description: currentProfile.description,
            isSmsSubscribed: currentProfile.isSmsSubscribed,
            isPushSubscribed: currentProfile.isPushSubscribed,
            isEmailSubscribed: currentProfile.isEmailSubscribed,
            isVirtualUser: currentProfile.isVirtualUser,
            updated: new Date()
         });
      }
   }, [currentProfile]);

   const isTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   return (
     <section>
        <div className="container">

           {!isTablet && <BackButton/>}

           <form className="profileEdit" onSubmit={handleSubmit}>
              <h2 className="typography-h2">Настройки профиля</h2>

              <div className="profileEdit__avatarLabel">
                 <input accept={"image/*"} onChange={handleChangeAvatar} hidden ref={fileInputRef} type="file"/>

                 <Avatar clx={"profileEdit__avatarLabel_avatar"} disableAvatar={isAvatarDeleted}
                         src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : currentProfileAvatar}/>

                 <div className="profileEdit__avatarLabel_right">
                    <span className="typography-h6 secondary-light">Загрузите свое изображение</span>
                    <div>
                       <Button size={"small"} text={"Загрузить фото профиля"}
                               type={"button"} variant={"outlined"} action={() => fileInputRef.current?.click()}/>
                       {selectedAvatar && (
                         <Button size={"small"} text={"Удалить фото"} type={"button"} variant={"outlined"}
                                 action={() => {
                                    setSelectedAvatar(null);
                                    setIsAvatarDeleted(true);
                                 }}/>
                       )}
                    </div>
                 </div>
              </div>

              {profileData && (
                <ProfileEditForm errors={errors} profile={profileData || currentProfile} onChange={handleChange}/>
              )}

              <Button disabled={loader} clx={"profileEdit__submit"} size={"medium"}
                      text={"Сохранить"} type={"submit"} loading={loader}/>
           </form>
        </div>
     </section>
   );
};

export default ProfileEdit;