import { IRegistrationData, IUser } from "./../interfaces/interfaces";
import { $api } from "@/components/http/http";
import { AxiosResponse } from "axios";

class UserService {
  static async login(
    email: number,
    password: string
  ): Promise<AxiosResponse<IUser, any>> {
    return $api.post("/login", { email, password });
  }
  static async register(
    data: IRegistrationData
  ): Promise<AxiosResponse<IUser, any>> {
    return $api.post("/auth/registration", data);
  }
}

export default UserService;
