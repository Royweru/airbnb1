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
      height={35}
      width={35}
      src= {src ||'/images/placeholder.jpg'}
      alt=''
      className=' rounded-full'
      />
  )
}

export default Avatar