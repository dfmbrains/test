import React, {useEffect, useState} from "react";
import "./templates.scss";
import TemplatesSidebar from "./components/TemplatesSidebar";
import TemplatesCreate from "./components/TemplatesCreate";
import {IPrice} from "../../models/Dictionaries";
import {
   createReferralTemplate, deleteReferralTemplate,
   ICreateReferralTemplateBody,
   IUpdateReferralTemplateBody,
   updateReferralTemplate
} from "../../api/clinic.api";
import {useRecoilState} from "recoil";
import {currentProfileTemplatesState} from "../../store/clinic/clinic.states";
import {IFormError} from "../../models";
import {ITemplateService} from "../../models/clinic";
import useMediaQuery from "../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../helpers/constants";
import TemplatesMobile from "./components/TemplatesMobile";

export type ITemplatesErrors = {
   [key in "createTitle" | "updateTitle"]: IFormError;
};

export type templatesLoading = "creating" | "updating" | "deleting" | false
export type templatesUpdateTypes = "update-title" | "add-services" | "remove-service" | false

const ReferralTemplates = () => {
   const isLargeTable = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const [templates, setTemplates] = useRecoilState(currentProfileTemplatesState);

   const [selectedServices, setSelectedServices] = useState<IPrice[] | ITemplateService[]>([]);
   const [templateTitle, setTemplateTitle] = useState<string>("");

   const [updatedTemplateTitle, setUpdatedTemplateTitle] = useState<string>("");
   const [updateId, setUpdateId] = useState<string>("");
   const [updateType, setUpdateType] = useState<templatesUpdateTypes>(false);

   const [loading, setLoading] = useState<templatesLoading>(false);
   const [errors, setErrors] = useState<ITemplatesErrors>({
      createTitle: {matches: "", required: ""},
      updateTitle: {matches: "", required: ""}
   });

   const handleAddSelectedService = (service: IPrice) => {
      setSelectedServices((prevState) => [...prevState, service]);
   };
   const handleRemoveSelectedService = (code: string) => {
      setSelectedServices((prevState) => prevState.filter(el => el.code !== code));
   };

   const handleValidateCreate = () => {
      setErrors((prevState) => (
        {
           ...prevState,
           createTitle: {...prevState.createTitle, required: templateTitle ? "" : "Напишите название"}
        }
      ));

      return !!templateTitle;
   };
   const handleValidateUpdate = () => {
      setErrors((prevState) => (
        {
           ...prevState,
           updateTitle: {...prevState.updateTitle, required: updatedTemplateTitle ? "" : "Напишите название"}
        }
      ));

      return !!updatedTemplateTitle;
   };
   const handleDeleteTemplate = async (deleteTemplateId: string) => {
      await deleteReferralTemplate(deleteTemplateId);

      setTemplates((prevState) => prevState.filter(template => template.id !== deleteTemplateId));
      setLoading(false);
   };
   const handleSubmit = async (type: "update" | "create") => {
      const validate = type === "create" ? handleValidateCreate() : updateType === "update-title" ? handleValidateUpdate() : true;

      if (validate) {
         if (type === "update") {
            setLoading("updating");

            try {
               const prevTemplate = templates.find(templ => templ.id === updateId)!;
               const template: IUpdateReferralTemplateBody = {
                  name: "",
                  id: updateId,
                  created: prevTemplate?.created ? prevTemplate.created : new Date(),
                  services: [],
               };

               if (updateType === "update-title") {
                  template.name = updatedTemplateTitle;
                  template.services = prevTemplate.services;

                  setUpdatedTemplateTitle("");
               } else if (updateType === "add-services" || updateType === "remove-service") {
                  template.services = selectedServices;
                  template.name = prevTemplate.name;

                  setSelectedServices([]);
               }

               if (template.services.length === 0) {
                  await handleDeleteTemplate(updateId);
               } else {
                  await updateReferralTemplate(template);
                  setTemplates((prevState) => {
                     const newState = [...prevState];
                     const indexForUpdate = newState.findIndex(templ => templ.id === updateId);

                     newState[indexForUpdate] = {
                        ...template,
                        userId: prevTemplate.userId,
                        created: template.created
                     };

                     return newState;
                  });
               }
            } catch (e) {
               console.log(e);
            }

            setUpdateId("");
            setUpdateType(false);
         } else if (type === "create") {
            setLoading("creating");

            const template: ICreateReferralTemplateBody = {
               services: selectedServices.map(el => ({code: el.code, name: el.name})),
               name: templateTitle,
               created: new Date(),
               deviceId: crypto.randomUUID(),
            };

            const newTemplate = await createReferralTemplate(template);
            setTemplates((prevState) => [newTemplate, ...prevState]);

            setSelectedServices([]);
            setTemplateTitle("");
         }

         setLoading(false);
      }
   };

   useEffect(() => {
      setErrors((prevState) => (
        {...prevState, createTitle: {...prevState.createTitle, required: ""}}
      ));
   }, [updateType]);

   return (
     <section className="templates">
        <div className="container">
           {isLargeTable
             ? <div className="templates__row">
                <TemplatesSidebar handleRemoveSelectedService={handleRemoveSelectedService}
                                  selectedServices={selectedServices} setUpdatedTemplateTitle={setUpdatedTemplateTitle}
                                  setTemplateTitle={setTemplateTitle} templateTitle={templateTitle}
                                  setUpdateType={setUpdateType} handleDeleteTemplate={handleDeleteTemplate}
                                  updatedTemplateTitle={updatedTemplateTitle} setSelectedServices={setSelectedServices}
                                  setUpdateId={setUpdateId} updateId={updateId} errors={errors} updateType={updateType}
                                  handleSubmit={() => handleSubmit("update")} loading={loading} setLoading={setLoading}
                />
                <TemplatesCreate handleRemoveSelectedService={handleRemoveSelectedService} updateType={updateType}
                                 loading={loading} handleSubmit={() => handleSubmit("create")} setUpdateId={setUpdateId}
                                 setSelectedServices={setSelectedServices} setUpdateType={setUpdateType}
                                 selectedServices={selectedServices} handleAddSelectedService={handleAddSelectedService}

                />
             </div>
             : <>
                <TemplatesMobile/>
             </>
           }
        </div>
     </section>
   );
};

export default ReferralTemplates;