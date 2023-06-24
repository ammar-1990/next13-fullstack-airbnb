
import { NextResponse } from "next/server";
import { getSession } from "@/actions/getCurrentUser";
import prisma from '../../../../util/prismadb'



type Iparams = {
    listingId?:string
}

export async function DELETE(request:Request,{params}:{params:Iparams}){

    const currentUser = await getSession()
    if(!currentUser) return NextResponse.error()

    const {listingId} = params

if(!listingId || typeof listingId !== 'string') throw new Error('Invalid ID')

const listing = await prisma.listing.deleteMany({
    where:{
        id:listingId,
        userId:currentUser.id
    },

})


return NextResponse.json(listing)

}