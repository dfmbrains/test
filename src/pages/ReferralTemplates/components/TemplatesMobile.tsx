import React, {useState} from "react";
import BackButton from "../../../components/BackButton/BackButton";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {currentProfileTemplatesState} from "../../../store/clinic/clinic.states";
import {handleWordAnalyseByCounter} from "./TemplatesCreate";
import {AddIcon, EditIcon} from "../../../assets/icons/html-icons";
import Button from "../../../components/Button";
import BottomSheet from "../../../components/BottomSheet";
import {IReferralTemplate} from "../../../models/clinic";
import TemplateServiceItem from "./TemplateServiceItem";

const TemplatesMobile = () => {
   const navigate = useNavigate();

   const [templates] = useRecoilState(currentProfileTemplatesState);

   const [selectedTemplate, setSelectedTemplate] = useState<IReferralTemplate | null>(null);

   const handleBack = () => navigate(-1);

   return (
     <>
        <BackButton action={handleBack}/>
        <div className="templatesMobile">
           <h2 className="typography-h2">Мои шаблоны</h2>

           <div className="templatesMobile__content">
              <div className="templatesMobile__item templatesMobile__newItem">
                 <div className="templatesMobile__item_left">
                    <h3 className="typography-h3">Название шаблона</h3>
                    <p>15 анализов</p>
                 </div>
                 <span className="templatesMobile__item_edit">
                      <EditIcon/>
                   </span>
              </div>
              {templates.map(template => (
                <div className="templatesMobile__item">
                   <div className="templatesMobile__item_left">
                      <h3 className="typography-h3">{template.name}</h3>
                      <p>{template.services.length} {handleWordAnalyseByCounter(template.services.length)}</p>
                   </div>
                   <span onClick={() => setSelectedTemplate(template)} className="templatesMobile__item_edit">
                      <EditIcon/>
                   </span>
                </div>
              ))}
           </div>
        </div>
        <Button text={"Создать новый шаблон"} clx={"templatesMobile__submit"}/>

        {selectedTemplate && (
          <BottomSheet title={"Редактировать"} closeAction={() => setSelectedTemplate(null)}>
             <div className="templatesMobile__edit">
                <label className="templatesMobile__edit_label">
                   <input type="text" placeholder={"Название шаблона"} defaultValue={selectedTemplate.name}/>
                   <EditIcon/>
                </label>

                <div className="templatesMobile__edit_services">
                   {selectedTemplate.services.map(el => (
                     <TemplateServiceItem key={el.code} title={el.name}
                                          action={() => null}/>
                   ))}
                </div>

                <div className="templatesMobile__edit_btns">
                   <Button startIcon={<AddIcon/>} text={"Добавить анализы"} variant={"outlined"}/>
                   <Button text={"Сохранить"} variant={"contained"}/>
                   <p className="typography-h3">Удалить шаблон</p>
                </div>
             </div>
          </BottomSheet>
        )}
     </>
   );
};

export default TemplatesMobile;