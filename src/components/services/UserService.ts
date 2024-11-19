import {
  ILoginData,
  ILoginRes,
  IRegistrationData,
  IUser,
} from "./../interfaces/interfaces";
import { $api } from "@/components/http/http";
import { AxiosResponse } from "axios";

class UserService {
  static async login(data: ILoginData): Promise<AxiosResponse<ILoginRes, any>> {
    return $api.post("/auth/login", data);
  }
  static async register(
    data: IRegistrationData
  ): Promise<AxiosResponse<IUser, any>> {
    return $api.post("/auth/registration", data);
  }
}

export default UserService;
