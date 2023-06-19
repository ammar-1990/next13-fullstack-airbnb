"use client";

import React from "react";
import { IconType } from "react-icons";
import {useRouter,useSearchParams} from 'next/navigation'
import qs from 'query-string'
import {useCallback} from 'react'

type Props = {
  label: string;
  Icon: IconType;
  description?: string;
  selected?: boolean;
};




const CategoryCard = ({ label, Icon, description, selected }: Props) => {

const router = useRouter()
const params = useSearchParams()

const handleClick = useCallback(()=>{
    let currentQuery = {}

    if(params) currentQuery = qs.parse(params.toString())
const updatedQuery : any ={
    ...currentQuery,category:label
}

if(params?.get('category')===label)
{
    
    delete updatedQuery.category
}

const url = qs.stringifyUrl({
    url:'/',
    query:updatedQuery
},{skipNull:true})

router.push(url)

},[label,params,router])

  return (
    <div onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 hover:text-neutral-800 cursor-pointer duration-300 p-3 border-b-2 flex-shrink-0 ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-b-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <p>{label}</p>
    </div>
  );
};

export default CategoryCard;
