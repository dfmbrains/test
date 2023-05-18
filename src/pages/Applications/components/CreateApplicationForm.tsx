import React, {FormEvent, useCallback, useEffect, useState} from "react";
import ApplicationDataForm, {IApplicationCreateErrors} from "./ApplicationDataForm";
import {useRecoilState} from "recoil";
import {currentProfileState} from "../../../store/profiles/profiles.states";
import {IUpdateProfile} from "../../../models/profiles";
import {updateCurrentProfile} from "../../../api/profile.api";
import {
   createFileFromURL,
   createMimeType,
   handleValidateApplicationForm,
   handleValidateProfileForm
} from "../../../helpers/utils";
import ProfileEditForm, {IProfileEditErrors} from "../../../components/ProfileEditForm";
import {createApplication, ICreateApplicationBody} from "../../../api/applications.api";
import {IApplicationFiles} from "./ApplicationUploadDocument";
import Button from "../../../components/Button";
import {
   deleteFileById,
   FileTypes,
   getFilesWithBlobByFilters,
   IFileDataWithBlob,
   StorageTypes,
   uploadFile
} from "../../../api/files.api";
import ApplicationUploadForm from "./ApplicationUploadForm";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../helpers/constants";
import BackButton from "../../../components/BackButton/BackButton";
import {useNavigate} from "react-router-dom";
import {currentProfileApplicationState} from "../../../store/applications/application.states";
import {currentProfileDocumentsState} from "../../../store/files/files.states";
import {filesDescriptions} from "../../../models/api";

