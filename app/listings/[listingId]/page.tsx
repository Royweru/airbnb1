import getListingById from '@/actions/GetListingById'
import Clientonly from '@/app/components/Clientonly'
import EmptyState from '@/app/components/EmptyState'
import getCurrentUser from '@/session/GetCurrentUser'
import ListingClient from './ListingClient'
interface IParams{
    listingId?:string
}
const ListingPage =async ({params}:{params:IParams}) => {
    const listing =await getListingById(params)
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
      currentUser = {currentUser}
     />
    </Clientonly>
  )
}

export default ListingPage