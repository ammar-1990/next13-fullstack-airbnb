import ListingCard from "@/components/listing/ListingCard"
import Heading from "@/components/modals/Heading"
import { safeListing, safeUser } from "@/types"


type Props = {
currentUser?:safeUser | null,
listings:safeListing[]

}

const Favorites = ({currentUser,listings}: Props) => {
  return (
    <div>
        <Heading 
        title="Favorites"
        description="List of places you have favorited!"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {listings.map((listing)=><ListingCard key={listing.id} data={listing} currentUser={currentUser}  />)}

        </div>
    </div>
  )
}

export default Favorites