import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from "next-auth/providers/linkedin";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET
          })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}



export default (req, res) => NextAuth(req, res, options)