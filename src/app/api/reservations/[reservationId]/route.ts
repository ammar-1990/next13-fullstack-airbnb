import { NextResponse } from "next/server";
import prisma from '../../../../util/prismadb'
import { getSession } from "@/actions/getCurrentUser";


type Iparams = {
    reservationId?:string
}
export async function DELETE(request:Request,{params}:{params:Iparams}){

    const currentUser = await getSession()
const {reservationId} = params

    if(!currentUser) return NextResponse.error()

    if(!reservationId || typeof reservationId !== 'string') throw new Error('Invalid ID')

    try {
        const deleted = await prisma.reservation.deleteMany({
            where:{
                id:reservationId,
                OR:[
                    {
                        userId:currentUser.id
                    },
                    {
                        listing:{userId:currentUser.id}
                    }
                ]
            }
        })

        return NextResponse.json(deleted)
    } catch (error) {
        return NextResponse.error()
    }
}