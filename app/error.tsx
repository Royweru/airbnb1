'use client'
import React from 'react'
import { useEffect } from 'react'
import EmptyState from './components/EmptyState'

interface ErrorStateProps{
    error:Error
}

const Error:React.FC<ErrorStateProps> = ({
    error
}) => {

    useEffect(()=>{
       console.error(error)
    },[error])
  return (
    <EmptyState
     title='Ooopsy'
     subtitle='Looks like something went wrong!'
     />
  )
}

export default Error