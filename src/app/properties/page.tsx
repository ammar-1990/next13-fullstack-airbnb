import EmptyState from "@/components/EmptyState"
import { getSession } from "@/actions/getCurrentUser"
import PropertiesClient from "./PropertiesClient"
import getListings from "@/actions/getListings"

type Props = {}

const page = async(props: Props) => {

    const currentUser = await getSession()
const listings = await getListings({userId:currentUser?.id})


    if(!currentUser) return <EmptyState
    description="Unauthorized"
    title="Please login"

    />

if(listings.length === 0 ) return <EmptyState 
title="No properties found"
description="You have no properties"
/>

  return (
<PropertiesClient 
listings = {listings}
currentUser={currentUser}
/>
  )
}

export default page