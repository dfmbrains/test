import React, {useRef} from "react";
import FormHelperText from "../../../components/FormHelperText";
import DocumentSvg from "../../../assets/icons/otherDocument.svg";
import PdfSvg from "../../../assets/icons/pdf.svg";
import {filesDescriptions} from "../../../models/api";
import Loader from "../../../components/Loader";

type ApplicationFilesTypes = File | null

export type IApplicationFiles = {
   [key in filesDescriptions]: ApplicationFilesTypes;
};

const ApplicationUploadDocument = ({handleChange, title, name, error, file, filesLoader}: {
   handleChange: (key: filesDescriptions, file: File | null) => void, filesLoader: boolean
   title: string, name: keyof IApplicationFiles, error: boolean, file: ApplicationFilesTypes
}) => {
   const fileInputRef = useRef<HTMLInputElement | null>(null);

   return (
     <div style={{borderColor: error ? "#d32f2f" : "#E5EBFF"}}
          onClick={() => !filesLoader ? fileInputRef.current?.click() : null}
          className={`applicationUploadDocument ${filesLoader ? "" : "applicationUploadDocument__active"}`}>
        <input hidden accept="application/pdf,image/*,.doc, .docx" type="file" ref={fileInputRef}
               onChange={(e) => handleChange(name, e.target.files ? e.target.files[0] : null)}/>

        {filesLoader
          ? <Loader size={"small"} window={false}/>
          : file
            ? file.type.startsWith("image/")
              ? <img className="applicationUploadDocument__img" src={URL.createObjectURL(file)} alt={file.name}/>
              : file.type === "application/pdf"
                ? <img src={PdfSvg} alt="pdf"/>
                : <img src={DocumentSvg} alt="document file"/>
            : <svg width="28" height="28" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fill="#FD385B"
                     d="M0.813917 14.4863C1.02978 14.4863 1.2368 14.5721 1.38944 14.7247C1.54208 14.8774 1.62783 15.0844 1.62783 15.3002V19.3698C1.62783 19.8016 1.79934 20.2156 2.10462 20.5209C2.40989 20.8262 2.82394 20.9977 3.25567 20.9977H22.7897C23.2214 20.9977 23.6355 20.8262 23.9407 20.5209C24.246 20.2156 24.4175 19.8016 24.4175 19.3698V15.3002C24.4175 15.0844 24.5033 14.8774 24.6559 14.7247C24.8085 14.5721 25.0156 14.4863 25.2314 14.4863C25.4473 14.4863 25.6543 14.5721 25.807 14.7247C25.9596 14.8774 26.0454 15.0844 26.0454 15.3002V19.3698C26.0454 20.2333 25.7023 21.0614 25.0918 21.6719C24.4812 22.2825 23.6531 22.6255 22.7897 22.6255H3.25567C2.39221 22.6255 1.56412 22.2825 0.953564 21.6719C0.343007 21.0614 0 20.2333 0 19.3698V15.3002C0 15.0844 0.0857518 14.8774 0.238391 14.7247C0.39103 14.5721 0.598053 14.4863 0.813917 14.4863Z"/>
               <path fill="#FD385B"
                     d="M12.4462 17.6685C12.5218 17.7443 12.6116 17.8044 12.7105 17.8455C12.8094 17.8865 12.9154 17.9076 13.0224 17.9076C13.1295 17.9076 13.2355 17.8865 13.3344 17.8455C13.4333 17.8044 13.5231 17.7443 13.5987 17.6685L18.4822 12.785C18.635 12.6322 18.7209 12.4249 18.7209 12.2088C18.7209 11.9926 18.635 11.7853 18.4822 11.6325C18.3293 11.4797 18.1221 11.3938 17.9059 11.3938C17.6898 11.3938 17.4825 11.4797 17.3297 11.6325L13.8363 15.1275V0.813917C13.8363 0.598053 13.7506 0.39103 13.598 0.238391C13.4453 0.0857517 13.2383 0 13.0224 0C12.8066 0 12.5995 0.0857517 12.4469 0.238391C12.2943 0.39103 12.2085 0.598053 12.2085 0.813917V15.1275L8.71517 11.6325C8.56234 11.4797 8.35506 11.3938 8.13892 11.3938C7.92278 11.3938 7.7155 11.4797 7.56267 11.6325C7.40983 11.7853 7.32397 11.9926 7.32397 12.2088C7.32397 12.4249 7.40983 12.6322 7.56267 12.785L12.4462 17.6685Z"/>
            </svg>
        }
        <div>
           <h5 className="typography-h6">{title}</h5>
           {error && <FormHelperText text={"Загрузите этот документ"}/>}
        </div>
     </div>
   );
};

export default ApplicationUploadDocument;