'use client'

import React, { useState, useEffect } from 'react'

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import get_service_by_id from '@app/libs/service/service'
import { ServiceInterface, TimeslotInterface } from '@app/(routes)/profile/serviceProvider/[email]/service/_interface/service'
import BasicButton from '@/app/_component/BasicButton';
import rescheduleBooking from '@app/libs/service/rescheduleBooking'


interface Props {
  // open : boolean;

  // handleOpen: () => void;
  onClose: () => void;
  bookingID: string | null;
  // bookingStartTime : string;
  // bookingEndTime : string;
  serviceID: string | null;
  timeslotID: string | null;
}

const formatTimeString = (timeString: string) => {
  // Parse the input time string into a Date object
  const date = new Date(timeString);

  // Extract components (month, day, hour, minute)
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  // Construct the formatted string
  const formattedString = `${month}-${day}:${hour}-${minute}`;

  return formattedString;
};

export default function RescheduleForm({ bookingID, serviceID, timeslotID,onClose }: Props) {

  // console.log(bookingID, serviceID, timeslotID);
  const defultTimeslotID = timeslotID;
  const timeslotsByDate = new Map<string, TimeslotInterface[]>();
  const allowedDates: Date[] = [];
  const [service, setService] = useState<ServiceInterface | null>(null);
  const [selectedDateSlot, setselectedDateSlot] = useState<TimeslotInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedTimeslotID, setSelectedTimeslotID] = React.useState(defultTimeslotID);
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  // // Define your allowed dates
  if (!serviceID) {
    return <div>Service ID is required</div>;
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await get_service_by_id(serviceID);

        if (!response)
          return;

        setService(response);

      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetch()
  }, [])
  if (service !== null && service.timeslots) {
    service.timeslots.forEach((timeslot: TimeslotInterface) => {
      const dateKey = timeslot.startTime.split('T')[0]; // Extract date part (YYYY-MM-DD)
      if (timeslotsByDate.has(dateKey)) {

        let existingslots = timeslotsByDate.get(dateKey);
        if (existingslots === undefined) {
          existingslots = [timeslot];
        }
        else
          existingslots.push(timeslot);
        timeslotsByDate.set(dateKey, existingslots);
      } else {
        allowedDates.push(new Date(dateKey));
        timeslotsByDate.set(dateKey, [timeslot]);
      }
    })
  }



  // console.log('Allowed Dates:', allowedDates);
  // console.log('timeslotsByDate:', timeslotsByDate);






  const disableDate = (date: Dayjs) => {
    const dayjsDate = dayjs(date);

    // Check if the dayjsDate is in the allowedDates array
    return !allowedDates.some(allowedDate => dayjs(allowedDate).isSame(dayjsDate, 'day'));

  }

  const handleReschedule = async () => {
    if (!bookingID || !selectedTimeslotID) {
      console.error("Booking ID or timeslot ID is missing");
      return;
    }

    try {
      console.log("Rescheduling booking...");
      console.log(bookingID, selectedTimeslotID);
      await rescheduleBooking(bookingID, selectedTimeslotID);
      onClose();
    } catch (error) {
      console.error("Error rescheduling booking:", error);
    }
  }



  return (



    <Grid container spacing={5}>
      <Grid xs={6}>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              console.log(newValue.format('YYYY-MM-DD'));
              setselectedDateSlot(timeslotsByDate.get(newValue.format('YYYY-MM-DD')) || []);
              setSelectedDate(newValue);
            }}
            shouldDisableDate={disableDate}
          />
        </LocalizationProvider>

      </Grid>

      <Grid xs={6}>
        <List
          sx={{
            maxWidth: 360,
            overflow: 'auto',
            maxHeight: 300,
          }}
        >

          {selectedDateSlot.map((item, index) => (
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => {setSelectedIndex(index);
              setSelectedTimeslotID(item.timeslotID);
              }
            }
            >
              <ListItemText primary={`${formatTimeString(item.startTime)} to ${formatTimeString(item.endTime)}`} />
            </ListItemButton>
          ))}

        </List>
      </Grid>
      <Grid xs={8} >
      </Grid>
      <Grid xs={4} >
        

          <BasicButton

            name={"Change"}

            onClick={() => {handleReschedule(); }}
          >
          </BasicButton>

      </Grid>
    </Grid>



  )
}