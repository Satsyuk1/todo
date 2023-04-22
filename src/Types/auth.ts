export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export type UserInfo = Omit<User, "password">;
