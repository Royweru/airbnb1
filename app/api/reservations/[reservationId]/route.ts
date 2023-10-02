import { NextResponse } from "next/server";

import getCurrentUser from "@/session/GetCurrentUser";
import prisma from '@/libs/prismadb'


interface IParams{
    reservationId?:string
}


export async function DELETE(
    req:Request,
   {params}:{params:IParams}
) {
    
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {reservationId}= params

    if(!reservationId||typeof reservationId !=='string'){
        throw new Error('Invalid Id!')
    }

    const reservation = await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            OR:[
                {userId:currentUser.id},
                {listings:{userId:currentUser.id}}
            ]
        }
    })

    return NextResponse.json(reservation)
}