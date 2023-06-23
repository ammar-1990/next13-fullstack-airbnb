'use client'

import useCountries from '@/hooks/useCountries'
import { safeListing, safeReservation, safeUser } from '@/types'
import {Listing,User,Reservation} from '@prisma/client'
import { useRouter } from 'next/navigation'
import {useCallback, useMemo} from 'react'
import {format} from 'date-fns'
import Image from 'next/image'
import Heart from './Heart'

type Props = {
    data:safeListing,
    currentUser?: safeUser|null ,
    reservation?:safeReservation
    onAction?:(id:string)=>void
    disabled?:boolean,
    actionLabel?:string,
    actionId?:string
}

const ListingCard = ({data,currentUser,reservation,onAction,disabled,actionLabel,actionId=''}: Props) => {

    const router = useRouter()
    const {getByValue} = useCountries()
    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation()

        if(disabled) return
onAction?.(actionId)

    },[onAction,actionId,disabled])


    const price = useMemo(()=>{
if(reservation) return reservation.totalPrice

return data.price
    },[reservation,data.price])


    const reservationDate = useMemo(()=>{
        if(!reservation) return null


        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`


    },[reservation])
    console.log(reservationDate)

  return (
    <div
    onClick={()=>router.push(`/listings/${data.id}`)}
    className='group cursor-pointer'
    >
        <div className='flex flex-col gap-3 w-full'>
        <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
            <Image alt='listing' fill src={data.imageSrc} className='w-full h-full group-hover:scale-110 duration-300 object-cover' />
<div className='absolute top-3 right-3'>
<Heart currentUser={currentUser} listingId={data.id} />
</div>
        </div>
        <p className='font-semibold text-lg'>
{location?.region}, {location?.label}
        </p>
        <p className='font-light text-neutral-500'>
            {reservationDate || data.category}
        </p>
        <div className='flex items-center gap-1 '>
            <p className='font-semibold'>$ {price}</p>
            {!reservation && (<p className='font-light'>night</p>)}

        </div>
        {onAction && actionLabel && (
            <button disabled={disabled} onClick={handleCancel} className='text-white bg-rose-500 w-full disabled:bg-rose-500/80 py-2 rounded-md hover:bg-rose-500/80 duration-300'>{`${disabled?'Canceling...' : actionLabel}`}</button>
        )}

        </div>
      
    </div>
  )
}

export default ListingCard