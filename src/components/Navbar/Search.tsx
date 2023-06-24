'use client'
import useCountries from '@/hooks/useCountries'
import useSearchModal from '@/hooks/useSearchModal'
import { useSearchParams } from 'next/navigation'
import {BiSearch} from 'react-icons/bi'
import {useMemo} from 'react'
import { differenceInDays } from 'date-fns'

type Props = {}

const Search = (props: Props) => {
const searchModal = useSearchModal()
const params = useSearchParams()
const {getByValue} = useCountries()

const locationValue = params?.get('locationValue')
const startDate = params?.get('startDate')
const endDate = params?.get('endDate')
const guestCount = params?.get('guestCount')



const locationLabel = useMemo(()=>{
  if(locationValue){
    return getByValue(locationValue as string)?.label
  }

  return 'Any where'
},[locationValue,getByValue])


const durationLabel = useMemo(()=>{

  if(startDate && endDate) {
    const start = new Date(startDate as string) 
    const end = new Date(endDate as string)

    let diff = differenceInDays(end,start)

    if(diff === 0){
      diff =1
    }


    return `${diff} Days` 
  }

  return 'Any Week'
},[startDate,endDate])


const guestLabel = useMemo(()=>{
if(guestCount){
  return `${guestCount} Guest(s)`
}

return `Add Guests`

},[guestCount])

  return (
    <div onClick={searchModal.onOpen} className='flex items-center py-2 rounded-full cursor-pointer shadow-sm hover:shadow-md duration-300 border pl-6 pr-2 w-full md:w-fit justify-between'>
        <span className=' pr-3 hidden sm:block'>{locationLabel}</span>
        <span className='px-6 border-x  hidden sm:block'>{durationLabel}</span>
        <span className='text-gray-500 pl-3'>{guestLabel}</span>
        <span className='bg-rose-500 rounded-full p-2 ml-3 '><BiSearch color='white' size={18}/></span>
    </div>
  )
}

export default Search