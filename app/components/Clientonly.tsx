"use client";
import React, { useEffect, useState } from 'react'

interface clientProps{
    children:React.ReactNode
}
const Clientonly:React.FC<clientProps> = ({
    children
}) => {
    const [hasMounted,setHasMounted] = useState(false)
    useEffect(()=>{
        setHasMounted(true)
    },[])

    if(!hasMounted){
        return null
    }
  return (
   <>
    {children}
   </>
  )
}

export default Clientonly