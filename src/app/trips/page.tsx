import EmptyState from "@/components/EmptyState"
import getReservations from "@/actions/getReservations"
import { getSession } from "@/actions/getCurrentUser"
import TripsClient from "./TripsClient"

type Props = {}

const page = async(props: Props) => {

    const currentUser = await getSession()
const reservations = await getReservations({userId:currentUser?.id})


    if(!currentUser) return <EmptyState
    description="Unauthorized"
    title="Please login"

    />

if(reservations.length === 0 ) return <EmptyState 
title="No trips found"
description="You have not reserved any trips yet."
/>

  return (
<TripsClient 
reservations = {reservations}
currentUser={currentUser}
/>
  )
}

export default page