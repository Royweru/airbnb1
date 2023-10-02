
import getCurrentUser from '@/session/GetCurrentUser'
import React from 'react'
import { toast } from 'react-hot-toast'
import Clientonly from '../components/Clientonly'
import EmptyState from '../components/EmptyState'
import getReservations from '@/actions/getReservations'
import ReservationClient from './ReservationClient'



const ReservationPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return(
            <Clientonly>
                <EmptyState
                 title='Unauthorized'
                 subtitle='please login'
                 />
            </Clientonly>
        )
    }
    const reservations = await getReservations({
      authorId: currentUser.id
    })

    console.log(reservations)

    if(reservations.length === 0){
        return(
            <Clientonly>
                <EmptyState
                  title='No reservations found'
                  subtitle='looks like you have no reservations on your properties'
                  />
            </Clientonly>
        )
    }

  return (
    <Clientonly>
        <ReservationClient
         reservations = {reservations}
         currentUser={currentUser}
        />
    </Clientonly>
  )
}

export default ReservationPage