import React, {useEffect, useRef, useState} from "react";
import {AddIcon, OkIcon} from "../../../assets/icons/html-icons";
import {getPrices, IGetPricesParams, IGetPricesResponse} from "../../../api/price.api";
import {IPrice, serviceTypes} from "../../../models/Dictionaries";
import Loader from "../../../components/Loader";
import {useDebounce} from "../../../hooks/useDebounce";
import Button from "../../../components/Button";
import {templatesLoading, templatesUpdateTypes} from "../index";
import {ITemplateService} from "../../../models/clinic";
import {sortTypes} from "../../../models/api";

const TemplatesCreate = ({
                            selectedServices,
                            handleAddSelectedService,
                            handleRemoveSelectedService,
                            loading,
                            handleSubmit,
                            setSelectedServices,
                            updateType,
                            setUpdateId,
                            setUpdateType
                         }: {
   selectedServices: IPrice[] | ITemplateService[], loading: templatesLoading,
   handleAddSelectedService: (service: IPrice) => void,
   handleRemoveSelectedService: (code: string) => void
   setUpdateId: (updateId: string) => void
   setUpdateType: (type: templatesUpdateTypes) => void
   handleSubmit: () => void,
   setSelectedServices: (services: IPrice[]) => void,
   updateType: templatesUpdateTypes,
}) => {
   const isFirstRender = useRef(true);

   const [services, setServices] = useState<IGetPricesResponse | null>(null);
   const [fetchLoading, setFetchLoading] = useState<boolean>(false);

   const [category, setCategory] = useState<serviceTypes>("research");

   const [searchServices, setSearchServices] = useState<string>("");

   const debounced = useDebounce(searchServices);

   const handleGetPrices = (needCategory: boolean) => {
      setFetchLoading(true);

      const params: IGetPricesParams = {
         regionCode: "KZ_R_2",
         Provider: "Invivo",
         StrFind: searchServices,
         sortyBy: "name",
         sortType: sortTypes.Ascending
      };
      if (needCategory) {
         params.TypeCode = category;
      }

      getPrices(params)
        .then(response => {
           setServices(response);
        })
        .finally(() => setFetchLoading(false));
   };

   useEffect(() => {
      handleGetPrices(true);
      isFirstRender.current = false;
   }, [category]);

   useEffect(() => {
      if (!isFirstRender.current) {
         handleGetPrices(false);
      }
   }, [debounced]);

   return (
     <div className="templatesCreate">
        <h2 className="typography-h3">Создать новый шаблон</h2>
        <label className="templatesCreate__search">
           <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="#FD385B" strokeWidth="1.5" strokeMiterlimit="10"
                    d="M12.0909 3.5C10.3918 3.5 8.7308 4.00385 7.31804 4.94782C5.90528 5.8918 4.80417 7.23351 4.15394 8.80328C3.50372 10.3731 3.33359 12.1004 3.66507 13.7669C3.99655 15.4333 4.81476 16.9641 6.01621 18.1655C7.21766 19.367 8.74841 20.1852 10.4149 20.5166C12.0813 20.8481 13.8087 20.678 15.3784 20.0278C16.9482 19.3776 18.2899 18.2764 19.2339 16.8637C20.1779 15.4509 20.6817 13.79 20.6817 12.0909C20.6816 9.81247 19.7764 7.62743 18.1654 6.01636C16.5543 4.4053 14.3693 3.50015 12.0909 3.5Z"/>
              <path d="M18.5 18.5L24.4998 24.4998" stroke="#FD385B" strokeWidth="1.5" strokeMiterlimit="10"
                    strokeLinecap="round"/>
           </svg>
           <input onChange={e => setSearchServices(e.target.value)} type="text" placeholder={"Поиск"}/>
        </label>
        <div className="templatesCreate__tools">
           <div className="templatesCreate__categories">
              <p onClick={() => !fetchLoading && setCategory("research")}
                 className={`typography-h6 templatesCreate__categories_${category === "research" ? "active" : "disabled"}`}>Анализы</p>
              <p onClick={() => !fetchLoading && setCategory("package")}
                 className={`typography-h6 templatesCreate__categories_${category === "package" ? "active" : "disabled"}`}>Чекапы</p>
           </div>
           {selectedServices.length > 0 && (
             <div className="templatesCreate__submit">
                <div className="templatesCreate__submit_info">
                   <h6 className="typography-h6">{handleWordAddedByCounter(selectedServices.length)}</h6>
                   <p className="typography-h6">
                      {selectedServices.length} {handleWordAnalyseByCounter(selectedServices.length)}
                   </p>
                </div>
                {updateType === "add-services"
                  ? <Button disabled={!!loading} action={() => {
                     setUpdateId("");
                     setUpdateType(false);
                     setSelectedServices([]);
                  }} loading={loading === "creating"} text={"Отменить"} size={"small"}/>
                  : <Button disabled={!!loading} action={handleSubmit} loading={loading === "creating"}
                            text={"Создать"} size={"small"}/>
                }
             </div>
           )}
        </div>

        <div className="templatesCreate__services">
           {fetchLoading ?
             <div className="templatesCreate__services_loader">
                <Loader window={false} size={"medium"}/>
             </div>
             : services && services.results.length > 0
               ? services.results.map(service => (
                 <div key={service.code} className="templatesCreate__services_item">
                    <p className="typography-h5">{service.name}</p>
                    {selectedServices.some(selected => selected.code === service.code)
                      ? <button onClick={() => handleRemoveSelectedService(service.code)} disabled={!!loading}
                                className={`templates__iconButton templates__iconButton_active`}><OkIcon/></button>
                      : <button onClick={() => handleAddSelectedService(service)}
                                className="templates__iconButton" disabled={!!loading}><AddIcon/></button>
                    }
                 </div>
               ))
               : <p className="typography-h4">Ничего не найдено</p>
           }
        </div>
     </div>
   );
};

export default TemplatesCreate;

export function handleWordAnalyseByCounter(count: number) {
   switch (count) {
      case 1:
         return "анализ";
      case 2 | 3:
         return "анализа";
      default:
         return "анализов";
   }
}

export function handleWordAddedByCounter(count: number) {
   switch (count) {
      case 1:
         return "Добавлен";
      default:
         return "Добавлено";
   }
}