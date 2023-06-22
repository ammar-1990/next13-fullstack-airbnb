import Avatar from "@/components/Avatar";
import useCountries from "@/hooks/useCountries";
import { safeUser } from "@/types";
import { IconType } from "react-icons";
import ListingCategory from "../ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(()=>import("../../../components/modals/Map"),{ssr:false})

type Props = {
  user: safeUser;
  category: { label: string; Icon: IconType; desctiption: string } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
};

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: Props) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 ">
      <div className="flex flex-col gap-4 py-4">
        <div className="flex items-center gap-5 w-full">
          <p className="font-bold text-lg capitalize">Hosted by {user?.name}</p>
          <Avatar />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-neutral-400">{roomCount} rooms</p>
          <p className="text-sm text-neutral-400">{bathroomCount} bathrooms</p>
          <p className="text-sm text-neutral-400">{guestCount} guests</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          Icon={category.Icon}
          label={category.label}
          description={category.desctiption}
        />
      )}
      <hr />
      <div className="text-neutral-500 text-lg py-4">
{description}
      </div>
      <hr/>
      <div className="py-4">
<Map center={coordinates} />
      </div>
    </div>
  );
};

export default ListingInfo;
