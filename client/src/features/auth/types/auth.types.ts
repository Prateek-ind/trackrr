export type LoginAuthType ={
    email: string,
    password: string
    rememberMe: boolean
}

export type RegisterAuthType ={
    username: string,
    email: string,
    password: string
}

export type UserType = {
  id: string;
  username: string;
  email: string;
};