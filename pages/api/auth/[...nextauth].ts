import NextAuth, {AuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "@/lib/prismadb"
import bcrypt from 'bcrypt'

export const authOptions:AuthOptions = {
  // Configure one or more authentication providers
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials:{
        email:{
          label:'email',
        type:'text',
       
        },
        password:{
          label:"password",
          type:'password'
        },
        
      },
      async authorize(credentials, req) {
          const user = await prisma.user.findUnique({
            where:{
              email:credentials?.email
            }
          })
          if(!user){
            throw new Error("credentials offered are invalid!")
          }
          const isCorrectPassword = await bcrypt.compare(
            credentials?.password ,
            user.hashedPassword
          )

          if(!isCorrectPassword){
            throw new Error("Invalid credentials!")
          }

          return user
          
      },
    })
  ],
  
  debug:process.env.NODE_ENV === 'development',
  session:{
      strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET
  
}

export default NextAuth(authOptions)