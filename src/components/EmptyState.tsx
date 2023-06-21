'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './modals/Heading'

type Props = {
    title?:string,
    description?:string,
    showReset?:boolean
}

const EmptyState = ({title = 'No exact matches',description = 'Try to change or remove some of your filters',showReset}: Props) => {

const router = useRouter()

  return (
    <div className='h-[60vh] flex items-center justify-center flex-col gap-4 '>
<Heading title={title} description={description} center/>
{showReset&&<button
className='border-black border  py-2 px-4 rounded-lg font-semibold'
onClick={()=>router.push('/')}>Remove all filters</button>}
    </div>
  )
}

export default EmptyState