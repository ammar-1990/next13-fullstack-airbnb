import Container from "@/components/Container"
import EmptyState from "@/components/EmptyState"
import { getSession } from "@/actions/getCurrentUser"
import getFavoriteListings from "@/actions/getFavoriteListings"
import Heading from "@/components/modals/Heading"
import Favorites from "./Favorites"



type Props = {}

const page =async (props: Props) => {

    const listings = await getFavoriteListings()
    const currentUser = await getSession()
    if(!currentUser) return <div className="w-full mt-44 flex items-center justify-center"><Heading title="Unauthorized" description="Please login" /></div> 

if(listings.length === 0) return  <EmptyState title="No favorites found" description="You have no favorite listings" />


  return (
    <div className="-mt-20">
        <Container>
<Favorites
currentUser = {currentUser}
listings={listings}
/>
        </Container>
    </div>
  )
}

export default page