"use client";
import qs from "query-string";
import { useState, useMemo, useCallback } from "react";
import Modal from "./Modal";
import useSearchModal from "@/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountrySelectValue } from "../CountrySelect";
import { formatISO } from "date-fns";

type Props = {};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = (props: Props) => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [guestCount, setGuestCount] = useState(1);
  const [roomsCount, setRoomsCount] = useState(1);
  const [bathroomsCount, setBathoomsCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [location, setLocation] = useState<CountrySelectValue>();

  const Map = useMemo(
    () => dynamic(() => import("./Map"), { ssr: false }),

    [location]
  );

  const [step, setStep] = useState(STEPS.LOCATION);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery:any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomsCount,bathroomsCount
    };

    if(dateRange.startDate){
updatedQuery.startDate = formatISO(dateRange.startDate)
    }
    if(dateRange.endDate){
updatedQuery.endDate = formatISO(dateRange.endDate)
    }
const url = qs.stringifyUrl({
    url:'/',
    query:updatedQuery
},{skipNull:true})
setStep(STEPS.LOCATION)
searchModal.onClose()
router.push(url)

  }, [step,searchModal,location,guestCount,roomsCount,bathroomsCount,router,dateRange,onNext,params]);

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      actionLabel="Search"
    />
  );
};

export default SearchModal;
