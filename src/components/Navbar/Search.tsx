'use client'
import {BiSearch} from 'react-icons/bi'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className='flex items-center py-2 rounded-full cursor-pointer shadow-sm hover:shadow-md duration-300 border pl-6 pr-2 w-full md:w-fit justify-between'>
        <span className=' pr-3 hidden sm:block'>Any where</span>
        <span className='px-6 border-x  hidden sm:block'>Any week</span>
        <span className='text-gray-500 pl-3'>Add Guests</span>
        <span className='bg-rose-500 rounded-full p-2 ml-3 '><BiSearch color='white' size={18}/></span>
    </div>
  )
}

export default Search