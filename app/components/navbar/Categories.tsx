'use client'
import React from 'react'
import{useSearchParams,usePathname} from 'next/navigation'
import Container from '../Container'
import {TbBeach, TbMountain, TbPool} from 'react-icons/tb'
import {BsSnow}from 'react-icons/bs'
import{FaSkiing} from 'react-icons/fa'
import {IoMdAirplane} from 'react-icons/io'
import{GiBarn, GiBoatFishing, GiCactus, GiCastle, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import CategoryBox from '../CategoryBox'
export const categories = [
    {
        label:'Beach',
        icon:TbBeach,
        description:'This property is close to the beach!'
    },
    {
        label:'Windmills',
        icon:GiWindmill,
        description:'This property has windmills!'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        description:'This property is modern!'
    },
    {
        label:'Countryside',
        icon:TbMountain,
        description:'This property is in the countryside!'
    },
    {
        label:'Pools',
        icon:TbPool,
        description:'This property has swimming pools!'
    },
    {
        label:'Islands',
        icon:GiIsland,
        description:'This property is in the island!'
    },
    {
        label:'Lake',
        icon:GiBoatFishing,
        description:'This property is in the lake!'
    },
    {
        label:'Skiing',
        icon:FaSkiing,
        description:'This property has skiing activities!'
    },
    {
        label:'Castles',
        icon:GiCastle,
        description:'This property is in a castle!'
    },
    {
        label:'Camping',
        icon:GiForestCamp,
        description:'This property has camping activities!'
    },
    {
        label:'Arctic',
        icon:BsSnow,
        description:'This property has arctic activities!'
    },
    {
        label:'Cave',
        icon:GiCactus,
        description:'This property is in the desert!'
    },
    {
        label:'Barns',
        icon:GiBarn,
        description:'This property is in the barn!'
    },
    {
        label:'Lux',
        icon:IoMdAirplane,
        description:'This property is luxurious!'
    },


]
const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()
  return (
    <Container>
        <div
        className='
         pt-4
         flex
         flex-row
         items-center
         justify-between
         overflow-x-auto
        '
         >
              {categories.map(item=>(
                <CategoryBox
                  key={item.label}
                  label= {item.label}
                  selected = {category === item.label}
                  icon = {item.icon}
                  />
              ))}
        </div>
    </Container>
  )
}

export default Categories