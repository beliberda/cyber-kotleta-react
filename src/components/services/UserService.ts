import {
  ILoginData,
  IRegistrationData,
  ITokenRes,
  IUser,
} from "./../interfaces/interfaces";
import { $api } from "@/components/http/http";
import { AxiosResponse } from "axios";

class UserService {
  static async login(data: ILoginData): Promise<AxiosResponse<ITokenRes, any>> {
    return $api.post("/auth/login", data);
  }
  static async register(
    data: IRegistrationData
  ): Promise<AxiosResponse<ITokenRes, any>> {
    return $api.post("/auth/registration", data);
  }
}

export default UserService;
