import prisma from '@/libs/prismadb'

import getCurrentUser from '@/session/GetCurrentUser'



export default async function getFavoritesListing() {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return []
        }
        const favorites = await prisma.listing.findMany(
            {
                where:{
                    id:{
                        in:[...(currentUser.favouriteIds || [])]
                    }
                }
            }
        )
        const safeFavorites = favorites.map((favorite:any)=>({
            
            ...favorite,
            createdAt:favorite.createdAt.toISOString()
        }))
       return safeFavorites
    } catch (error:any) {
        throw new Error(error)
    }
}