'use client'

import Container from "../Container"
import {TbBeach} from 'react-icons/tb'
import {GiWindmill} from 'react-icons/gi'
import {MdVilla} from 'react-icons/md'
import CategoryCard from "./CategoryCard"
import {useSearchParams,usePathname} from 'next/navigation'


export const categories = [
    {
        
            label:'Beach',
            Icon:TbBeach,
            desctiption:"This propery is close to the beach!"
        
    },
    {
        
            label:'Windmills',
            Icon:GiWindmill,
            desctiption:"This propery has windmills!"
        
    },
    {
        
            label:'Modern',
            Icon:MdVilla,
            desctiption:"This propery is modern!"
        
    },
]


type Props = {}

const Categories = (props: Props) => {
const params = useSearchParams()
const category = params?.get('category')
const pathName = usePathname()
const isMainPage = pathName === '/'


if(!isMainPage) return null
  return (
    <Container>
        <div className="flex items-center p-4 justify-between">
{categories.map(el=><CategoryCard key={el.label} label={el.label} Icon={el.Icon} selected={category === el.label} />)}
        </div>
    </Container>
  )
}

export default Categories