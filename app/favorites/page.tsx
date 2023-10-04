import React from 'react'
import EmptyState from '../components/EmptyState'
import Clientonly from '../components/Clientonly'

import getCurrentUser from '@/session/GetCurrentUser'
import getFavoritesListing from '@/actions/getFavorites'
import FavoritesClient from './FavoritesClient'

const favoritesPage = async() => {

    const listings = await getFavoritesListing()
    const currrentUser = await getCurrentUser()

    if(listings.length===0){
        return (
            <Clientonly>
                <EmptyState
                  title='No favorites found'
                  subtitle='looks like you have no favorites listing'
                  />
            </Clientonly>
          )
    }
  
    return(
        <Clientonly>
            <FavoritesClient
               listings={listings}
               currentUser={currrentUser}
            />
        </Clientonly>
    )
}

export default favoritesPage