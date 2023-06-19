'use client'

import Container from "../Container"
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
import {MdVilla} from 'react-icons/md'
import {IoDiamond} from 'react-icons/io5'
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
    {
        
            label:'Country side',
            Icon:TbMountain,
            desctiption:"This propery is in the country side!"
        
    },
    {
        
            label:'Pools',
            Icon:TbPool,
            desctiption:"This propery has a pool!"
        
    },
    {
        
            label:'Islands',
            Icon:GiIsland,
            desctiption:"This propery is on an island!"
        
    },
    {
        
            label:'Lake',
            Icon:GiBoatFishing,
            desctiption:"This propery is close to a lake!"
        
    },
    {
        
            label:'Skiing',
            Icon:FaSkiing,
            desctiption:"This propery has skiing activities!"
        
    },
    {
        
            label:'Castles',
            Icon:GiCastle,
            desctiption:"This propery is in a castle!"
        
    },
    {
        
            label:'Camping',
            Icon:GiForestCamp,
            desctiption:"This propery has camping activities!"
        
    },
    {
        
            label:'Arctic',
            Icon:BsSnow,
            desctiption:"This propery is near to snow!"
        
    },
    {
        
            label:'Cave',
            Icon:GiCaveEntrance,
            desctiption:"This propery is in a cave!"
        
    },
    {
        
            label:'Desert',
            Icon:GiCactus,
            desctiption:"This propery is in the desert!"
        
    },
    {
        
            label:'Barns',
            Icon:GiBarn,
            desctiption:"This propery is in the barn!"
        
    },
    {
        
            label:'Lux',
            Icon:IoDiamond,
            desctiption:"This propery is luxurious!"
        
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
        <div className="flex items-center p-4 justify-between overflow-x-auto ">
{categories.map(el=><CategoryCard key={el.label} label={el.label} Icon={el.Icon} selected={category === el.label} />)}
        </div>
    </Container>
  )
}

export default Categories