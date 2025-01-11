import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getUserToken(req: NextRequest) {

      const token = await getToken({ req });
    
      if (token && "token" in token) {

        const userToken = token?.token;

        return userToken;

      } 

      return null;  
} 

