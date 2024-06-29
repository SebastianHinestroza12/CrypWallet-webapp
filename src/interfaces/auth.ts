export interface UserIProps {
  email: string;
  password: string;
}

export interface DataRegisterProps extends UserIProps {
  name: string;
  lastName: string;
}
