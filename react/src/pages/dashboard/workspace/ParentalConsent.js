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

const ParentalConsent = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>{t("Parental Consent")}</title>
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
        <br/>
        <br/>

          <div>
            <Typography variant="h4" gutterBottom>
              GREENGAGE PROJECT PARENTAL CONSENT
            </Typography>
            <br/>

            <Typography variant="body1" paragraph>
            I, undersigned _______________[name].[date and place of birth] _______________ [natural person; legal entity] _______________ [contact details]  
            </Typography>

            <Typography variant="body1" paragraph>
            Dear Parent or Guardian: 
            In order for your child to participate as a volunteer in GREENGAGE project, we need your consent and involvement in helping your child have a productive and safe experience. Please carefully read and sign this parental consent form. If you have any questions or would like further information, please contact AIT (AUSTRIAN INSTITUTE OF TECHNOLOGY GMBH) at <Link href="mailto:contact@greengage-project.eu">contact@greengage-project.eu</Link>.
            </Typography>

            <ul style={{ listStyleType: "disc" }}>
            <li>Name of child:</li> 
            <li>Birth Date:</li> 
            <li>Address:</li> 
            <li>City/State:</li> 
            <li>Zip Code:</li> 
            <li>School:</li> 
            <li>Grade:</li> 
            <li>Student’s Telephone No.:</li> 
            <li>Supervisor’s Name:</li>     
            <li>Supervisor’s Telephone No.:</li>              
            <li>Supervisor’s Address:</li> 
            </ul>
            

            <Typography variant="h6" paragraph>
              2. Do We Change the purpose of the processing?
            </Typography>
            
            <Typography variant="body1" paragraph>
            In connection with and consideration of my child's (named above) participation in GREENGAGE project and related activities, I, on behalf of my child and myself, hereby represent and agree as follows: 
            </Typography>

            <ul style={{ listStyleType: "disc" }}>
            <li>I understand that my child will be a participant in GREENGAGE project and related activities, and I hereby give permission for him/her to serve in that capacity. </li> 
            <li>I understand that my child will be provided with the orientation and training necessary, and as needed, for the safe and responsible performance of the duties assigned. </li> 
            <li>I understand that my child has been informed that GREENGAGE project is a research project currently run under the Horizon Europe Framework Programme under the grant agreement no. 101086530. The co-ordinator of the project is AIT (AUSTRIAN INSTITUTE OF TECHNOLOGY GMBH). The coordinator of the project may be contacted at <Link href="mailto:contact@greengage-project.eu">contact@greengage-project.eu</Link>. The coordinator of this study may be contacted with regard to any question about my child’s participation at [contact details].  </li> 
            <li>Should my child require emergency medical treatment, first aid, or transportation to a hospital or medical facility as a result of illness or injury associated with my child's participation in GREENGAGE project or related activities, I consent to any such treatment, first aid and/or transportation that may be provided to my child, and understand that the GREENGAGE partners will not be responsible for any costs associated with any of the foregoing.</li> 
            <li>I understand that as a participant in GREENGAGE project and related activities, my child may participate in physical activity. I represent and warrant that my child is in good physical condition, and has no physical, health related or other problems which would preclude or restrict his/her participation in this program or related activities or otherwise render his/her participation dangerous or harmful to him/her or others, and that he/she is allowed to participate in physical activity. </li> 
            <li>I authorize the GREENGAGE consortium to publish or release to the media any pictures of my child during his/her time as a participant in GREENGAGE program for promotional or recognition purposes only.</li> 
            <ul style={{ listStyleType: "checkbox" }}>
              <li>□ Please check box if you do NOT consent to this statement. This box, if left unchecked, means that you do consent to any publications or media release. Note: The statement regarding the publishing or releasing to the media your child’s photograph does not hinder the process of your child from becoming a participant in GREENGAGE project. </li>
            </ul>
            <li>I have been informed about the purposes of the project and I have fully understood what my child’s participation to the study entails from his/her side [tasks].</li> 
            <li>I had enough time to think and I have been able to ask all the questions that have come to mind and I have received a clear answer to those questions.</li> 
            <li>I have fully understood that my child’s participation is entirely voluntary and that he/she can withdraw at any time without any detriment consequences. </li>     
            <li>I understand my child will not be paid for his/her participation. </li>              
            <li>I understand the risks that my child’s participation to this research may carry. </li> 
            <li>I understand the benefits that my child’s participation to this research entails. </li>
            
            </ul>

            <Typography variant="body1" paragraph>
            I hereby give my consent to take part in the research carried out by [the GREENGAGE Consortium/specific partner] 
            </Typography>

            <Typography variant="body1" paragraph>
            Signed at: ___________________________ on: ___________________________ [date] <br />
            Full name: ___________________________ Signature: ___________________________
            </Typography>

            

          </div>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ParentalConsent;
