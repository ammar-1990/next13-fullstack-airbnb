"use client";

import { Range } from "react-date-range";
import Calendar from "./Calendar";

type Props = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: Props) => {
  return (
    <div className="border border-neutral-100 rounded-xl bg-white overflow-hidden">
      <div className="flex items-center gap-3  p-4">
        <p className="text-lg font-semibold">${price}</p>
        <p>night</p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />

      <div className="p-4">
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="w-full py-4 disabled:opacity-70 bg-rose-500 text-white rounded-lg text-lg"
        >
          {disabled ? "Reserving..." : "Reserve"}
        </button>
      </div>
      <div className="flex items-center justify-between text-xl font-semibold p-4">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
