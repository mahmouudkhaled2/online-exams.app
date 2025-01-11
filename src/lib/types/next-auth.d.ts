/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"




declare module "next-auth" {
/**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
declare interface User extends Pick<DatabaseFields, "_id">{
  "token": string,
  "username": string,
  "firstName": string,
  "lastName"?: string,
  "email": string,
  "phone"?: string,
  "role": string,
  "isVerified": boolean,
  "resetCodeVerified": boolean
} 

/**
 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
 */
  interface Session {
    "username": string,
    "firstName": string,
    "lastName"?: string,
    "email": string,
    "phone"?: string,
    "role": string,
    "isVerified": boolean,
    "resetCodeVerified": boolean
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    "token": string,
    "username": string,
    "firstName": string,
    "lastName"?: string,
    "email": string,
    "phone"?: string,
    "role": string,
    "isVerified": boolean,
    "resetCodeVerified": boolean
  }
}
