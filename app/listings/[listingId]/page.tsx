import getListingById from '@/actions/getListingById'
import Clientonly from '@/app/components/Clientonly'
import EmptyState from '@/app/components/EmptyState'
import getCurrentUser from '@/session/GetCurrentUser'
import ListingClient from './ListingClient'
import getReservations from '@/actions/getReservations'
interface IParams{
    listingId?:string
}
const ListingPage =async ({params}:{params:IParams}) => {
    const listing =await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()
    if(!listing){
      return(
        <Clientonly>
          <EmptyState/>
        </Clientonly>
      )
    }
  return (
    <Clientonly>
     <ListingClient 
      listing = {listing}
      reservations={reservations}
      currentUser = {currentUser}
     />
    </Clientonly>
  )
}

export default ListingPage