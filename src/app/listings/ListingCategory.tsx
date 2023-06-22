import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    Icon:IconType,
    label:string,
    description:string
}

const ListingCategory = ({Icon,label,description}: Props) => {
  return (
    <div className='py-4 flex items-center gap-6'>
        <Icon  size={40} className='text-neutral-600'/>
        <div>
            <h3 className='font-bold text-lg'>{label}</h3>
            <p className='text-neutral-400'>{description}</p>
        </div>
    </div>
  )
}

export default ListingCategory