
import getCurrentUser from '@/session/GetCurrentUser'
import React from 'react'

import Clientonly from '../components/Clientonly'
import EmptyState from '../components/EmptyState'

import PropertiesClient from './PropertiesClient'
import getListings from '@/actions/getListings'


const PropertiesPage= async () => {
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
    const listings = await getListings({
      userId: currentUser.id
    })

   

    if(listings.length === 0){
        return(
            <Clientonly>
                <EmptyState
                  title='No properties found'
                  subtitle='looks like you have no  properties'
                  />
            </Clientonly>
        )
    }

  return (
    <Clientonly>
        <PropertiesClient
         listings = {listings}
         currentUser={currentUser}
        />
    </Clientonly>
  )
}

export default  PropertiesPage