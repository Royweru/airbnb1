import React from 'react'
import Image from 'next/image'
 interface AvatarProps{
  src:string|undefined|null
 }

const Avatar:React.FC<AvatarProps> = (
  {src}
) => {
  return (
    <Image
      height={30}
      width={30}
      src= {src ||'/images/placeholder.jpg'}
      alt=''
      />
  )
}

export default Avatar