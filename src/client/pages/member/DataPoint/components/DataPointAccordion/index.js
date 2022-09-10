import * as React from 'react';
import {
  Typography, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import PropTypes from 'prop-types';
import PolicyControls from '../PolicyControls/index';

const DataPointAccordion = ({ dataPointName, panel, handleAccordionToggle }) => (
  <Accordion
    sx={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.19)' }}
    expanded={panel === null || panel === dataPointName}
    onChange={() => handleAccordionToggle(dataPointName)}
  >
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography sx={{ mb: 1, mt: 1 }}>
        {dataPointName}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <PolicyControls />
    </AccordionDetails>
  </Accordion>
);

DataPointAccordion.propTypes = {
  dataPointName: PropTypes.string.isRequired,
  panel: PropTypes.string,
  handleAccordionToggle: PropTypes.func.isRequired
};

DataPointAccordion.defaultProps = {
  panel: undefined,
};

export default DataPointAccordion;
