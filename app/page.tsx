import Image from 'next/image'
import Clientonly from './components/Clientonly'
import EmptyState from './components/EmptyState'
import getListings from '@/actions/getListings'
import ListingCard from './components/listings/ListingCard'
export default async function Home() {

  const listings = await getListings()
  const isEmpty = true

  if(listings.length === 0){
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
          />
        ))}
      </div>
    </main>
    </Clientonly>

  )
}
