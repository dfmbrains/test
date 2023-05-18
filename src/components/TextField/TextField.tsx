import React, {FC} from "react";
import "./TextField.scss";
import useMediaQuery from "../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../helpers/constants";

interface TextFieldProps {
   type: "text" | "date" | "number" | "phone" | "checkbox",
   placeholder?: string,
   children?: React.ReactNode,
   error?: boolean
   alwaysActivePlaceholder?: boolean,
   icon?: React.ReactNode
}

const TextField: FC<TextFieldProps> = ({
                                          error,
                                          type,
                                          children,
                                          placeholder,
                                          alwaysActivePlaceholder = false,
                                          icon
                                       }) => {
   const isTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);
   const isMobile = useMediaQuery(mediaQueriesConstants.mobile);
   const isNotMobile = useMediaQuery(mediaQueriesConstants.minSmallTablet);

   return (
     <label style={error ? {borderColor: "#FD385B"} : {}}
            className={`TextFieldLabel ${alwaysActivePlaceholder ? "TextFieldLabel__activePlaceholder" : ""} TextFieldLabel__${type} ${!isTablet ? "TextFieldLabel__tablet" : ""} ${isMobile ? "TextFieldLabel__mobile" : ""}`}>
        {(isMobile || (type === "checkbox" && isNotMobile) || alwaysActivePlaceholder) && (
          <span className={"TextFieldLabel__placeholder typography-body1"}>{placeholder}</span>
        )}

        {children}

        {icon && <span className="TextFieldLabel__icon">{icon}</span>}
     </label>
   );
};

export default TextField;