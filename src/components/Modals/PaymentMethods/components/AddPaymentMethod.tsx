import React, {FormEvent, useState} from "react";
import Button from "../../../Button";
import TextField from "../../../TextField/TextField";
import {addCard, IAddCardBody, toCryptoCard} from "../../../../api/payment.api";
import {
   detectCardType,
   handleCardNumberChange,
   handleExpirationDateChange,
   handleValidateAddCardForm
} from "../../../../helpers/utils";
import {IFormError} from "../../../../models";
import FormHelperText from "../../../FormHelperText";
import {useSetRecoilState} from "recoil";
import {paymentMethodsModalStepState} from "../../../../store/settings/settings.states";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import {mediaQueriesConstants} from "../../../../helpers/constants";
import {useNavigate} from "react-router-dom";

export interface IAddCardForm {
   cardNumber: string,
   expireDate: string,
   cvv: string,
   name: string
}

export interface IAddCardFormErrors {
   cardNumber: IFormError,
   expireDate: IFormError,
   cvv: IFormError,
   name: IFormError
}

const AddPaymentMethod = () => {
   const isLargeTablet = useMediaQuery(mediaQueriesConstants.minLargeTablet);

   const navigate = useNavigate();

   const setPaymentsMethodsModalStep = useSetRecoilState(paymentMethodsModalStepState);

   const [values, setValues] = useState<IAddCardForm>({
      expireDate: "",
      cardNumber: "",
      name: "",
      cvv: ""
   });
   const [errors, setErrors] = useState<IAddCardFormErrors>({
      expireDate: {matches: "", required: ""},
      cardNumber: {matches: "", required: ""},
      name: {matches: "", required: ""},
      cvv: {matches: "", required: ""}
   });
   const [loading, setLoading] = useState<boolean>(false);

   const handleChange = (value: string | number, key: keyof IAddCardForm) => {
      setValues((prevState) => ({...prevState, [key]: value}));
   };

   const formValidator = () => {
      const res = handleValidateAddCardForm(errors, values);
      setErrors(res.data);
      return res.status;
   };
   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const validateStatus = formValidator();

      if (validateStatus) {
         setLoading(true);

         const cardNumber = values.cardNumber.replace(/\D/g, "");

         const crypto = await toCryptoCard(
           String(values.cvv), values.cardNumber, values.expireDate.split("/")[0], values.expireDate.split("/")[1]
         );

         const createdBody: IAddCardBody = {
            cardType: detectCardType(values.cardNumber),
            cardNumber: cardNumber,
            expireDate: values.expireDate,
            name: values.name,
            cryptoCard: crypto,
            paymentSystem: "CloudPayment"
         };
         await addCard(createdBody);

         setLoading(false);

         if (isLargeTablet) {
            setPaymentsMethodsModalStep("closed");
         } else {
            navigate("/profile");
         }
      }
   };

   return (
     <>
        <h2 className={`modal__title ${isLargeTablet ? "typography-h3" : "typography-h2"}`}>Добавить новую карту</h2>

        <form className="paymentMethods__add" onSubmit={handleSubmit}>
           <div className="paymentMethods__add_form">
              <h6 className="typography-h6">DEBIT / CREDIT</h6>

              <div>
                 <TextField type={"text"} placeholder={"Номер карты"}
                            alwaysActivePlaceholder={true}>
                    <input value={values.cardNumber} name={"cardNumber"}
                           maxLength={19} type="text" placeholder="0000 0000 0000 0000"
                           onChange={e => handleChange(handleCardNumberChange(e.target.value), "cardNumber")}/>
                 </TextField>
                 {errors.cardNumber && <FormHelperText text={errors.cardNumber.required || errors.cardNumber.matches}/>}
              </div>

              <div className="paymentMethods__add_form-row">
                 <div className="paymentMethods__add_form-row-item">
                    <TextField type={"text"} placeholder={"Срок действия"}
                               alwaysActivePlaceholder={true}>
                       <input maxLength={5} type="text" placeholder="MM/YY"
                              name={"expireDate"} value={values.expireDate}
                              onChange={e => handleChange(handleExpirationDateChange(e.target.value), "expireDate")}/>
                    </TextField>
                    {errors.expireDate &&
                        <FormHelperText text={errors.expireDate.required || errors.expireDate.matches}/>}
                 </div>

                 <div className="paymentMethods__add_form-row-item">
                    <TextField type={"number"} placeholder={"Код безопасности"}
                               alwaysActivePlaceholder={true}>
                       <input maxLength={3} type="password" placeholder="CVV" value={values.cvv} name={"cvv"}
                              onChange={e => handleChange(e.target.value, "cvv")}/>
                    </TextField>
                    {errors.cvv && <FormHelperText text={errors.cvv.required || errors.cvv.matches}/>}
                 </div>
              </div>

              <div>
                 <TextField type={"number"} placeholder={"Имя на карте"}
                            alwaysActivePlaceholder={true}>
                    <input type="text" placeholder="Имя Фамилия" value={values.name} name={"name"}
                           onChange={e => handleChange(e.target.value, "name")}/>
                 </TextField>
                 {errors.name && <FormHelperText text={errors.name.required || errors.name.matches}/>}
              </div>
           </div>

           <Button text={"Добавить карту"} type={"submit"} size={"medium"}
                   fullWidth loading={loading} clx="paymentMethods__submit"/>
        </form>
     </>
   );
};

export default AddPaymentMethod;