import prisma from "../util/prismadb";
import { getSession } from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getSession();

    if(!currentUser) return []


const favorites = await prisma.listing.findMany({
where:{
    id:{
        in:[...currentUser.favoritIds || []]
        
    }
}

})

const safeFavorites = favorites.map((favorite)=>({
    ...favorite,createdAt:favorite.createdAt.toISOString()
}))

return safeFavorites
  } catch (error:any) {
throw new Error(error)
  }
}
