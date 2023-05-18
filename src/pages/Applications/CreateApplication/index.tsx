import React from "react";
import "./createApplication.scss";
import ApplicationWaiting from "../components/ApplicationWaiting";
import CreateApplicationForm from "../components/CreateApplicationForm";
import {Navigate, useSearchParams} from "react-router-dom";
import {ProfileRoles} from "../../../models/profiles";
import CreateApplicationChooseRole from "../components/CreateApplicationChooseRole";
import useMediaQuery from "../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../helpers/constants";
import CreateApplicationNurse from "../components/CreateApplicationNurse";
import {useRecoilValue} from "recoil";
import {currentProfileApplicationState} from "../../../store/applications/application.states";
import {applicationsStatuses} from "../../../models/clinic";

const CreateApplication = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const profileApplication = useRecoilValue(currentProfileApplicationState);

   const [searchParams] = useSearchParams();

   return (
     <section className="createApplication">
        {profileApplication?.status === applicationsStatuses.created
          ? <ApplicationWaiting/>
          : (searchParams.get("role") as ProfileRoles) === ProfileRoles.doctor
            ? <CreateApplicationForm/>
            : (searchParams.get("role") as ProfileRoles) === ProfileRoles.nurse
              ? <CreateApplicationNurse/>
              : !isLargeTablet
                ? <CreateApplicationChooseRole/>
                : <Navigate to={`?role=${ProfileRoles.doctor}`}/>
        }
     </section>
   );
};

export default CreateApplication;