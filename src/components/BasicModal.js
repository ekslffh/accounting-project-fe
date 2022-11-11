import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import { Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  var handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant={props.variant} color={props.color} size='small' onClick={handleOpen}>{props.name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Close onClick={handleClose} />
          {props.children}
        </Box>
      </Modal>
    </>
  );
}
