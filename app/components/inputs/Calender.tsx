import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

interface CalenderProps{
    value:Range,
    onChange:(value:RangeKeyDict)=>void;
    disabledDates?:Date[]
}
const Calender:React.FC<CalenderProps> = ({
    value,
    onChange,
    disabledDates
}) => {
  return (
   <DateRange

   />
  )
}

export default Calender