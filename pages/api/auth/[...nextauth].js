import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}



export default (req, res) => NextAuth(req, res, options)