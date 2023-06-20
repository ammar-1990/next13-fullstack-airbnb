'use client'

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import {useCallback} from 'react'
import {TbPhotoPlus} from 'react-icons/tb'

declare global {
    var cloudinary:any
}

type Props = {
    onChange:(value:string)=>void,
    value:string
}

const ImageUpload = ({value,onChange}: Props) => {

const handleUpload = useCallback((result:any)=>{
onChange(result.info.secure_url)
},[onChange])

  return (
<CldUploadWidget
onUpload={handleUpload}
uploadPreset="airbnb"
options={{
    maxFiles:1
}}
>
{({open})=>{
    return (
<div onClick={()=>open?.()}
className="flex relative items-center justify-center p-20 border border-dashed cursor-pointer border-neutral-300 border-2 flex-col gap-4 text-neutral-400 hover:opacity-70 duration-300"

>
<TbPhotoPlus size={50} />
<p className="font-semibold text-lg">Click to upload</p>

{value && <div className="absolute inset-0 w-full h-full">
    <Image 
    alt="uoload"
    fill
    style={{objectFit:'cover'}}
    src={value}
    />
    </div>}
</div>
    )
}}
</CldUploadWidget>
  )
}

export default ImageUpload