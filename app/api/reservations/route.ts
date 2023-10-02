import { NextResponse } from "next/server";

import prisma from '@/libs/prismadb'
import getCurrentUser from "@/session/GetCurrentUser";


export async function POST(
    req:Request
) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await req.json()

    const{
        listingId,
        startDate,
        endDate,
        totalPrice
    }= body

    const listingAndReservation = await prisma.listing.update({
        where:{
            id:listingId
        },
        data:{
            reservations:{
                create:{
                    userId:currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })
    return NextResponse.json(listingAndReservation)
}