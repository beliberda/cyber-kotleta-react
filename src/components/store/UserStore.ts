import {
  ILoginData,
  IRegistrationData,
  IUser,
} from "@/components/interfaces/interfaces";
import UserService from "@/components/services/UserService";
import { makeAutoObservable } from "mobx";

interface IUserStore {
  isAuth: boolean;
  user: IUser;

  login: (data: ILoginData) => void;
  registration: (data: IRegistrationData) => void;
}
class UserStore implements IUserStore {
  constructor() {
    makeAutoObservable(this);
  }
  isAuth: boolean = false;
  user: IUser = {
    id: 0,
    email: "",
    password: "",
    role: "ADMIN",
  };

  async login(data: ILoginData) {
    if (data.email === "admin@gmail.com" && data.password === "password") {
      this.isAuth = true;
      this.user = { ...this.user, email: data.email, password: data.password };
      console.log("Доступ разрешен");

      // window.location.pathname = "/test1";
    }
  }
  async registration(data: IRegistrationData) {
    UserService.register(data)
      .then((res) => {
        this.user = res.data;
        this.isAuth = true;
        console.log("Registration successful");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new UserStore();
