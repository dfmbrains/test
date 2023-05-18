import React, {useEffect, useRef, useState} from "react";
import {AddIcon, DeleteIcon, EditIcon, OkIcon} from "../../../assets/icons/html-icons";
import {useRecoilState} from "recoil";
import {currentProfileTemplatesState} from "../../../store/clinic/clinic.states";
import {getReferralTemplates} from "../../../api/clinic.api";
import Loader from "../../../components/Loader";
import {IPrice} from "../../../models/Dictionaries";
import ConfirmationModal from "../../../components/Modals/ConfirmationModal";
import {ITemplatesErrors, templatesLoading, templatesUpdateTypes} from "../index";
import FormHelperText from "../../../components/FormHelperText";
import {ITemplateService} from "../../../models/clinic";
import TemplateServiceItem from "./TemplateServiceItem";

const UpdateTemplateTitleInput = ({text, setUpdatedTemplateTitle}: {
   text: string,
   setUpdatedTemplateTitle: (string: string) => void
}) => {
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus();
      }
   }, []);

   return (
     <input required type="text" placeholder="Название шаблона"
            defaultValue={text} className="typography-h6" ref={inputRef}
            onChange={e => setUpdatedTemplateTitle(e.target.value)}/>
   );
};

const TemplatesSidebar = ({
                             handleDeleteTemplate,
                             selectedServices,
                             handleRemoveSelectedService,
                             setTemplateTitle,
                             templateTitle,
                             setUpdatedTemplateTitle,
                             setUpdateId,
                             updateId,
                             handleSubmit,
                             updatedTemplateTitle,
                             setSelectedServices,
                             loading,
                             setLoading,
                             updateType,
                             setUpdateType,
                             errors
                          }: {
   selectedServices: IPrice[] | ITemplateService[],
   setSelectedServices: (services: IPrice[] | ITemplateService[]) => void,
   setLoading: (status: templatesLoading) => void,
   setTemplateTitle: (title: string) => void,
   handleDeleteTemplate: (templateId: string) => Promise<void>,
   setUpdateType: (title: templatesUpdateTypes) => void,
   templateTitle: string,
   loading: templatesLoading,
   updateType: templatesUpdateTypes,
   setUpdatedTemplateTitle: (title: string) => void,
   setUpdateId: (title: string) => void,
   updateId: string,
   updatedTemplateTitle: string,
   handleRemoveSelectedService: (code: string) => void
   errors: ITemplatesErrors
   handleSubmit: () => Promise<void>
}) => {
   const [templates, setTemplates] = useRecoilState(currentProfileTemplatesState);

   const [fetchLoading, setFetchLoading] = useState<boolean>(false);

   const [deleteTemplateId, setDeleteTemplateId] = useState<string>("");
   const [isRemoveService, setIsRemoveService] = useState<boolean>(false);


   const startUpdateTitle = (id: string, name: string) => {
      setUpdateType("update-title");
      setUpdateId(id);
      setUpdatedTemplateTitle(name);
   };
   const handleSubmitUpdateTitle = (name: string) => {
      if (updatedTemplateTitle !== name) {
         handleSubmit();
      } else {
         setUpdateId("");
         setUpdatedTemplateTitle("");
         setUpdateType(false);
      }
   };
   const startUpdateServices = (id: string, services: ITemplateService[], type: templatesUpdateTypes) => {
      setUpdateType(type);
      setUpdateId(id);

      setSelectedServices(services);

      if (type === "remove-service") {
         setIsRemoveService(true);
      }
   };
   const handleSubmitUpdateServices = async (services: ITemplateService[]) => {
      if (isRemoveService) {
         await handleSubmit();
         setIsRemoveService(false);

         return;
      }

      const isNotChanged = services.every(service => selectedServices.some(selected => selected.code === service.code)) && selectedServices.every(selected => services.some(service => selected.code === service.code));
      if (!isNotChanged) {
         await handleSubmit();
      } else {
         setUpdateId("");
         setUpdateType(false);
         setSelectedServices([]);
      }
   };
   const handleDelete = async () => {
      setLoading("deleting");
      await handleDeleteTemplate(deleteTemplateId);
      setDeleteTemplateId("");
   };

   useEffect(() => {
      if (templates.length === 0) {
         setFetchLoading(true);
         getReferralTemplates(1, 10)
           .then(templates => templates.results.length > 0 && setTemplates(templates.results))
           .finally(() => setFetchLoading(false));
      }
   }, [templates]);

   return (
     <>
        <div className="templatesSidebar">
           <div className="templatesSidebar__box">
              <h2 className="typography-h3">Мои шаблоны</h2>
              <div className="templatesSidebar__list">
                 <div
                   className={`templatesSidebar__newItem templatesSidebar__newItem_${selectedServices.length > 0 && !updateId ? "active" : "disabled"}`}
                 >
                    <label>
                       <input required type="text" placeholder="Название шаблона" value={templateTitle}
                              onChange={e => setTemplateTitle(e.target.value)}/>
                       {errors.createTitle.required && selectedServices.length > 0 && (
                         <FormHelperText text={errors.createTitle.required}/>
                       )}
                    </label>
                    <div className="templatesSidebar__item_list">
                       {!updateType && selectedServices.map(service => (
                         <TemplateServiceItem key={service.code} title={service.name}
                                              action={() => handleRemoveSelectedService(service.code)}/>
                       ))}
                    </div>
                 </div>

                 <div className="templatesSidebar__profileTemplates">
                    {fetchLoading && (
                      <div className="templatesSidebar__loading">
                         <Loader window={false} size={"medium"}/>
                      </div>
                    )}

                    {templates.map(template => {
                       const isActive = template.id === updateId;

                       return (
                         <div key={template.id}
                              className={`templatesSidebar__item templatesSidebar__item_${isActive ? "active" : "disabled"}`}>
                            <div className="templatesSidebar__item_header">
                               {updateType === "update-title" && isActive
                                 ? <div className="templatesSidebar__item_header-input">
                                    <UpdateTemplateTitleInput text={template.name}
                                                              setUpdatedTemplateTitle={setUpdatedTemplateTitle}/>
                                    {errors.updateTitle.required && (
                                      <FormHelperText text={errors.updateTitle.required}/>
                                    )}
                                 </div>
                                 : <h5 className="typography-h6">{template.name}</h5>
                               }
                               <div className="templatesSidebar__item_iconButtons">
                                  {/*update title*/}
                                  {updateType === "update-title" && isActive
                                    ? <button className="templates__iconButton templates__iconButton_active"
                                              onClick={() => handleSubmitUpdateTitle(template.name)}
                                              disabled={!!loading}>
                                       {loading === "updating" ? <Loader window={false} size={"small"}/> : <OkIcon/>}
                                    </button>
                                    : <button onClick={() => startUpdateTitle(template.id, template.name)}
                                              disabled={!!loading} className="templates__iconButton"><EditIcon/>
                                    </button>
                                  }
                                  {/*add services*/}
                                  {updateType === "add-services" && isActive
                                    ? <button className="templates__iconButton templates__iconButton_active"
                                              onClick={() => handleSubmitUpdateServices(template.services)}
                                              disabled={!!loading}>
                                       {loading === "updating" ? <Loader window={false} size={"small"}/> : <OkIcon/>}
                                    </button>
                                    : <button className="templates__iconButton" disabled={!!loading}
                                              onClick={() => startUpdateServices(template.id, template.services, "add-services")}>
                                       <AddIcon/>
                                    </button>
                                  }
                                  {/*delete template*/}
                                  <button onClick={() => setDeleteTemplateId(template.id)} disabled={!!loading}
                                          className="templates__iconButton"><DeleteIcon/></button>
                               </div>
                            </div>
                            <div className="templatesSidebar__item_list">
                               {template.services.map(service => (
                                 <TemplateServiceItem key={service.code} title={service.name}
                                                      action={() => startUpdateServices(template.id, template.services.filter(el => el.code !== service.code), "remove-service")}/>
                               ))}
                            </div>
                         </div>
                       );
                    })}
                 </div>
              </div>
           </div>
        </div>
        {deleteTemplateId && (
          <ConfirmationModal closeModal={() => setDeleteTemplateId("")} loading={loading === "deleting"}
                             title={"Вы действительно хотите удалить шаблон?"} needModalLayout={true}
                             onAccept={handleDelete}/>
        )}
        {isRemoveService && (
          <ConfirmationModal closeModal={() => setIsRemoveService(false)} loading={loading === "updating"}
                             title={"Вы действительно хотите удалить услугу?"} needModalLayout={true}
                             onAccept={() => handleSubmitUpdateServices(selectedServices)}/>
        )}
     </>
   );
};

export default TemplatesSidebar;