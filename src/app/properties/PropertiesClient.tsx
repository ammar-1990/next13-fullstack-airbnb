"use client";

import Container from "@/components/Container";
import ListingCard from "@/components/listing/ListingCard";
import Heading from "@/components/modals/Heading";
import { safeListing, safeReservation, safeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

type Props = {
  listings: safeListing[];
  currentUser: safeUser | null;
};

const PropertiesClient = ({ listings, currentUser }: Props) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
          console.log(error)
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <div className="-mt-28">
      <Container>
        <Heading
          title="Properties"
          description="List of your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
           
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PropertiesClient;
