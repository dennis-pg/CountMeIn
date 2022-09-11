import PropTypes from 'prop-types';
import * as React from 'react';
import {
  Typography, Box, Modal
} from '@mui/material';
import { getDefaultPolicy, updatePolicy } from '../../../../../FirestoreMember';
import DefaultPolicyControl from '../PolicyControl/DefaultPolicyControl';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../../contexts/AuthContext';

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

const DefaultDataPointValuesModal = ({ open, handleClose }) => {
  const { currentUser } = useAuth();
  const { isLoading, isFetching, data } = useQuery(['member-profile'], async() => {
    const defaultPolicy = await getDefaultPolicy(currentUser?.uid);
    return defaultPolicy;
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography sx={{ mb: 3, fontWeight: 500, textAlign: 'center' }}>
          Default Values
        </Typography>
        { isLoading || isFetching 
          ?
          <></>
          :
          <>
            {
              ["Academia", "Commercial", "Government"]
                .map(category => {
                  return (
                    <DefaultPolicyControl 
                      data={data?.['Access']?.[category] ?? undefined}
                      dataPointName={"master_value"}
                      category={category}
                    />
                  );
                })
            }
          </>
        }
      </Box>
    </Modal>
  );
};

DefaultDataPointValuesModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default DefaultDataPointValuesModal;
