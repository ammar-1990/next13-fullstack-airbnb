import { safeUser } from "@/types";
import { IconType } from "react-icons";

type Props = {
  user: safeUser;
  category: { label: string; Icon: IconType; desctiption: string } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
};

const ListingInfo = ({user,category,description,roomCount,guestCount,bathroomCount,locationValue}: Props) => {
  return <div>ListingInfo</div>;
};

export default ListingInfo;
