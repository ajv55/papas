import type { NextAuthOptions, Session, User } from "next-auth"; 

import {PrismaAdapter} from '@next-auth/prisma-adapter'
import CredentialsProvider  from "next-auth/providers/credentials";

import bcrypt from 'bcrypt';
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'example@mail.com'},
                password: {label: 'Password', type: 'password', placeholder: 'Enter Password' },
            },
            async authorize(credentials) {

                //check to see if email and password is in the database
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Please enter an email and password.')
                }

                //check to see if user exist
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                //if no user was found
                if (!user || !user?.hashedPassword){
                    throw new Error('No user found')
                }

                // check to see if password match when user is found
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                if(!passwordMatch) {
                    throw new Error('Incorret Password')
                }

                return user


            }
        })

    ],
    callbacks: {
        jwt: async ({token, user, session, trigger}: {token: JWT, user?:  any , session?: any, trigger?: any}): Promise<any>  => {
           if (trigger === 'update' && session?.calories) {
            token.calories = session.calories
           }
           

           // passing in user id, calories, height, weight, age, and gender to token
           if(user) {

            console.log(user)
         
            return {
                ...token, 
                id: user?.id,
                role: user?.role,
                password: user?.hashedPassword,
                


            }
        }

        //updating the user info on the database
        //  await prisma.user.update({
        //     where: {
        //         id: token.id as string
        //     },
        //     data: {
        //     }
        // });

        
            return token
        },
        session: async ({session, token, user}): Promise<any> => {
        
    
            // adding the users age, weight, height, gender, caloires, and id through the token on the session
            return {
                ...session, 
                user: {
                    ...session.user,
                   id: token?.id,
                   password: token?.hashedPassword,
                   role: token?.role
                }
            };

        }
    },
    secret: process.env.NEXTAUTH_SECERT!,
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: '/login',
        error: '/',
    },
    debug: process.env.NODE_ENV === 'development',
}

