"use client";

import Container from "@/components/Container";
import ListingCard from "@/components/listing/ListingCard";
import Heading from "@/components/modals/Heading";
import { safeReservation, safeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

type Props = {
  reservations: safeReservation[];
  currentUser: safeUser | null;
};

const TripsClient = ({ reservations, currentUser }: Props) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
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
          title="Trips"
          description="Where you have been and where you are going"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TripsClient;
