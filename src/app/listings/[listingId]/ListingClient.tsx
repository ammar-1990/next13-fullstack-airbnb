'use client'

import {differenceInCalendarDays, eachDayOfInterval} from 'date-fns'
import Container from '@/components/Container'
import { categories } from '@/components/Navbar/Categories'
import { safeListing, safeReservation, safeUser } from '@/types'
import {Reservation} from '@prisma/client'
import { useMemo, useState, useCallback , useEffect} from 'react'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'
import useLoginModal from '@/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingReservation from './ListingReservation'
import { Range } from 'react-date-range'

type Props = {

    reservations?:safeReservation[],
    listing:safeListing &{ user: safeUser},
    currentUser?:safeUser | null
}

const ListingClient = ({reservations=[],listing,currentUser}: Props) => {

const category = useMemo(()=>{
return categories.find(el=>el.label === listing.category)

},[listing.category])

const InitialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key:'selection'
}

const loginModal = useLoginModal()
const router = useRouter()
const disableDates = useMemo(()=>{
  let dates:Date[] = []
  reservations.forEach((reservation)=>{
const range = eachDayOfInterval({
  start:new Date(reservation.startDate),
  end:new Date(reservation.endDate)
})
dates = [...dates,...range]
  })

  return dates
},[reservations])

const [isLoading, setIsLoading] = useState(false)
const [totalPrice, setTotalPrice] = useState(listing.price)
const [dateRange, setDateRange] = useState<Range>(InitialDateRange)

const onCreateReservation = useCallback(()=>{
if(!currentUser) return loginModal.onOpen()

setIsLoading(true)
axios.post('/api/reservations',{
  totalPrice,
  startDate:dateRange.startDate,
  endDate:dateRange.endDate,
  listingId:listing?.id

}).then(()=>{
  toast.success('Listing reserved')
  setDateRange(InitialDateRange)

  router.push('/trips')
}).catch(error=>{
  console.log(error)
  toast.error('Something went wrong')
}).finally(()=>{
  setIsLoading(false)
})

},[totalPrice,currentUser,loginModal,dateRange,listing?.id,router])


useEffect(()=>{
if(dateRange.startDate && dateRange.endDate){

  const dayCount = differenceInCalendarDays(
    dateRange.endDate,dateRange.startDate
  )

  if(dayCount && listing.price){
    setTotalPrice(dayCount * listing.price)
  }else {
    setTotalPrice(listing.price)
  }
}
},[dateRange,listing.price])

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


<div className='order-first md:order-last mb-10 md:col-span-3'>
<ListingReservation 
price={listing.price}
totalPrice={totalPrice}
onChangeDate={(value)=>{setDateRange(value)}}
dateRange={dateRange}
onSubmit={onCreateReservation}
disabled={isLoading}
disabledDates={disableDates}


/>
          </div>

          </div>

        
        </div>
    </Container>
  )
}

export default ListingClient