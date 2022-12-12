import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RaidoGender(props) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">성별</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={props.gender}
        name="radio-buttons-group"
        onChange={props.handleGenderChange}
      >
        <FormControlLabel value="MALE" control={<Radio />} label="남" />
        <FormControlLabel value="FEMALE" control={<Radio />} label="여" />
      </RadioGroup>
    </FormControl>
  );
}