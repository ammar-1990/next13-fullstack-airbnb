'use client'

import Container from '@/components/Container'
import { categories } from '@/components/Navbar/Categories'
import { safeListing, safeUser } from '@/types'
import {Reservation} from '@prisma/client'
import { useMemo} from 'react'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'

type Props = {

    reservations?:Reservation[],
    listing:safeListing &{ user: safeUser},
    currentUser?:safeUser | null
}

const ListingClient = ({reservations,listing,currentUser}: Props) => {

const category = useMemo(()=>{
return categories.find(el=>el.label === listing.category)

},[listing.category])

  return (
    <Container>
        <div className='flex flex-col gap-6 -mt-28'>
          <ListingHead
          title={listing.title}
          currentUser={currentUser}
          imageSrc={listing.imageSrc}
          id={listing.id}
          locationValue={listing.locationValue}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
<ListingInfo 
user={listing.user}
category={category}
description={listing.description}
roomCount = {listing.roomCount}
guestCount={listing.guestCount}
bathroomCount={listing.bathroomCount}
locationValue={listing.locationValue}
/>
          </div>
        </div>
    </Container>
  )
}

export default ListingClient