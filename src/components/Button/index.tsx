import React, {FC} from "react";
import "./button.scss";

interface IButtonComponent {
   text: string;
   action?: () => void;
   type?: "submit" | "reset" | "button";
   size?: "small" | "medium" | "large";
   startIcon?: React.ReactNode;
   endIcon?: React.ReactNode;
   loading?: boolean;
   fullWidth?: boolean;
   disabled?: boolean;
   variant?: "contained" | "outlined";
   clx?: string;
}

const Button: FC<IButtonComponent> = ({
                                         text,
                                         action,
                                         type = "button",
                                         size = "medium",
                                         variant = "contained",
                                         startIcon,
                                         endIcon,
                                         loading = false,
                                         fullWidth = false,
                                         disabled = false,
                                         clx
                                      }) => {

   return (
     <button type={type} onClick={() => !loading && action ? action() : null} disabled={loading ? true : disabled}
             className={
                `button ${loading ? "button__loading" : `button__notLoading_${variant}`} button__${size} ${fullWidth ? "button__fullWidth" : ""} button__${variant} ${clx ? clx : ""}`
             }
     >
        {startIcon && startIcon}
        <span className="button__text">{text}</span>
        {endIcon && endIcon}
     </button>
   );
};

export default Button;