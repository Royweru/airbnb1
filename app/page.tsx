
import Clientonly from './components/Clientonly'
import EmptyState from './components/EmptyState'
import getListings from '@/actions/getListings'
import ListingCard from './components/listings/ListingCard'
import getCurrentUser from '@/session/GetCurrentUser'
export default async function Home() {

 const currentUser = getCurrentUser()
  const listings = await getListings()


  if(listings.length ===0){
    return(
      <Clientonly>
        <EmptyState showReset />
      </Clientonly>
    )
  }
  return (
    <Clientonly>
     <main className="flex min-h-screen flex-col  justify-between">
      <div className='
       pt-24
       grid
       grid-cols-1
       sm:grid-cols-2
       md:grid-cols-3
       lg:grid-cols-4
       xl:grid-cols-5
       2xl:grid-cols-6
       gap-8
      '>
        {listings.map(listing=>(
          <ListingCard 
           key ={listing.id}
           data = {listing}
           currentUser={currentUser}
          />
        ))}
      </div>
    </main>
    </Clientonly>

  )
}
