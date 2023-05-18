import React, {FC} from "react";
import "./confirmationModal.scss";
import ModalLayout from "../ModalLayout";
import Button from "../../Button";

interface IConfirmationModal {
   closeModal: () => void;
   title: string;
   onAccept: () => void;
   loading?: boolean;
   needModalLayout: boolean;
}

const ConfirmationModal: FC<IConfirmationModal> = ({closeModal, title, onAccept, loading, needModalLayout}) => {
   const content = () => {
      return (
        <>
           <h2 className="modal__title typography-h3">{title}</h2>

           <div className="confirmationModal__btns">
              <Button text={"Да"} action={onAccept} loading={loading}/>
              <Button text={"Отменить"} variant={"outlined"} action={closeModal}/>
           </div>
        </>
      );
   };

   return (
     needModalLayout
       ? <ModalLayout type={"confirmation"} closeModal={closeModal} clx="confirmationModal">
          {content()}
       </ModalLayout>
       : <div className="confirmationModal confirmationModal__noLoyout">
          {content()}
       </div>
   );
};

export default ConfirmationModal;