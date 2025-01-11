import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider  from "next-auth/providers/google";
import TwitterProvider from 'next-auth/providers/twitter'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'
import { JSON_HEADERS } from "./lib/constants/api.constant";


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/login',
        error: '/auth/login'
    },
  
    callbacks: {
        jwt({ token, user }) {

            if (user) {
                token.token = user.token 
                token.username = user.username 
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.email = user.email
                token.phone = user.phone
                token.role = user.role
                token.isVerified = user.isVerified
                token.resetCodeVerified = user.resetCodeVerified
            }

            return token;
        }, 

        session({ session, token }) {

            session.username = token.username 
            session.firstName = token.firstName
            session.lastName = token.lastName
            session.email = token.email
            session.phone = token.phone
            session.role = token.role
            session.isVerified = token.isVerified
            session.resetCodeVerified = token.resetCodeVerified

            return session;
        },
    },

  providers: [
    
    CredentialsProvider({

        async authorize(credentials) {

            const baseUrl = process.env.API + '/auth/signin';
          
            const fetchOptions = { 
              method: 'POST',
              headers: JSON_HEADERS,
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            };
          
            const res = await fetch(baseUrl, fetchOptions);

            const payload: ApiResponse<LoginResponse> = await res.json();

            // if Payload Returned with Successfull Resposne, Return user & token
            if (payload.message === 'success') {
            
              return {
                token: payload?.token,
                ...payload?.user,    
              };

            } else {
                // Otherwise Throw this Error
                throw new Error('Invalid Email or Password'); 
            }
          
            
          },

      credentials: {
        email: {}, 
        password: {},
      }
    }), 

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0",
    }),
    

    FacebookProvider ({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLINT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    })

    ],
}
