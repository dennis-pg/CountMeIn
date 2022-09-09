import PropTypes from 'prop-types';
import * as React from 'react';
import {
  Typography, Button, Box, Modal
} from '@mui/material';
import PolicyControls from '../PolicyControls/index';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DefaultDataPointValuesModal = ({ open, handleClose }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Typography sx={{ mb: 3 }}>
        Default Values
      </Typography>
      <PolicyControls />
      <Button
        variant="contained"
        sx={{ m: 2 }}
        onClick={() => handleClose()}
      >
        Copy to All
      </Button>
    </Box>
  </Modal>
);

DefaultDataPointValuesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default DefaultDataPointValuesModal;
