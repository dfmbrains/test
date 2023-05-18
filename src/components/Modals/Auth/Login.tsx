import React, {FormEvent, useState} from "react";
import "./auth.scss";
import Logo from "../../../assets/brand/logo.png";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Button from "../../Button";
import {useNavigate} from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import FormHelperText from "../../FormHelperText";
import {IPostVerificationBody} from "../../../models/auth";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {coordinatesState} from "../../../store/geo/geo.states";
import {sendVerificationCode} from "../../../api/auth.api";
import {resendCodeState} from "../../../store/auth/auth.states";
import {authModalStepState} from "../../../store/settings/settings.states";
import {mediaQueriesConstants} from "../../../helpers/constants";

const Login = () => {
     const isDesktop = useMediaQuery(mediaQueriesConstants.minDesktop);

     const navigate = useNavigate();

     const [phoneNumber, setPhoneNumber] = useState<string>("");
     const [phoneNumberError, setPhoneNumberError] = useState<string>("");
     const [loading, setLoading] = useState<boolean>(false);

     const coordinates = useRecoilValue(coordinatesState);
     const setResendCode = useSetRecoilState(resendCodeState);
     const setAuthModalStep = useSetRecoilState(authModalStepState);

     const handleSubmit = async (e?: FormEvent) => {
        if (e) {
           e.preventDefault();
        }

        if (!phoneNumber) {
           setPhoneNumberError("Введите номер телефона");
        } else if (phoneNumber.length !== 11) {
           setPhoneNumberError("Неправильный номер телефона");
        } else {
           setLoading(true);

           try {
              const requestData: IPostVerificationBody = {
                 Lon: String(coordinates.Lon),
                 PhoneNumber: phoneNumber.substring(1),
                 CountryCode: "KZ",
                 DeviceToken: window.btoa(Math.random() + navigator.userAgent + new Date().getTime()),
                 DeviceId: crypto.randomUUID(),
                 Lat: String(coordinates.Lat)
              };
              const response = await sendVerificationCode(requestData);

              setResendCode({
                 phoneNumber: phoneNumber.substring(1),
                 ResendToken: response.resendToken,
                 verificationToken: response.verificationToken
              });

              setAuthModalStep("verification");
           } catch (error) {
              console.log(error);
           }

           setLoading(false);
        }
     };
     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 || e.which === 13) {
           handleSubmit();
        }
     };

     return (
       <section>
          {isDesktop && <img className="authModal__logo" src={Logo} alt="logo"/>}
          <h2 className="modal__title typography-h2">Добро пожаловать <br/> в Qomek</h2>

          <form onSubmit={handleSubmit}>
             <div className="authModal__label">
                <PhoneInput country={"kz"}
                            onlyCountries={["kz"]}
                            preferredCountries={["kz"]}
                            countryCodeEditable={false}
                            disableDropdown={true}
                            inputClass={"authModal__phoneInput"}
                            buttonClass={"authModal__phoneInput_button"}
                            containerClass={`authModal__phoneInput_container`}
                            inputProps={{
                               name: "phoneNumber",
                               autoFocus: true
                            }}
                            onKeyDown={handleKeyDown}
                            value={phoneNumber}
                            onChange={(value) => setPhoneNumber(value)}
                />
                {(!phoneNumber || phoneNumber === "7") && (
                  <p className="authModal__phoneInput_placeholder typography-h6">Номер телефона</p>
                )}
             </div>
             {phoneNumberError && <FormHelperText text={phoneNumberError}/>}

             <Button clx={"authModal__submit"} text={"Получить код в СМС"} type={"submit"} fullWidth={true}
                     size={"large"} loading={loading}/>
          </form>
          <p className="typography-body2 authModal__agreement">
             Продолжая вы соглашаетесь с
             <span onClick={() => navigate("/")}> политикой конфиденциальности персональных данных</span>
          </p>
       </section>
     );
  }
;

export default Login;