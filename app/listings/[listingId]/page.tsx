import getListingById from '@/actions/GetListingById'
import Clientonly from '@/app/components/Clientonly'
import EmptyState from '@/app/components/EmptyState'


interface IParams{
    listingId?:string
}
const ListingPage =async ({params}:{params:IParams}) => {
    const listing =await getListingById(params)
    if(!listing){
      return(
        <Clientonly>
          <EmptyState/>
        </Clientonly>
      )
    }
  return (
    <Clientonly>
      <div>
        {listing.title}
      </div>
    </Clientonly>
  )
}

export default ListingPage