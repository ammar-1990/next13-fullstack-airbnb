'use client'

import Image from "next/image"

type Props = {}

const Avatar = (props: Props) => {
  return (
<Image 
alt="avatar"
width={20}
height={20}
className=" rounded-full hidden lg:block"
src={'/images/image-placeholder.png'}
/>
  )
}

export default Avatar