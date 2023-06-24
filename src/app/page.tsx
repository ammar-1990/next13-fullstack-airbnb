import { getSession } from '@/actions/getCurrentUser'
import getListings from '@/actions/getListings'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listing/ListingCard'
import { Props } from '@/actions/getListings'

type HomeProps = {
  searchParams:Props
}


export default async function Home({searchParams}:HomeProps) {
  const listings = await getListings(searchParams)
const currentUser =await getSession()




if(listings.length === 0) return <EmptyState  showReset/>

  return (
   <div className='pt-4'>

    <Container>
      <div className='
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-8
      '>
{listings.map((listing)=>(<ListingCard key={listing.id} data={listing} currentUser={currentUser}/>))}
      </div>
    </Container>
   </div>
  )
}
