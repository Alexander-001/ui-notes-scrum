export interface IInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
}

export interface IUserToken {
  name: string;
  email: string;
}

export interface IToken {
  user: {
    name: string;
    email: string;
  };
}

export interface IGenerateToken {
  message: string;
  token: string;
}

export interface IAddUser {
  message: string;
  user: IUser;
}

export interface IAuthUser {
  message: string;
  user: string;
  token: string;
}

export interface IError {
  errors: IErrorService[];
}

export interface IErrorService {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
