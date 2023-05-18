import React, {FC, useEffect, useState} from "react";
import TextField from "../../../components/TextField/TextField";
import {ICreateApplicationBody} from "../../../api/applications.api";
import Select from "../../../components/Select";
import {useDebounce} from "../../../hooks/useDebounce";
import {getClinicById, getClinics, getSpecializationById, getSpecializations} from "../../../api/clinic.api";
import {IClinic, ISpecialization} from "../../../models/Dictionaries";
import {IFormError} from "../../../models";
import FormHelperText from "../../../components/FormHelperText";
import {getAddress} from "../../../api/geo.api";

interface IProfileEditForm {
   application: ICreateApplicationBody,
   onChange: (value: string | number | boolean | Date, key: keyof ICreateApplicationBody) => void
   errors: IApplicationCreateErrors
}

export interface IApplicationCreateErrors {
   specializationId: IFormError;
   clinicId: IFormError;
   experience: IFormError;
}

interface ISearchState {
   value: string,
   needRequest: boolean
}

const ApplicationDataForm: FC<IProfileEditForm> = ({application, errors, onChange}) => {
   //search specializations
   const [specializations, setSpecializations] = useState<ISpecialization[]>([]);
   const [searchSpec, setSearchSpec] = useState<ISearchState>({value: "", needRequest: false});
   const [loadingSpec, setLoadingSpec] = useState<boolean>(false);
   const debouncedSpec = useDebounce(searchSpec.value);

   const handleChangeSpec = (specialization: ISpecialization) => {
      onChange(specialization.id, "specializationId");
      setSearchSpec({value: specialization.name, needRequest: false});
   };

   useEffect(() => {
      if (debouncedSpec.length > 0 && searchSpec.needRequest) {
         setLoadingSpec(true);
         getSpecializations({name: debouncedSpec, onlyActive: false})
           .then(res => {
              setSpecializations(res.results);
              setLoadingSpec(false);
           });
      }
   }, [debouncedSpec]);

   //search clinics
   const [clinics, setClinics] = useState<IClinic[]>([]);
   const [searchClinics, setSearchClinics] = useState<ISearchState>({value: "", needRequest: false});
   const [loadingClinics, setLoadingClinics] = useState<boolean>(false);
   const debouncedClinic = useDebounce(searchClinics.value);

   const handleChangeClinic = async (clinic: IClinic) => {
      onChange(clinic.id, "clinicId");
      setSearchClinics({value: clinic.name, needRequest: false});
      if (clinic.regionCode) {
         onChange(clinic.regionCode, "regionCode");
      } else {
         setLoadingClinics(true);
         const address = await getAddress({Lat: clinic.lat, Lon: clinic.lon});
         onChange(address.regionCode, "regionCode");
         setLoadingClinics(false);
      }
   };

   useEffect(() => {
      if (debouncedClinic.length > 0 && searchClinics.needRequest) {
         setLoadingClinics(true);
         getClinics({name: debouncedClinic, Page: 1, PageSize: 20})
           .then(res => {
              setClinics(res.results);
              setLoadingClinics(false);
           });
      }
   }, [debouncedClinic]);

   useEffect(() => {
      if (application.specializationId) {
         setLoadingSpec(true);
         getSpecializationById(application.specializationId)
           .then((specialization) => {
              setSpecializations([specialization]);
              setSearchSpec({value: specialization.name, needRequest: false});
           })
           .finally(() => setLoadingSpec(false));
      }
      if (application.clinicId) {
         setLoadingClinics(true);
         getClinicById(application.clinicId)
           .then((clinic) => {
              setClinics([clinic]);
              setSearchClinics({value: clinic.name, needRequest: false});
           })
           .finally(() => setLoadingClinics(false));
      }
   }, []);

   return (
     <div className="applicationMainForm">
        <div>
           <TextField placeholder="Стаж в годах" type="number"
                      error={!!(errors.experience.required || errors.experience.matches)}>
              <input value={application.experience} name={"experience"} type={"number"} placeholder={"Стаж в годах"}
                     onChange={e => onChange(e.target.value, "experience")}/>
           </TextField>
           {(errors.experience.required || errors.experience.matches) && (
             <FormHelperText text={errors.experience.required || errors.experience.matches}/>
           )}
        </div>

        <div>
           <TextField placeholder="Выберите cпециализацию" type="text"
                      error={!!(errors.specializationId.required || errors.specializationId.matches)}>
              <Select onChange={handleChangeSpec} loading={loadingSpec}
                      getOptionLabel={(v: ISpecialization) => v.name} isOptionsString={false}
                      placeholder={"Выберите cпециализацию"} options={specializations} searchValue={searchSpec.value}
                      setSearchValue={(value) => setSearchSpec({value, needRequest: true})}/>
           </TextField>
           {(errors.specializationId.required) && (
             <FormHelperText text={errors.specializationId.required}/>
           )}
        </div>

        <div>
           <TextField placeholder="Выберите клинику" type="text"
                      error={!!(errors.clinicId.required || errors.clinicId.matches)}>
              <Select onChange={handleChangeClinic} loading={loadingClinics}
                      getOptionLabel={(v: IClinic) => v.name} isOptionsString={false}
                      placeholder={"Выберите клинику"} options={clinics} searchValue={searchClinics.value}
                      setSearchValue={(value) => setSearchClinics({value, needRequest: true})}/>
           </TextField>
           {(errors.clinicId.required) && (
             <FormHelperText text={errors.clinicId.required}/>
           )}
        </div>
     </div>
   );
};

export default ApplicationDataForm;