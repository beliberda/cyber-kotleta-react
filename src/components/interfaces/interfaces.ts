type TRoles = "ADMIN" | "USER" | "TUTOR";

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: TRoles;
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
