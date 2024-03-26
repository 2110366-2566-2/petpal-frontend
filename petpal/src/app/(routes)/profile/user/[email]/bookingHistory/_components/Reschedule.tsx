
import React, { useState } from 'react'

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Modal,Box,Typography,NativeSelect,InputLabel} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


interface Props {
    open : boolean;

    handleOpen: () => void;
    onClose: () => void;
    bookingID: string | null;
    bookingStartTime : string;
    bookingEndTime : string;
}


export default function RescheduleForm() {

  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // // Define your allowed dates
  const allowedDates = [
    new Date('2024-03-01'),
    new Date('2024-03-02'),
    new Date('2024-03-04')
  ];


  const disableDate = (date : Dayjs) => {
    const dayjsDate = dayjs(date);

  // Check if the dayjsDate is in the allowedDates array
  return ! allowedDates.some(allowedDate => dayjs(allowedDate).isSame(dayjsDate, 'day')); 

  }
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    return (
        
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
       
        <DatePicker
          label="Controlled picker"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          shouldDisableDate={disableDate}
        />
      </DemoContainer>
    </LocalizationProvider>


      // <MuiPickersUtilsProvider utils={DateFnsUtils}>
      // <DatePicker
      //   value={selectedDate}
      //   onChange={handleDateChange}
      //   // shouldDisableDate={(date) => !allowedDates.some(allowedDate => 
      //   //   date.getDate() === allowedDate.getDate() &&
      //   //   date.getMonth() === allowedDate.getMonth() &&
      //   //   date.getFullYear() === allowedDate.getFullYear()
      //   // )}
      //   format="dd/MM/yyyy"
      //   label="Select Date"
        
      // />
    /* </MuiPickersUtilsProvider> */

    )
}