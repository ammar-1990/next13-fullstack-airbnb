import prisma from "../util/prismadb";



export type Props = {
 userId?:string   
}


export default async function getListings(params:Props) {

const {userId} = params
let query:any = {}

if(userId) {
  query.userId = userId
}


 
  try {
    const listings = await prisma.listing.findMany({

      where:query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map(el=>({...el,createdAt:el.createdAt.toISOString()}))
    return safeListings

  } catch (error: any) {
    throw new Error(error);

    console.log(error);
  }
}
