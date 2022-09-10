import * as React from 'react';
import {
  Typography, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import PropTypes from 'prop-types';
import PolicyControls from '../PolicyControls/index';
import { useManageDataPointsFormContext } from '../../../contexts/ManageDataPointsFormContext';


const DataPointAccordion = ({ dataPointName, data, panel, handleAccordionToggle }) => {
  const [accessControlState, setAccessControlState] = React.useState([]);
  const { handleChange } = useManageDataPointsFormContext();

  React.useEffect(() => {
    setAccessControlState(data.access_control);
  }, [data]);

  React.useEffect(() => {
    handleChange("access_control", accessControlState);
  }, [accessControlState]);

  const onChange = (data, key, value) => {
    setAccessControlState([...accessControlState]
      .map(object => {
        if(object.access_name == data.access_name){
          return({
            ...object,
            [key] : value
          })
        } else{
          return object;
        }
      })
    )
    console.log("Access control state", accessControlState);
  };

  return (
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
          {
            accessControlState
            .map(entry => {
              // console.log("entry", entry, entry.access_name);
              return (
                <PolicyControls 
                  data={entry}
                  category={entry.access_name}
                  onChange={onChange}
                />
              );
            })
          }          
        </AccordionDetails>
      </Accordion>
    );
}
  

DataPointAccordion.propTypes = {
  dataPointName: PropTypes.string.isRequired,
  panel: PropTypes.string,
  handleAccordionToggle: PropTypes.func.isRequired
};

DataPointAccordion.defaultProps = {
  panel: undefined,
};

export default DataPointAccordion;
