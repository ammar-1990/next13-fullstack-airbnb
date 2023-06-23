import { getSession } from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import Container from "@/components/Container"
import EmptyState from "@/components/EmptyState"
import ReservationClient from "./ReservationClient"


type Props = {}

const page = async(props: Props) => {

    const currentUser = await getSession()
    const reservations = await getReservations({authorId:currentUser?.id})
if(!currentUser ) return <EmptyState title="Unauthorized" description="Please login" />
if(reservations.length === 0) return <EmptyState title="No reservations found" description="You don't have any reservations yet" />

  return (
    <div className="-mt-24">
        <Container>
<ReservationClient 
reservations = {reservations}
currentUser={currentUser}
/>
        </Container>
    </div>
  )
}

export default page