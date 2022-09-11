import { Add, ArrowForward, Remove } from '@mui/icons-material';
import {
  Stack, Typography, Card, CardContent, IconButton, Box
} from '@mui/material';
import { Link } from "react-router-dom";
import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../../shared/components/Layout';
import MailUs from '../../../shared/components/Mail/MailUs';
import { useTheme } from '@emotion/react';

const FaqData = [
  {
    question: "What is Count Me In?",
    answer: "Do you want to make money from your health data? Right now your data is being shared without your direct control and you don’t benefit from it. Count Me In puts that power back in YOUR hands and you get PAID for it! "
  },

  {
    question: "Who is a Member?",
    answer: "A Count Me In Member is someone who wants to choose WHO has access to their data, WHAT data they wish to share and HOW MUCH that information is worth to them. Members may have many medical problems or none at all. Every piece of healthcare data from medical information like diagnoses, blood test results, or a chest x-ray, to lifestyle choices such as nutrition and exercise all have value to YOU."
  },

  {
    question: "What is a Buyer?",
    answer: `A Buyer is an entity or organization that needs medical data for use in research regarding people’s health. A buyer falls into three categories: Academia (Universities), Commercial (for profit and non-profit), and Government (Health Information Exchanges, U.S. Food and Drug Administration, Centers for Disease Control and Prevention).
    For more information of Government organizations, please visit their websites:`,
    links: [
      {text: 'FDA', href: 'https://www.fda.gov/'},
      {text: 'Health Information Exchange Primer', href: 'https://www.healthit.gov/topic/health-it-and-health-information-exchange-basics/health-information-exchange'},
      {text: 'CDC', href: 'https://www.cdc.gov/'}
    ]
  },


  {
    question: "What makes Academia a special category of Buyer.",
    answer: `To be classified as Academia, Buyers in this category must submit a study number and/or an approved Institutional Review Board (IRB) submission.`,
    links: [
      {text: 'For more information on clinical trials', href: 'https://clinicaltrials.gov/ '},
      {text: 'For more information on IRB', href: 'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/institutional-review-boards-frequently-asked-questions'}
    ]
  },

  {
    question: "Can anyone see my data?",
    
    answer: `No. Your data is a private account just like a healthcare system’s record. We keep track of any and all access, which you will be able to review in your account.
    `
  },

  {
    question: "How is my data protected?",
    answer: "All data is stored compliant to security protocols that all healthcare providers use. This includes but is not limited to encryption."
  },

  {
    question: "What is an audit trail?",
    answer: "An audit trail is a record of data transaction. Members can see the Buyer that has purchased their data and the purpose of the study. "
  },

  {
    question: "How does my medical information get into the Count Me In system?",
    answer: "We use FHIR and encrypted data transfer to retrieve the medical data from your healthcare information. We also plan to integrate with lifestyle trackers like step counters, and home oxygen monitors and blood pressure monitors."
  },

  {
    question: "How is the audit trail monitored?",
    answer: "Count Me In will be converting to a blockchain database in the future."
  },

  {
    question: "Are all of the studies retrospective? (from data that has been already generated)",
    answer: "Count Me In does not participate in studies that are prospective. This means we do not handle active participants in studies. Members may receive generic offers or advertisements to recruit for prospective studies, but would be outside of Count Me In."
  },

  {
    question: "Can I find out what the results of the study were?",
    answer: "Buyers are required to keep study progress updated until the study is completed. You will be able to find through the link if you participated in the study."
  },

  {
    question: "Will the Buyers try to contact me?", 
    answer: "Count Me In will never provide your contact information to a Buyer. If a study requests to contact members for additional data or active participation, the request will come through Count Me In. We recommend that individuals AVOID contacting Buyers directly."
  },

  {
    question: "Can I see how my data compares to others?",
    answer: "In a future update, we will be adding the ability to see how your data compares to other Members. For example, if you submit your blood pressure data, the Count Me In software can advise you how your numbers compare to other Members with similar profiles and also to national guidelines."
  },

  {
    question: "What happens to a Count Me In account if a Member dies?",
    answer: `All Count Me In Members must respond to a monthly confirmation status prompt via their preferred method (login to Count Me In or authentication method). If not completed, the account becomes suspended for any further transactions. 
    Any transactions while the account was active were previously consented to and thus remain valid.`
  },

  {
    question: "What do the Buyers see when they get my data?",
    answer: "Buyers will get a key number for each member’s data. Count Me In would assign each Member a number (like 33658982 for Study ABCDEFW). They will not receive any direct identifiers."
  },

  {
    question: "Can someone find me from my data?",
    answer: "Count Me In has standards to minimize risk. When a Buyer searches for the data they need, there is a minimum number of data points they must pick to prevent re-identification. For example, if a search criteria is all people who self-identify as Male, then the number needed to keep people from being identified is very low. But if the search wanted all Males that have diabetes and have had a heart attack and are aged 55-60 and live in zip code 55555, then there may not be enough people to keep the identity private so this search wouldn’t be valid for purchase."
  },

  {
    question: "Are the transactions automatic?",
    answer: "No. We will have an account specialist review every transaction requested to purchase to ensure the safety and privacy of Count Me In Members and to ensure quality of data for Buyers."
  },

  {
    question: "I am a Buyer. What information will I get when I put in a search?",
    answer: "Search results will tell you the value of the data you are requesting as defined by Members."
  },

  {
    question: "I am a Buyer. Why does my search result say “Insufficient Members, please change your search parameters”.",
    answer: "If you receive this message in your search, it means that you have requested data that limits the numbers of qualifying Members. This could be for various reasons. Please contact an Account Specialist to discuss if your request is possible and what the next steps are."
  },

  {
    question: "I am a Buyer. What is the difference between Recommended, Minimum and Complete data sets?",
    answer: "Search results will provide you with a selection of data sets. Minimum represents the data set with the least cost. Complete is the full available data set of all qualifying Members.  Recommended is a balance between statistical variability and cost."
  },

  {
    question: "I am a lawyer in a class action suit. Can I get information from you about the value of data to your Members to help justify reparation and compensation amounts for a data breach?",
    answer: "Yes. We will not give individual data, but we can provide aggregate data. Please contact an account specialist to discuss your needs further."
  }
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
  question, answer, links, index, expanded, setExpanded
}) => {
  const theme = useTheme();
  return (
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
              && <Stack spacing={2}> 
                <Typography>{answer}</Typography>
                {
                  links ? links.map( link => <Stack direction="row" alignItems="center" spacing={2}>
                      <ArrowForward />
                      <Link to={link.href} style={linkStyle(theme)}>
                        {link.text}
                      </Link>
                    </Stack>
                  ) : <></>
                }
              </Stack>
            }
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
};

QaCard.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
  setExpanded: PropTypes.func.isRequired,
};

const linkStyle = (theme) => {
  return{
    margin: "1rem",
    textDecoration: "underline",
    color: theme.palette.primary.main,
    fontFamily: 'Thiccboi',
  };  
};

export default Faq;
