import React from "react";
import "./formHelperText.scss";

const FormHelperText = ({text}: { text: string }) => {
   return (
     <p className="formHelperText typography-subtitle2">{text}</p>
   );
};

export default FormHelperText;