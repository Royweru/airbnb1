import React from 'react'
import EmptyState from '../components/EmptyState'
import Clientonly from '../components/Clientonly'

import getCurrentUser from '@/session/GetCurrentUser'

const favoritesPage = () => {
  return (
    <Clientonly>
        <EmptyState
          title='No favorites found'
          subtitle='looks like you have no favorites listing'
          />
    </Clientonly>
  )
}

export default favoritesPage