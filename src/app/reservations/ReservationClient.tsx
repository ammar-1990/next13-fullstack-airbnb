'use client'

import { safeReservation,safeUser } from '@/types'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Heading from '@/components/modals/Heading'
import ListingCard from '@/components/listing/ListingCard'


type Props = {
    reservations:safeReservation[],
    currentUser:safeUser | null
}

const ReservationClient = ({currentUser,reservations}: Props) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')
const onCancel = useCallback((id:string)=>{
setDeletingId(id)
axios.delete(`/api/reservations/${id}`).then(()=>{
    toast.success('Reservation canceled')
    router.refresh()
}).catch((error)=>{
    toast.error('Someting went wrong')

}).finally(()=>{
    setDeletingId('')
})
},[router])

  return (
    <div>
        <Heading 
        title='Reservations'
        description='Bookings on your properties'
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {reservations.map((reservation)=><ListingCard
             key={reservation.id} 
             data={reservation.listing}
             reservation={reservation}
             actionId={reservation.id}
             onAction={onCancel}
             disabled={deletingId === reservation.id}
             actionLabel='Cancel guest reservation'
             currentUser={currentUser}


             />)}
        </div>

    </div>
  )
}

export default ReservationClient