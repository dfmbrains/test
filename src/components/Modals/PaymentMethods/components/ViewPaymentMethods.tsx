import React, {useState} from "react";
import {cardIconGenerator, cardTypesGenerator} from "../../../../helpers/utils";
import KaspiIcon from "../../../../assets/icons/kaspi.svg";
import Button from "../../../Button";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {currentProfileCardsState} from "../../../../store/payment/payment.states";
import {paymentMethodsModalStepState} from "../../../../store/settings/settings.states";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../../helpers/constants";
import ConfirmationModal from "../../ConfirmationModal";
import {deleteCard} from "../../../../api/payment.api";

const CardItem = ({isActive, icon, title, handleDelete, cardNumber}: {
   isActive: boolean, icon: string, title: string, handleDelete?: () => void, cardNumber?: string
}) => {
   return (
     <div
       className={`paymentMethods__view_item paymentMethods__view_item-${isActive ? "active" : "disabled"}`}>
        <img src={icon} alt={title}/>
        <div>
           <h5 className="typography-subtitle1">{title} {cardNumber && <span>****{cardNumber}</span>}</h5>
           {isActive && (
             <p className="typography-body1">Способ используется по умолчанию</p>
           )}
        </div>

        {handleDelete && (
          <span onClick={() => handleDelete()} className="paymentMethods__view_item-delete">
             <i className="ri-close-fill"/>
          </span>
        )}
     </div>
   );
};

const ViewPaymentMethods = ({isPage}: { isPage: boolean }) => {
   const [cardIdForDeleting, setCardIdForDeleting] = useState<null | number>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const profileCards = useRecoilValue(currentProfileCardsState);

   const setPaymentMethodsModalStep = useSetRecoilState(paymentMethodsModalStepState);

   const handleDeleteCard = async () => {
      setLoading(true);
      await deleteCard(cardIdForDeleting!);
      setCardIdForDeleting(null);
      setLoading(false);
   };

   return (
     <>
        {(cardIdForDeleting === null || isPage) && (
          <>
             <h2 className={`modal__title ${isLargeTablet ? "typography-h3" : "typography-h2"}`}>Способы оплаты</h2>

             <div className="paymentMethods__view">
                {profileCards.map(card => (
                  <CardItem key={card.id} isActive={card.isDefault} icon={cardIconGenerator(card.type)}
                            title={cardTypesGenerator(card.type)}
                            handleDelete={() => setCardIdForDeleting(card.id)}
                            cardNumber={card.number}/>
                ))}
                <CardItem isActive={profileCards.length === 0} icon={KaspiIcon}
                          title={"Оплатить в приложении Kaspi"}/>
             </div>

             <Button action={() => setPaymentMethodsModalStep("add")} text={"Добавить карту"}
                     type={"button"} size={"medium"} fullWidth clx="paymentMethods__submit"/>
          </>
        )}

        {cardIdForDeleting !== null && (
          <ConfirmationModal title={"Вы действительно хотите удалить карту?"} loading={loading}
                             needModalLayout={isPage} onAccept={handleDeleteCard}
                             closeModal={() => setCardIdForDeleting(null)}/>
        )}
     </>
   );
};

export default ViewPaymentMethods;