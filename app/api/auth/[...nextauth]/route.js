import User from '@/models/User'
import connectToDB from '@/utils/database'
import SignToken from '@/utils/jwttoken'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'


const options = {
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    async signIn({user,account,profile}) {
      try {
        await connectToDB();
        const userExists = await User.findOne({
          email:profile.email
        });
  
        if (!userExists) {
          await User.create({
            email:profile.email,
            name: profile.name,
            imageUrl: profile.picture
          })
        }
        return true;
      } catch (error) {
        console.log(error.message)
        return false;
      }
    },

    async jwt({token,user,account}) {
      if(account) {
        const ltoken = await SignToken({id:user?.email})
        token.UserToken = ltoken
        cookies().set('token', ltoken)
      }
      return token
    },

    async session({session,user,token}) {
      session.UserToken = token.UserToken
      return session
    }
  }
}

const handler = NextAuth(options)

export {handler as GET,handler as POST}