const CreateApplicationForm = () => {
   const navigate = useNavigate();
   const isMobile = useMediaQuery(mediaQueriesConstants.mobile);
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const [mobileFormStep, setMobileFormStep] = useState<1 | 2 | 3>(1);
   const handleBack = () => mobileFormStep === 1 ? navigate(-1) : mobileFormStep === 2 ? setMobileFormStep(1) : setMobileFormStep(2);

   const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileState);
   const [currentProfileDocuments, setCurrentProfileDocuments] = useRecoilState(currentProfileDocumentsState);
   const [profileApplication, setCurrentProfileApplication] = useRecoilState(currentProfileApplicationState);

   const [profileData, setProfileData] = useState<IUpdateProfile>({
      id: currentProfile!.id,
      userId: currentProfile!.userId,
      name: "",
      phoneNumber: currentProfile!.phoneNumber,
      firstName: currentProfile!.firstName,
      midName: currentProfile!.midName,
      lastName: currentProfile!.lastName,
      uin: currentProfile!.uin,
      documentNo: currentProfile!.documentNo,
      type: currentProfile!.type,
      role: currentProfile!.role,
      isResident: currentProfile!.isResident,
      avatarPath: currentProfile!.avatarPath,
      birthDate: new Date(currentProfile!.birthDate).getTime() > -2000000000000 ? new Date(currentProfile!.birthDate) : new Date(),
      sex: currentProfile!.sex,
      description: currentProfile!.description,
      isSmsSubscribed: currentProfile!.isSmsSubscribed,
      isPushSubscribed: currentProfile!.isPushSubscribed,
      isEmailSubscribed: currentProfile!.isEmailSubscribed,
      isVirtualUser: currentProfile!.isVirtualUser,
      updated: new Date()
   });
   const [applicationData, setApplicationData] = useState<ICreateApplicationBody>({
      deviceId: profileApplication?.deviceId || "",
      regionCode: profileApplication?.regionCode || "",
      specializationId: profileApplication?.specializationId || "",
      clinicId: profileApplication?.clinicId || "",
      experience: profileApplication?.experience || ""
   });
   const [files, setFiles] = useState<IApplicationFiles>({
      [filesDescriptions.license]: null,
      [filesDescriptions.diploma]: null,
      [filesDescriptions.docBack]: null,
      [filesDescriptions.docFront]: null
   });
   const [filesErrors, setFilesErrors] = useState<boolean>(false);
   const [filesLoader, setFilesLoader] = useState<boolean>(false);

   const [loader, setLoader] = useState<boolean>(false);
   const [profileErrors, setProfileErrors] = useState<IProfileEditErrors>({
      firstName: {required: "", matches: ""},
      lastName: {required: "", matches: ""},
      midName: {required: "", matches: ""},
      birthDate: {required: "", matches: ""},
      uin: {required: "", matches: ""},
      documentNo: {required: "", matches: ""}
   });
   const [applicationErrors, setApplicationErrors] = useState<IApplicationCreateErrors>({
      experience: {required: "", matches: ""},
      specializationId: {required: "", matches: ""},
      clinicId: {required: "", matches: ""}
   });

   const handleChangeProfile = useCallback((value: string | number | boolean | Date, key: keyof IUpdateProfile) => {
      setProfileData((prevState) => ({...prevState, [key]: value}));
   }, []);
   const handleChangeApplication = useCallback((value: string | number | boolean | Date, key: keyof ICreateApplicationBody) => {
      setApplicationData((prevState) => ({...prevState, [key]: value}));
   }, []);
   const handleChangeFiles = useCallback((key: filesDescriptions, file: File | null) => {
      setFiles((prevState) => ({...prevState, [key]: file}));
   }, []);

   const formProfileValidator = () => {
      if (profileData) {
         const res = handleValidateProfileForm(profileErrors, profileData);
         setProfileErrors(res.data);
         return res.status;
      } else {
         return false;
      }
   };
   const formApplicationValidator = () => {
      const res = handleValidateApplicationForm(applicationErrors, applicationData);
      setApplicationErrors(res.data);
      return res.status;
   };
   const formFilesValidator = () => {
      const res = !!(files.doc_license && files.doc_back_id && files.doc_front_id && files.doc_diplom);
      setFilesErrors(!res);
      return res;
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      //checking form validations
      const validateProfileStatus = isMobile || formProfileValidator();
      const validateApplicationStatus = isMobile || formApplicationValidator();
      const validateFilesStatus = formFilesValidator();

      if (validateProfileStatus && validateApplicationStatus && validateFilesStatus) {
         setLoader(true);

         //files
         const fileValues = [
            {file: files.doc_license, type: filesDescriptions.license},
            {file: files.doc_diplom, type: filesDescriptions.diploma},
            {file: files.doc_front_id, type: filesDescriptions.docFront},
            {file: files.doc_back_id, type: filesDescriptions.docBack}
         ];
         const handleUpload = async (arrOfFiles: { file: File | null; type: filesDescriptions; }[]) => {
            await Promise.all(arrOfFiles.map((file) => {
               const formData = new FormData();
               formData.append("file", file.file!);
               return uploadFile(formData, {
                  storageType: StorageTypes.directory,
                  fileType: FileTypes.document,
                  description: file.type
               });
            }));
         };
         if (currentProfileDocuments.length === 0) {
            //if user doesnt have documents
            const fileValues = [
               {file: files.doc_license, type: filesDescriptions.license},
               {file: files.doc_diplom, type: filesDescriptions.diploma},
               {file: files.doc_front_id, type: filesDescriptions.docFront},
               {file: files.doc_back_id, type: filesDescriptions.docBack}
            ];
            await handleUpload(fileValues);
         } else {
            //if user already uploaded documents

            //find old ids
            const oldFileIds = currentProfileDocuments.map(file => file.id);
            const newFileIds = fileValues.map(file => file.file!.name.split(".")[0]);

            const toUpload: { file: File | null; type: filesDescriptions; }[] = [];
            const toDelete: IFileDataWithBlob[] = [];

            //find files to upload
            fileValues.forEach(newFile => {
               if (!oldFileIds.includes(newFile.file!.name.split(".")[0])) {
                  toUpload.push(newFile);
               }
            });
            //find files to delete
            currentProfileDocuments.forEach(oldFile => {
               if (!newFileIds.includes(oldFile.id)) {
                  toDelete.push(oldFile);
               }
            });

            //upload files
            await handleUpload(toUpload);
            //delete files
            for (let i = 0; i < toDelete.length; i++) {
               deleteFileById(toDelete[i].id);
            }
         }

         // update and set profile
         const updatedProfile = await updateCurrentProfile({
            ...profileData, [profileData.isResident ? "documentNo" : "uin"]: ""
         });
         setCurrentProfile(updatedProfile);

         //create and set application
         const createdApplication = applicationData.deviceId
           ? applicationData
           : {...applicationData, deviceId: crypto.randomUUID()};
         const newApplication = await createApplication(createdApplication);
         setCurrentProfileApplication(newApplication);
      }
   };

   const handleGetProfileDocuments = async () => {
      setFilesLoader(true);

      const setDocs = async (profileDocs: IFileDataWithBlob[]) => {
         await Promise.all(
           profileDocs.map(async (doc) => {
              const file = await createFileFromURL(
                doc.file,
                doc.id + doc.fileExtension,
                createMimeType(doc.fileExtension)
              );
              handleChangeFiles(doc.description, file);
           })
         );
      };

      if (currentProfileDocuments.length === 0 && profileApplication) {
         const profileDocs = await getFilesWithBlobByFilters({
            UserId: currentProfile!.userId,
            FileType: FileTypes.document
         });
         const filteredFiles = profileDocs.filter(el => Object.values(filesDescriptions).includes(el.description));

         if (filteredFiles.length > 4) {
            setCurrentProfileDocuments(filteredFiles.slice(0, 4));
            await setDocs(filteredFiles.slice(0, 4));
         } else {
            setCurrentProfileDocuments(filteredFiles);
            await setDocs(filteredFiles);
         }
      } else {
         await setDocs(currentProfileDocuments);
      }
      setFilesLoader(false);
   };

   useEffect(() => {
      handleGetProfileDocuments();
   }, []);


   return (
     <div className="container">
        {!isLargeTablet && (
          <div className="createApplication__back">
             <BackButton action={handleBack}/>
          </div>
        )}

        <h2 className="typography-h2 createApplication__row_title">Данные</h2>

        <form onSubmit={handleSubmit} className="createApplication__row">
           {(!isMobile || mobileFormStep === 1) && (
             <div className="createApplication__form createApplication__profileEdit">
                {!isMobile && (
                  <h4 className="typography-h5">Личная информация</h4>
                )}
                <ProfileEditForm profile={profileData} onChange={handleChangeProfile} errors={profileErrors}/>
                {isMobile && (
                  <Button text={"Продолжить"} type={"button"} loading={loader} size={"large"} fullWidth
                          action={() => formProfileValidator() ? setMobileFormStep(2) : null}
                          clx={"createApplication__form_submit"}/>
                )}
             </div>
           )}
           <div className="createApplication__form createApplication__main">
              {(!isMobile || mobileFormStep === 2) && (
                <>
                   {!isMobile && (
                     <h4 className="typography-h5">Профессиональная информация</h4>
                   )}
                   <ApplicationDataForm application={applicationData} onChange={handleChangeApplication}
                                        errors={applicationErrors}/>
                   {isMobile && (
                     <Button text={"Продолжить"} type={"button"} loading={loader} size={"large"} fullWidth
                             action={() => formApplicationValidator() ? setMobileFormStep(3) : null}
                             clx={"createApplication__form_submit"}/>
                   )}
                </>
              )}

              {(!isMobile || mobileFormStep === 3) && (
                <>
                   <ApplicationUploadForm handleChangeFiles={handleChangeFiles} files={files}
                                          filesErrors={filesErrors} filesLoader={filesLoader}/>
                   <Button clx={"createApplication__form_submit"} text={"Отправить"}
                           type={"submit"} loading={loader || filesLoader} size={"large"} fullWidth/>
                </>
              )}
           </div>
        </form>
     </div>
   );
};

export default CreateApplicationForm;
