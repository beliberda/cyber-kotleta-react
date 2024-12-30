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
  isOpenSidebar: boolean;
  isAuth: boolean;
  user: IUser;
  setIsOpenSidebar: (value: boolean) => void;
  checkAuth: () => void;
  login: (data: ILoginData) => void;
  logout: () => void;
  registration: (data: IRegistrationData) => void;
  sendTestsResult: () => {};
  addRatingTest: (rating: number, testId: number) => void;
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
    tests: [
      {
        id: 0,
        rating: 0,
        title: "Нарастающая сложность",
        tryCount: 0,
      },
      {
        id: 1,
        rating: 0,
        title: "Скорость принятия решений",
        tryCount: 0,
      },
      {
        id: 2,
        rating: 0,
        title: "Периферическое зрение",
        tryCount: 0,
      },
    ],
  };

  isOpenSidebar: boolean = true;
  setIsOpenSidebar(value: boolean) {
    this.isOpenSidebar = value;
  }

  async login(data: ILoginData) {
    console.log(toJS(this.user));
    UserService.login(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.user = jwtDecode(res.data.token);
        this.user.tests = [
          {
            id: 0,
            rating: 0,
            title: "Нарастающая сложность",
            tryCount: 0,
          },
          {
            id: 1,
            rating: 0,
            title: "Скорость принятия решений",
            tryCount: 0,
          },
          {
            id: 2,
            rating: 0,
            title: "Периферическое зрение",
            tryCount: 0,
          },
        ];
        this.isAuth = true;
      })
      .catch((err: AxiosResponse) => {
        console.log(err.status);
      })
      .finally(() => {
        this.isAuth = true;
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
      tests: [],
    };
    this.isAuth = false;
    localStorage.removeItem("token");
  }
  async registration(data: IRegistrationData) {
    UserService.register(data)
      .then((res) => {
        this.user = jwtDecode(res.data.token);
        localStorage.setItem("token", res.data.token);
        this.isAuth = true;
        console.log("Registration successful", toJS(this.user));
      })
      .catch((err: AxiosResponse) => {
        console.log(err.status);
      })
      .finally(() => {
        this.isAuth = true;
      });
  }
  checkAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      this.user = jwtDecode(token);
      this.user.tests = [
        {
          id: 0,
          rating: 0,
          title: "Нарастающая сложность",
          tryCount: 0,
        },
        {
          id: 1,
          rating: 0,
          title: "Скорость принятия решений",
          tryCount: 0,
        },
        {
          id: 2,
          rating: 0,
          title: "Периферическое зрение",
          tryCount: 0,
        },
      ];
      this.isAuth = true;
    }
  }

  addRatingTest(rating: number, testId: number) {
    this.user.tests[testId].rating = rating;
    console.log("Test rating updated", toJS(this.user));
    this.sendTestsResult();
  }

  async sendTestsResult() {
    const URL =
      "https://script.google.com/macros/s/AKfycbxzP8sfApjKGH6Bew_18vL4S8gR_9uCSGIeEF26qWzNZ07RRYZ1hfHetHU2Jc0Jz7pV/exec";

    const DATA = {
      username: this.user.lastName + " " + this.user.firstName,
      p1: this.user?.tests[0].rating,
      p2: this.user?.tests[1].rating,
      p3: this.user?.tests[2].rating,
    };
    try {
      const res = await fetch(URL, {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(DATA),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
    } catch (err) {
      console.error("Error:", err);
    }
  }
}

export default new UserStore();
