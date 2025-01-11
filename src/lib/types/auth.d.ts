  declare interface RegisterFields {
    username: string;
    firstName: string;
    lastName: string;
    email: string; 
    password: string; 
    rePassword: string;
    phone: string;
  }

  
  declare interface LoginValues {
    email: string; 
    password: string; 
  }

  declare interface resetPasswordValues {
    newPassword: string; 
    rePassword: string; 
  }


  declare interface User extends DatabaseFields  {
    "username": string;
    "firstName": string;
    "lastName": string;
    "email": string;
    "phone": string;
    "role": string;
    "isVerified": boolean;
    "passwordResetCode": string;
    "passwordResetExpires": string;
    "resetCodeVerified": boolean;
  }

  declare type RegisterResponse = {
    user: User;
  }

  declare type LoginResponse = RegisterResponse;
  