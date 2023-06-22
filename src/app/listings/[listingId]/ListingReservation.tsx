'use client'

import {Range} from 'react-date-range'

type Props = {
    price:number,
    dateRange:Range,
    totalPrice:number,
    onRangeDate:(value:Range)=>void,
    onSubmit:()=>void,
    disabled?:boolean,
    disabledDates:Date[]

}

const ListingReservation = ({price,dateRange,totalPrice,onRangeDate,onSubmit,disabled,disabledDates}: Props) => {
  return (
    <div>ListingReservation</div>
  )
}

export default ListingReservation