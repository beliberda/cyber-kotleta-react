type TRoles = "ADMIN" | "USER" | "TUTOR";
export interface IRole {
  id: number;
  value: TRoles;
  description: "string";
}
export interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: number;
  email: string;
  roles: IRole[];
}
export interface ILoginRes {
  token: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
export interface IRegistrationData extends ILoginData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface ILections {}
