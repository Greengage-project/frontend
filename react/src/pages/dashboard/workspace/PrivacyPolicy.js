import {
  Box,
  Container,
  Typography,
  Link,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HomeLogo } from "components/Logo";

import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: "collapse",
    border: "1px solid", // Set the color of the outer border here.
    borderColor: theme.palette.divider,
  },
  tableCell: {
    border: "1px solid", // Set the color of the cell borders here.
    borderColor: theme.palette.divider,
    textAlign: "center",
  },
  headerCell: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  firstColumnCell: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
  },
  regularCell: {
    textAlign: "center",
  },
}));

const CookiePolicy = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>{t("Privacy Policy")}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 5,
          px: 1,
        }}
      >
        <Container maxWidth="lg">
          <Paper elevation={3} style={{ padding: '20px' }}>
            <HomeLogo style={{ width: "30%", height: "auto" }} />
            <br />
            <br />

            <div>
              <Typography variant="h4" gutterBottom>
                Privacy Notice for Research Participants
              </Typography>
              <br />

              <Typography variant="h6" gutterBottom>
                Purpose of the Privacy Notice
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                This privacy notice explains how the University of the West of England, Bristol (UWE Bristol) collects, manages and uses your personal data before, during and after you participate in GEENGAGE – Engaging Citizens – Mobilizing Technology – Delivering Green Deal. ‘Personal data’ means any information relating to an identified or identifiable natural person (the data subject).

                This privacy notice adheres to the General Data Protection Regulation (GDPR) principle of transparency. This means it gives information about:
              </Typography>

              <ul style={{ listStyleType: "disc" }}>
                <li>
                  How and why your data will be used for the research;
                </li>
                <li>
                  What your rights are under GDPR; and
                </li>
                <li>
                  How to contact UWE Bristol and the project lead in relation to questions, concerns or exercising your rights regarding the use of your personal data.
                </li>
              </ul>


              <Typography variant="body1" paragraph align='justify'>
                This Privacy Notice should be read in conjunction with the Participant Information Sheet and Ethical Consent Form provided to you before you agree to take part in the research.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Why are we processing your personal data?
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                UWE Bristol and its research partners undertake research under its public function to provide research for the benefit of society. As a data controller we are committed to protecting the privacy and security of your personal data in accordance with the (EU) 2016/679 the General Data Protection Regulation (GDPR), the Data Protection Act 2018 (or any successor legislation) and any other legislation directly relating to privacy laws that apply (together “the Data Protection Legislation”). General information on Data Protection law is available from the Information Commissioner’s Office (https://ico.org.uk/).
              </Typography>

              <Typography variant="h6" gutterBottom>
                How do we use your personal data?
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                We will only process your personal data when the law allows us to. In addition, we will always comply with UWE Bristol’s policies and procedures in processing your personal data. Our lawful basis for using your personal data for research purposes is fulfilling tasks in the public interest, and for archiving purposes in the public interest, for scientific or historical research purposes.

                We will always tell you about the information we wish to collect from you and how we will use it. We will not use your personal data for automated decision making about you or for profiling purposes.

                Our research is governed by robust policies and procedures and, where human participants are involved, is subject to ethical approval from either UWE Bristol’s Faculty or University Research Ethics Committees. This pilot study has been reviewed and approved by the Faculty of Engineering and Technology of the University of West of England and the University’s Research Ethics Committee. Any comments, questions, or complaints about the ethical conduct of this study can be addressed to the Research Ethics Committee at the University of the West of England at:  researchethics@uwe.ac.uk .

                The research team adhere to the principles of the General Data Protection Regulation (GDPR).

                For more information about UWE Bristol’s research ethics approval process please see our Research Ethics webpages at www1.uwe.ac.uk/research/researchethics
              </Typography>

              <Typography variant="h6" gutterBottom>
                What data do we collect?
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                The data we collect will vary from project to project.  Researchers will only collect data that is essential for their project. The specific categories of research data processed are described in the Participant Information Sheet provided to you with this Privacy Notice.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Who do we share your data with?
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                We aim to not collect personal data and anonymised research data will only be shared in accordance with the attached Participant Information Sheet.
              </Typography>

              <Typography variant="h6" gutterBottom>
                How do we keep your data secure?
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                We take a robust approach to protecting the information with secure electronic and physical storage areas for research data with controlled access. Access to project data is strictly controlled on a need to know basis and data is stored and transmitted securely using methods such as encryption and access controls for physical records where appropriate.

                Alongside these technical measures there are comprehensive and effective policies and processes in place to ensure that those who process you’re the study information (such as researchers, relevant University administrators and/or third-party processors) are aware of their obligations and responsibilities for the data they have access to.

                By default, people are only granted access to the information they require to perform their duties. Mandatory data protection and information security training is provided to staff and expert advice available if needed.
              </Typography>

              <Typography variant="h6" gutterBottom>
                How long do we keep your data for?
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                Your research data will only be retained for as long as is necessary to fulfil the cited purpose of the research. The length of time we keep the data will depend on several factors including the significance of the data, funder requirements, and the nature of the study. Specific details are provided in the attached Participant Information Sheet.

                Anonymised data that falls outside the scope of data protection legislation as it contains no identifying or identifiable information may be stored in UWE Bristol’s research data archive or another carefully selected appropriate data archive.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Your Rights and how to exercise them
              </Typography>
              <Typography variant="body1" paragraph align='justify'>
                Under the Data Protection legislation, you have the following qualified rights:
              </Typography>

              <ul style={{ listStyleType: "decimal" }}>
                <li>
                  The right to access research data held by or on behalf of the University;
                </li>
                <li>
                  The right to rectification if the information is inaccurate or incomplete;
                </li>
                <li>
                  The right to restrict processing and/or erasure of the research data;
                </li>
                <li>
                  The right to data portability;
                </li>
                <li>
                  The right to object to processing;
                </li>
                <li>
                  The right to object to automated decision making and profiling;
                </li>
                <li>
                  The right to complain to the Information Commissioner’s Office (ICO).
                </li>
              </ul>

              <Typography variant="body1" paragraph align='justify'>
                We will always respond to concerns or queries you may have. If you wish to exercise your rights or have any other general data protection queries, please contact UWE Bristol’s Data Protection Officer (dataprotection@uwe.ac.uk).

                If you have any complaints or queries relating to the research in which you are taking part please contact either the research project lead, whose details are in the attached Participant Information Sheet or UWE Bristol’s research governance manager (researchgovernance@uwe.ac.uk.).

                v.2: This template Privacy Notice was last amended in November 2020 and will be subject to regular review/update.
              </Typography>
            </div>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default CookiePolicy;
