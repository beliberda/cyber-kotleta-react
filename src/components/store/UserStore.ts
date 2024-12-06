import {
  ILoginData,
  IRegistrationData,
  IUser,
} from "@/components/interfaces/interfaces";
import UserService from "@/components/services/UserService";
import { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { makeAutoObservable, toJS } from "mobx";

interface IUserStore {
  isAuth: boolean;
  user: IUser;

  login: (data: ILoginData) => void;
  logout: () => void;
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
    roles: [{ id: 0, value: "USER", description: "" }],
    firstName: "",
    lastName: "",
    phoneNumber: "",
    rating: 0,
  };

  async login(data: ILoginData) {
    console.log(toJS(this.user));
    UserService.login(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.user = jwtDecode(res.data.token);
        console.log("user ", toJS(this.user));

        this.isAuth = true;
      })
      .catch((err: AxiosResponse) => {
        console.log(err.status);
      });
  }

  async logout() {
    this.user = {
      id: 0,
      email: "",
      roles: [],
      firstName: "",
      lastName: "",
      phoneNumber: "",
      rating: 0,
    };
    this.isAuth = false;
    localStorage.removeItem("token");
  }
  async registration(data: IRegistrationData) {
    UserService.register(data)
      .then((res) => {
        this.user = jwtDecode(res.data.token);
        this.isAuth = true;
        console.log("Registration successful", toJS(this.user));
      })
      .catch((err: AxiosResponse) => {
        console.log(err.status);
      });
  }
}

export default new UserStore();
