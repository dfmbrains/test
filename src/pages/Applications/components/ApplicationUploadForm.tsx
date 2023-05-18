import React from "react";
import ApplicationUploadDocument, {IApplicationFiles} from "./ApplicationUploadDocument";
import {filesDescriptions} from "../../../models/api";

const ApplicationUploadForm = ({files, handleChangeFiles, filesErrors, filesLoader}: {
   files: IApplicationFiles, filesErrors: boolean, filesLoader: boolean,
   handleChangeFiles: (key: filesDescriptions, file: File | null) => void
}) => {

   return (
     <>
        <h4 className="typography-h5">Загрузите документы</h4>
        <div className="createApplication__form_documents">
           <ApplicationUploadDocument handleChange={handleChangeFiles} title={"Диплом"}
                                      name={filesDescriptions.diploma} error={!files.doc_diplom && filesErrors}
                                      file={files.doc_diplom} filesLoader={filesLoader}/>
           <ApplicationUploadDocument handleChange={handleChangeFiles} title={"Лицензия"}
                                      name={filesDescriptions.license} error={!files.doc_license && filesErrors}
                                      file={files.doc_license} filesLoader={filesLoader}/>
        </div>

        <h4 className="typography-h5"> Документ удостоверяющий личность</h4>
        <div className="createApplication__form_documents">
           <ApplicationUploadDocument handleChange={handleChangeFiles} title={"Передняя сторона"}
                                      name={filesDescriptions.docFront} error={!files.doc_front_id && filesErrors}
                                      file={files.doc_front_id} filesLoader={filesLoader}/>
           <ApplicationUploadDocument handleChange={handleChangeFiles} title={"Задняя сторона"}
                                      name={filesDescriptions.docBack} error={!files.doc_back_id && filesErrors}
                                      file={files.doc_back_id} filesLoader={filesLoader}/>
        </div>
     </>
   );
};

export default ApplicationUploadForm;