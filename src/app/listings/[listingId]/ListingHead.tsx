"use client";

import Heart from "@/components/listing/Heart";
import Heading from "@/components/modals/Heading";
import useCountries from "@/hooks/useCountries";
import { safeUser } from "@/types";
import Image from "next/image";

type Props = {
  title: string;
  id: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: safeUser | null;
};

const ListingHead = ({
  title,
  id,
  locationValue,
  imageSrc,
  currentUser,
}: Props) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div>
      <Heading
        title={title}
        description={`${location?.region} , ${location?.label}`}
      />

      <div className="w-full h-[60vh] relative overflow-hidden rounded-xl">
        <Image
        alt="cover"
        src={imageSrc}
        fill
        className="w-full object-cover"
        />
        <div className="absolute top-5 right-5"><Heart listingId={id} currentUser={currentUser} /></div>
      </div>
    </div>
  );
};

export default ListingHead;
