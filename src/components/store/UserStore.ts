import { IUser } from "@/components/interfaces/interfaces";
import { makeAutoObservable } from "mobx";

type authData = {
  email: string;
  password: string;
};

interface IUserStore {
  isAuth: boolean;
  user: IUser;

  login: (data: authData) => void;
  registration: (data: authData) => void;
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
    role: "admin",
  };

  async login(data: authData) {
    if (data.email === "admin@gmail.com" && data.password === "password") {
      this.isAuth = true;
      this.user = { ...this.user, email: data.email, password: data.password };
      console.log("Доступ разрешен");

      // window.location.pathname = "/test1";
    }
  }
  async registration(data: authData) {
    // Simulate registration logic
    // Here you can add your own registration logic
    this.isAuth = true;
    this.user = {
      ...this.user,
      email: data.email,
      password: data.password,
    };
  }
}

export default new UserStore();
