'use client'
import {useRouter} from 'next/navigation'
import Image from 'next/image'


type Props = {}

const Logo = (props: Props) => {

    const router = useRouter()
  return (
 <Image 
 alt='logo'
 className='hidden md:block cursor-pointer'
 width={100}
 height={100}
 src={'/images/logo.png'}
 />
  )
}

export default Logo