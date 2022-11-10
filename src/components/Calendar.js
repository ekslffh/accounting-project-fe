import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function Calendar(props) {

  const handleChange = (newValue) => {
    props.setDateTime(newValue.format("YYYY-MM-DDTHH:mm:ss"));
  };

  return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="날짜 및 시간"
            value={props.dateTime}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            minDate={dayjs('2017-01-01')}
            disableFuture
          />
    </LocalizationProvider>
  );
}
