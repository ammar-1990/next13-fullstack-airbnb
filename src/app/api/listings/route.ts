import { NextResponse } from "next/server";
import prisma from '../../../util/prismadb'
import { getSession } from "@/actions/getCurrentUser";

export async function POST(request:Request){

    const currentUser = await getSession()
    if(!currentUser) return NextResponse.error()

    const body = await request.json()
console.log(body)
    const {
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description,
    } = body

    Object.keys(body).forEach((val:any)=>{
        if(!body[val]) return NextResponse.error()
    })

    try {
        
        const listing =await  prisma.listing.create({
            data:{
              category,
              locationValue:location.value,
              guestCount,
              roomCount,
              bathroomCount,
              imageSrc,
              price:parseInt(price),
              title,
              description,
              userId:currentUser.id
            }
          })
          return NextResponse.json(listing)
    } catch (error) {
        return NextResponse.error()
    }




   

}