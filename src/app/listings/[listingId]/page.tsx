

import { getSession } from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import { useSearchParams } from "next/navigation";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";




type Props = {
  listingId: string;
};

const page = async ({params}: {params:Props}) => {

const currentUser = await getSession()
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
if(!listing) return <EmptyState  />


  return (
<ListingClient 
listing = {listing}
currentUser = {currentUser}
reservations={reservations}
/>
  )
}

export default page