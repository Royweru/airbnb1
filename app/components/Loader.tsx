import React from 'react'
import  {PulseLoader } from 'react-spinners'
const Loader = () => {
  return (
    <div
     className=' 
      h-[70vh]
      flex
      flex-col
      justify-center
      items-center
     '
    >
       <PulseLoader size={150} color='grey' /> 
    </div>
  )
}

export default Loader