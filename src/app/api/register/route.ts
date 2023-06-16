import bcrypt from 'bcryptjs'
import prisma from '../../../util/prismadb'
import { NextResponse } from 'next/server'


export async function POST (request : Request){


    const body = await request.json()
const {email,name,password} = body

const exist = await prisma.user.findUnique({where:{email:email}})
if(exist) throw new Error('user already exists')
const hashedPassword = bcrypt.hashSync(password,12)
const user = await prisma.user.create({data:{email,name,hashedPassword}})


return NextResponse.json(user)

}