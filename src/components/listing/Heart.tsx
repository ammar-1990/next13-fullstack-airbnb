import { safeUser } from '@/types'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type Props = {
    listingId:string,
    currentUser?: safeUser|null ,
}

const Heart = ({listingId,currentUser}: Props) => {
    const hasFavorited = false
const toggleFavorite = ()=>{}

  return (
    <div
    onClick={toggleFavorite}
    className='cursor-pointer hover:opacity-80 duration-300 relative'
    >
        <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px]' />
        <AiFillHeart size={24} className={`${hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}`} />
    </div>
  )
}

export default Heart