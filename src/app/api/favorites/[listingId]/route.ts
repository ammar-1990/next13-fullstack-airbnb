import { NextResponse } from "next/server";
import prisma from '../../../../util/prismadb'
import { getSession } from "@/actions/getCurrentUser";


type Iparams = {
    listingId:string
}

export  async function POST(request:Request,{params}:{params:Iparams}){

const currentUser = await getSession()
if(!currentUser) return NextResponse.error()
const {listingId} = params

if(!listingId || typeof listingId !== 'string') throw new Error('Invalid ID')

let favoritIds = [...(currentUser.favoritIds||[])]

favoritIds.push(listingId)

const user = await prisma.user.update({
    where:{
        id:currentUser.id
    },
    data:{
        favoritIds
    }
})

return NextResponse.json(user)

}

export async function DELETE(request:Request,{params}:{params:Iparams}){
    const currentUser = await getSession()
    if(!currentUser) return NextResponse.error()
    const {listingId} = params
   
    if(!listingId || typeof listingId !== 'string') throw new Error('Invalid ID')
    
    let favoritIds = [...(currentUser.favoritIds||[])]

    favoritIds = favoritIds.filter(el=>el !== listingId)

    const user =await  prisma.user.update({
        where:{id:currentUser.id},
        data:{favoritIds}
    })

    return NextResponse.json(user)


}