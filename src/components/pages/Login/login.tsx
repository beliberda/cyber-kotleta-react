import { InputDefault } from "@/components/shared/UI/Inputs/Inputs";
import s from "./style.module.css";
import { useEffect, useState } from "react";

import UserStore from "@/components/store/UserStore";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ButtonDefault } from "@/components/shared/UI/Buttons.tsx/buttons";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);

  const checkLogin = () => {
    if (formData.email === "" || formData.password === "") {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
    console.log("Login clicked", formData);
    UserStore.login(formData);
  };
  useEffect(() => {
    if (UserStore.isAuth && localStorage.getItem("token")) {
      navigate("/profile");
    }
  }, [UserStore.isAuth]);
  return (
    <main className={s.login}>
      <InputDefault
        handleInputChange={(e) => {
          setFormData({ ...formData, email: e.currentTarget.value });
        }}
        label="Email"
        placeholder="exsample@gmail.com"
        className={isError ? "input-err" : ""}
      />
      <InputDefault
        handleInputChange={(e) => {
          setFormData({ ...formData, password: e.currentTarget.value });
        }}
        label="Password"
        type="password"
        className={isError ? "input-err" : ""}
      />
      <ButtonDefault
        handlClick={() => {
          checkLogin();
        }}
      >
        Log In
      </ButtonDefault>
      <div className={s.registration}>
        <h2>Нет аккаунта?</h2>
        <Link to="/registration">Зарегистрироваться</Link>
      </div>
    </main>
  );
}

export default observer(Login);
