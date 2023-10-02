import EmptyState from "../components/EmptyState";
import Clientonly from "../components/Clientonly";


import getCurrentUser from "@/session/GetCurrentUser";
import getReservations from "@/actions/getReservations";

import TripsClient from "./TripsClient";

const TripsPage =async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return(
            <Clientonly>
                <EmptyState
                  title="Unauthorized"
                  subtitle="please login"
                  />
            </Clientonly>
        )
    }

    const reservations = await getReservations({
        userId:currentUser.id
    })

    if(reservations.length===0){
        return(
            <Clientonly>
                <EmptyState
                 title="No trips found"
                 subtitle="Looks like you havent reserved any trips"
                />
            </Clientonly>
        )
    }
  console.log(reservations)
    return(
        <Clientonly>
            <TripsClient
              reservations={reservations}
              currentUser={currentUser}
              />
        </Clientonly>
    )
}

export default TripsClient