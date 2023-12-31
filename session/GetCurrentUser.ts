import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb'

export async function getSession() {
  await getServerSession()    
}

export default async function getCurrentUser() {
    const session = await getServerSession()

    if (!session){
        return null
    }

    try {
        const curentUser = await prisma.user.findUnique({
            where:{
                email:session.user?.email as string
            },
        })
        
        if (!curentUser){
            return null
        }

        return {
            ...curentUser,
            createdAt:curentUser.createdAt.toISOString(),
            updatedAt:curentUser.updatedAt.toISOString(),
            emailVerified:curentUser.emailVerified?.toISOString() ||null,
        }
    } catch (error) {
        return null
    }
}