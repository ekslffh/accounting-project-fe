import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RaidoStatus(props) {

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">상태</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={props.status}
        name="radio-buttons-group"
        onChange={props.handleStatusChange}
      >
        <FormControlLabel value="ACTIVE" control={<Radio />} label="활성화" />
        <FormControlLabel value="JOURNEY" control={<Radio />} label="영적여정" />
        <FormControlLabel value="SPECIAL" control={<Radio />} label="특수상황" />
        <FormControlLabel value="INACTIVE" control={<Radio />} label="비활성화" />
      </RadioGroup>
    </FormControl>
  );
}