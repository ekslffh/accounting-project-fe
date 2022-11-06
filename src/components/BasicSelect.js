import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [value, setValue] = React.useState('expenditure');

  React.useEffect(() => {
    if (props.inOrOut) {
      setValue(props.inOrOut);
    }
  },[])

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === 'expenditure') {
      props.setExpenditure(true)
    } else {
      props.setExpenditure(false)
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">수입 또는 지출</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="in_or_out"
          onChange={handleChange}
        >
          <MenuItem value={'income'}>수입</MenuItem>
          <MenuItem value={'expenditure'}>지출</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
