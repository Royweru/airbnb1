'use client';

import Image from "next/image";

import React from 'react'
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter()
  return (
    
    <Image
    onClick={()=>{router.push('/')}}
     alt=""
     className="hiddden md:block cursor-pointer"
     height='50'
     width='50'
     src='/images/logo.png'
     />
  )
}

export default Logo