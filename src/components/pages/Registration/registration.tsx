import { InputDefault } from "@/components/shared/UI/Inputs/Inputs";
import s from "./style.module.css";
import { Fragment, useEffect, useState } from "react";

import UserStore from "@/components/store/UserStore";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ButtonDefault } from "@/components/shared/UI/Buttons.tsx/buttons";
import { IRegistrationData } from "@/components/interfaces/interfaces";

const registrationInputs = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "exsample@gmail.com",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Придумайте пароль от 4 до 16 символов",
  },
  {
    label: "Имя",
    type: "text",
    name: "firstName",
    placeholder: "Иван",
  },
  {
    label: "Фамилия",
    type: "text",
    name: "lastName",
    placeholder: "Иванов",
  },
  {
    label: "Телефон",
    type: "phone",
    name: "phoneNumber",
    placeholder: "88005553535",
  },
];
function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegistrationData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [isError, setIsError] = useState(false);

  const checkLogin = () => {
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof IRegistrationData] === "") {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
        return;
      }
    });
    if (!isError) {
      console.log("Registration", formData);
      UserStore.registration(formData);
    }
  };

  useEffect(() => {
    if (UserStore.isAuth) {
      navigate("/lections");
    }
  }, [UserStore.isAuth]);
  return (
    <main className={s.login}>
      <h1>Регистрация</h1>
      <div className={s["font-reg"]}>
        {registrationInputs.map((input) => {
          return (
            <Fragment key={input.name}>
              <InputDefault
                handleInputChange={(e) => {
                  setFormData({
                    ...formData,
                    [input.name]: e.currentTarget.value,
                  });
                }}
                type={input.type}
                label={input.label}
                placeholder={input.placeholder}
                className={isError ? "input-err" : ""}
              />
            </Fragment>
          );
        })}
        <ButtonDefault
          handlClick={() => {
            checkLogin();
          }}
        >
          Зарегистрироваться
        </ButtonDefault>

        <Link to="/">на страницу входа</Link>
      </div>
    </main>
  );
}

export default observer(Registration);
