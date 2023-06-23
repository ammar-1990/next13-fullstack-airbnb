'use client'

import Container from "@/components/Container"
import { safeReservation, safeUser } from "@/types"


type Props = {
    reservations:safeReservation[],
    currentUser:safeUser | null
}

const TripsClient = ({reservations,currentUser}: Props) => {
  return (
    <div className="-mt-28">
    <Container >TripsClient</Container>
    </div>

  )
}

export default TripsClient