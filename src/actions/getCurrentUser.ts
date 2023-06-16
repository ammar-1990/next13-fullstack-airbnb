import {getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '../util/prismadb'


export async function getSession() {

    try {
        const session= await getServerSession(authOptions)
        if(!session?.user?.email){
            return null
        }
const currentUser = await prisma.user.findUnique({where:{email:session.user.email as string}})

if(!currentUser) return null 

return currentUser

    } catch (error) {
       console.log(error) 
    }

}


