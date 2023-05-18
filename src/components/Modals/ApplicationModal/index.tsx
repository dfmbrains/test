import React from "react";
import "./applicationModal.scss";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentProfileApplicationState} from "../../../store/applications/application.states";
import Settings from "../../../assets/imgs/settings.webp";
import RejectedImg from "../../../assets/imgs/close.png";
import Button from "../../Button";
import ModalLayout from "../ModalLayout";
import {applicationModalState} from "../../../store/settings/settings.states";

const ApplicationModal = () => {
   const navigate = useNavigate();

   const [applicationModal, setApplicationModal] = useRecoilState(applicationModalState);
   const profileApplication = useRecoilValue(currentProfileApplicationState);

   if (applicationModal === "closed") return null;

   const switchModalType = () => {
      switch (applicationModal) {
         case "nurse":
            return (
              <>
                 <h2 className="modal__title typography-h3">Медсестра</h2>
                 <img className="applicationModal__img" src={Settings} alt="unable"/>
                 <p className="typography-h6 applicationModal__text">Скоро вы сможете зарегистрироваться и
                    оказывать услуги выездной медсестры</p>
              </>
            );
         case "rejectedApplication":
            return (
              <>
                 <h2 className="modal__title typography-h3">Ваша заявка не принята</h2>
                 <img className="applicationModal__img" src={RejectedImg} alt="rejected"/>
                 <p className="typography-h6 applicationModal__text">Возможные причины:</p>
                 <p className="typography-h6 applicationModal__text">{profileApplication?.reason}</p>
                 <p className="typography-body1 applicationModal__text applicationModal__subtitle">В каждом конкретном
                    случае
                    мы выносим решение индивидуально, в случае вопросов просим обратиться в службу поддержки</p>
                 <Button action={() => {
                    navigate("/create-application");
                    setApplicationModal("closed");
                 }} text={"Отправить повторно"} type={"button"} size={"medium"} fullWidth/>
              </>
            );
         default:
            return null;
      }
   };

   return (
     <ModalLayout closeModal={() => setApplicationModal("closed")}>
        {switchModalType()}
     </ModalLayout>
   );
};

export default ApplicationModal;