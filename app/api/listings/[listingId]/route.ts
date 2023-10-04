import{NextResponse} from 'next/server'

import getCurrentUser from '@/session/GetCurrentUser'
import prisma from '@/libs/prismadb'


interface IParams{
    listingId?:string,

}

export async function DELETE(
    req:Request,
    {params}:{params:IParams}
) {
    const currentUser = await getCurrentUser()
    const{listingId} = params
    if(!currentUser){
        return NextResponse.error()
    }

    if(!listingId|| typeof listingId !== "string"){
        throw new Error("Invalid Id!")
    }

    const listing = await prisma.listing.deleteMany({
        where:{
            id:listingId,
            userId:currentUser.id
        }

    })

    return NextResponse.json(listing)
}