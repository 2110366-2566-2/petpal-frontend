'use client'

import React, { useState, useEffect } from 'react'

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { List, ListItem, ListItemText, ListItemButton, Modal, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import get_service_by_id from '@app/libs/service/service'
import { ServiceInterface, TimeslotInterface } from '@app/(routes)/profile/serviceProvider/[email]/service/_interface/service'
import BasicButton from '@/app/_component/BasicButton';
import rescheduleBooking from '@app/libs/service/rescheduleBooking'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  minWidth: "200px"
};
interface Props {
  // open : boolean;

  // handleOpen: () => void;
  onClose: () => void;
  bookingID: string | null;
  // bookingStartTime : string;
  // bookingEndTime : string;
  serviceID: string | null;
  timeslotID: string | null;
  startTime: string | null;
  endTime: string | null;
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

const formatTimeStringHourMinute = (timeString: string) => {
  // Parse the input time string into a Date object

  const date = new Date(timeString);

  // Extract components (month, day, hour, minute)
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  // Construct the formatted string
  const formattedString = `${hour}-${minute}`;

  return formattedString;
};


export default function RescheduleForm({ bookingID, serviceID, timeslotID, startTime, endTime, onClose }: Props) {

  const router = useRouter();
  // console.log("RescheduleForm", bookingID, serviceID, timeslotID, startTime, endTime);
  // console.log(dayjs(startTime).format(), dayjs(endTime).toDate)
  // console.log(bookingID, serviceID, timeslotID);
  const defultTimeslotID = timeslotID;
  const timeslotsByDate = new Map<string, TimeslotInterface[]>();
  const allowedDates: Date[] = [];
  const [service, setService] = useState<ServiceInterface | null>(null);
  const [selectedDateSlot, setselectedDateSlot] = useState<TimeslotInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(startTime));
  const [selectedStartDate, setselectedStartDate] = useState<Dayjs>(dayjs(startTime));
  const [selectedEndDate, setselectedEndDate] = useState<Dayjs>(dayjs(endTime));
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedTimeslotID, setSelectedTimeslotID] = React.useState(defultTimeslotID);
  const [openSelectTimeModal, selectOpenSelectTimeModal] = useState<boolean>(false)
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



  console.log('Allowed Dates:', allowedDates);
  console.log('timeslotsByDate:', timeslotsByDate);






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

      const result = await toast.promise(
        rescheduleBooking(bookingID, selectedTimeslotID),
        {
          loading: 'Rescheduling booking...', // Optional message while promise is pending
          success: 'Rescheduling booking successfully!', // Optional success message
          error: 'Rescheduling booking fail', // Optional error message
        });
      // console.log("Rescheduling booking...");
      // console.log(bookingID, selectedTimeslotID);

      router.push('/bookingLoading')
      // toast.success("Rescheduling booking completed successfully!");
      // onClose();
    } catch (error) {
      router.push('/bookingLoading')
      // onClose();
      console.error("Error rescheduling booking:", error);
    }
  }

  const HandleOpenSelectTimeModal = () => selectOpenSelectTimeModal(true);
  const HandleCloseSelectTimeModal = () => selectOpenSelectTimeModal(false);


  return (

    <>
      <Modal
        open={openSelectTimeModal}
        onClose={HandleCloseSelectTimeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle} >

          <List
            sx={{
              padding: 0,
              maxWidth: 360,
              overflow: 'auto',
              maxHeight: 300,
            }}
          >

            {selectedDateSlot.map((item, index) => (
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  setSelectedTimeslotID(item.timeslotID);
                  setselectedStartDate(dayjs(item.startTime))
                  setselectedEndDate(dayjs(item.endTime))
                }
                }
              >
                <ListItemText primary={`${formatTimeString(item.startTime)} to ${formatTimeString(item.endTime)}`} />
                {/* <ListItemText primary={`${formatTimeStringHourMinute(item.startTime)} to ${formatTimeStringHourMinute(item.endTime)}`} /> */}
              </ListItemButton>
            ))}

          </List>
          <button
            onClick={() =>
              HandleCloseSelectTimeModal()
            }
          >
            <div className="font-bold text-[16px] ml-3 text-[#FF5858]">
              Close
            </div>
          </button>
        </Box>
      </Modal>

      <Grid container >


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => {
              console.log(newValue.format('YYYY-MM-DD'));
              setselectedDateSlot(timeslotsByDate.get(newValue.format('YYYY-MM-DD')) || []);
              setSelectedDate(newValue);
              HandleOpenSelectTimeModal();

            }}
            shouldDisableDate={disableDate}
          />
        </LocalizationProvider>




        <Grid xs={8} >
          <div>Selected Time</div>
          <div>{formatTimeString(selectedStartDate.format())} - {formatTimeString(selectedEndDate.format())} </div>

        </Grid>
        <Grid xs={4} >

          <Button color="primary"
            variant="contained"
            //       className="py-2 px-5 bg-[#FF872F] text-white font-semibold rounded-full shadow-md hover:bg-orange-500 
            // focus:outline-none focus:ring focus:ring-orange-400 focus:ring-opacity-75"
            onClick={() => { handleReschedule(); }}
            disabled={selectedTimeslotID == defultTimeslotID}
            style={{ marginRight: '5px' }}
          >
            Reschedule
          </Button>
          <Button
            
            variant="outlined" color="error"
            onClick={() =>
              onClose()
            }
          >

            Cancle
          </Button>

        </Grid>
      </Grid>

    </>

  )
}