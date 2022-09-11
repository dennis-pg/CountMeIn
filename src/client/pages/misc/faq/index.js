import { Add, Remove } from '@mui/icons-material';
import {
  Stack, Typography, Card, CardContent, IconButton, Box
} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../shared/components/Layout';
import MailUs from '../../../shared/components/Mail/MailUs';

const FaqData = [
  { question: 'What is Count Me In?', answer: 'Count Me In is an application that connects healthcare users with organizations that can use their data to' },
  { question: 'What is a Member?', answer: 'A Count Me In Member is someone who chooses to share their data and get reimbursed for their information.' },
  { question: 'What is a Buyer?', answer: 'A Miner is an entity or organization that needs medical data for use in research to learn something about people’s health. A miner falls into 4 categories: Academic (Universities), Commercial (for profit and non-profit), Government (Health Information Exchanges, FDA, CDC) and other Members.' },
  { question: 'Can anyone see my data?', answer: 'No. All Miners and Members must have an account that is identity verified.' },
  { question: 'How is my data protected?', answer: 'All data is stored compliant to security protocols that all healthcare providers use. This includes but is not limited to encryption, ' },
  { question: 'What is an audit trail?', answer: 'An audit trail is a record of every Miner that has used your data and how much you were compensated for the use. It makes it easy for you to look back on your participation and follow up with the Miners for results of their study. Each audit trail is linked to the Miner’s account and you can click on the study number that you participated in to find out its current status.' },
  { question: 'How does my information get into the Count Me In system?', answer: 'We use FHIR and encrypted data transfer to retrieve the medical data from your healthcare information. We also integrate with lifestyle trackers like step counters, and home oxygen monitors and blood pressure monitors.' },
];

const Faq = () => {
  const [expanded, setExpanded] = React.useState(-1);
  return (
    <Layout>
      <Stack spacing={10} alignItems="center" sx={{ width: '100vw', paddingTop: 10 }}>
        <Typography variant="h2">FAQs</Typography>
        <Stack spacing={4} sx={{ width: '50vw', paddingBottom: 10 }}>
          {FaqData.map((faq, index) => (
            <QaCard
              {...faq}
              index={index}
              expanded={expanded === index}
              setExpanded={setExpanded}
            />
          ))}
            <MailUs label="Want to know more? Reach us" mailto="mailto:support@count-me-in.com" />
        </Stack>
      </Stack>
    </Layout>
  );
};

const QaCard = ({
  question, answer, index, expanded, setExpanded
}) => (
  <Card
    sx={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 6px 0 rgba(0, 0, 0, 0.19)' }}
  >
    <CardContent>
      <Stack direction="row" spacing={3}>
        <Box>
          {
            expanded
              ? (
                <IconButton
                  onClick={() => { setExpanded(-1); }}
                  color="primary"
                >
                  <Remove />
                </IconButton>
              )
              : (
                <IconButton
                  onClick={() => { setExpanded(index); }}
                >
                  <Add />
                </IconButton>
              )
          }
        </Box>
        <Stack spacing={5} alignItems="start" justifyItems="start">
          <Typography mt={1.3}>{question}</Typography>
          {
            expanded
            && <Typography>{answer}</Typography>
          }
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

QaCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};

export default Faq;
