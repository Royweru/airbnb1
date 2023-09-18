'use client'
import Container from '@/app/components/Container';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';

import ListingReservation from '@/app/components/listings/ListingReservation';
import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';

const initialDateRange = {
    startDate:new Date(),
    endDate:new Date(),
    key:'selection'
}
interface ListingClientProps{
    currentUser?:SafeUser |null,
    reservations?:Reservation[];
    listing:SafeListing&{
        user:SafeUser
    };

}
const ListingClient:React.FC<ListingClientProps> = ({
    currentUser,
    reservations=[],
    listing
}) => {

    const loginModal = useLoginModal();
    const router = useRouter()

    const disabledDates = useMemo(()=>{
        let dates:Date[] = []

        reservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start:new Date(reservation.startDate),
                end:new Date(reservation.endDate)
            });

            dates = [...dates, ...range]
        })

        return dates
    },[reservations])

    const[isLoading, setIsLoading] = useState(false)
    const[totalPrice, setTotalPrice] = useState(listing.price)
    const[dateRange, setDateRange]= useState(initialDateRange)

    const onCreateReservation = useCallback(()=>{
       if(currentUser){
        loginModal.onOpen
       }

       setIsLoading(true),

       axios.post('/api/reservations',{
        totalPrice,
        startDate:dateRange.startDate,
        endDate:dateRange.endDate,
        listingId:listing?.id
       }).then(()=>{
        console.log('succcess!')
        router.refresh()
       }).catch((err)=>{
        console.error(err)
       }).finally(()=>{
        setIsLoading(false)
       })
    },[
        totalPrice,
        dateRange,
        listing?.id,
        currentUser,
        loginModal,
        router
    ])

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }else{
                setTotalPrice(listing.price)
            }
        }
    },[dateRange,listing.price])

    const category = useMemo(()=>{
        return categories.find(item=>item.label ===listing.category)
    },[listing.category])
  return (
    <Container>
        <div className=' max-w-screen-lg mx-auto'>
            <div className=' flex flex-col gap-6'>
              <div className=' 
               order-first
               mb-10
               md:order-last
               md:col-span-3
              '>
                    <ListingReservation
                       price={listing.price}
                       totalPrice = {totalPrice}
                       onChangeDate = {(value)=>setDateRange(value)}
                       dateRange = {dateRange}
                       onSubmit = {onCreateReservation}
                       disabled = {isLoading}
                       disabledDates = {disabledDates}
                    />
              </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient