import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { HomeLogo } from "components/Logo";
import { Box, Container, Typography, Link, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

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
          <Paper elevation={3} style={{ padding: "20px" }}>
            <HomeLogo style={{ width: "30%", height: "auto" }} />
            <br />
            <br />

            <div>
              <Typography variant="h4" gutterBottom>
                {t("Privacy Notice for Research Participants")}
              </Typography>
              <br />

              <Typography variant="h6" gutterBottom>
                {t("Purpose of the Privacy Notice")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "This privacy notice explains how the University of the West of England, Bristol (UWE Bristol) collects, manages and uses your personal data before, during and after you participate in GREENGAGE – Engaging Citizens – Mobilizing Technology – Delivering Green Deal. ‘Personal data’ means any information relating to an identified or identifiable natural person (the data subject)."
                )}
                <br />
                {t(
                  "This privacy notice adheres to the General Data Protection Regulation (GDPR) principle of transparency. This means it gives information about:"
                )}
              </Typography>

              <ul style={{ listStyleType: "disc" }}>
                <li>
                  {t("How and why your data will be used for the research;")}
                </li>
                <li>{t("What your rights are under GDPR; and")}</li>
                <li>
                  {t(
                    "How to contact UWE Bristol and the project lead in relation to questions, concerns or exercising your rights regarding the use of your personal data."
                  )}
                </li>
              </ul>

              <Typography variant="body1" paragraph align="justify">
                {t(
                  "This Privacy Notice should be read in conjunction with the Participant Information Sheet and Ethical Consent Form provided to you before you agree to take part in the research."
                )}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {t("Why are we processing your personal data?")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "UWE Bristol and its research partners undertake research under its public function to provide research for the benefit of society. As a data controller we are committed to protecting the privacy and security of your personal data in accordance with the (EU) 2016/679 the General Data Protection Regulation (GDPR), the Data Protection Act 2018 (or any successor legislation) and any other legislation directly relating to privacy laws that apply (together “the Data Protection Legislation”). General information on Data Protection law is available from the Information Commissioner’s Office ("
                )}
                <Link href="https://ico.org.uk/" target="_blank">
                  https://ico.org.uk/
                </Link>
                {t(").")}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {t("How do we use your personal data?")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "We will only process your personal data when the law allows us to. In addition, we will always comply with UWE Bristol’s policies and procedures in processing your personal data. Our lawful basis for using your personal data for research purposes is fulfilling tasks in the public interest, and for archiving purposes in the public interest, for scientific or historical research purposes."
                )}
                <br />
                {t(
                  "We will always tell you about the information we wish to collect from you and how we will use it. We will not use your personal data for automated decision making about you or for profiling purposes."
                )}
                <br />
                {t(
                  "Our research is governed by robust policies and procedures and, where human participants are involved, is subject to ethical approval from either UWE Bristol’s Faculty or University Research Ethics Committees. This pilot study has been reviewed and approved by the Faculty of Engineering and Technology of the University of West of England and the University’s Research Ethics Committee. Any comments, questions, or complaints about the ethical conduct of this study can be addressed to the Research Ethics Committee at the University of the West of England at:"
                )}
                <Link href="mailto:researchethics@uwe.ac.uk" target="_blank">
                  researchethics@uwe.ac.uk
                </Link>
                {t(".")}
                <br />
                {t(
                  "The research team adhere to the principles of the General Data Protection Regulation (GDPR)."
                )}
                <br />
                {t(
                  "For more information about UWE Bristol’s research ethics approval process please see our Research Ethics webpages at"
                )}{" "}
                <Link
                  href="https://www1.uwe.ac.uk/research/researchethics"
                  target="_blank"
                >
                  www1.uwe.ac.uk/research/researchethics
                </Link>
                {t(".")}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {t("What data do we collect?")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "The data we collect will vary from project to project. Researchers will only collect data that is essential for their project. The specific categories of research data processed are described in the Participant Information Sheet provided to you with this Privacy Notice."
                )}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {t("Who do we share your data with?")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "We aim to not collect personal data and anonymised research data will only be shared in accordance with the attached Participant Information Sheet."
                )}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {t("How do we keep your data secure?")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "We take a robust approach to protecting the information with secure electronic and physical storage areas for research data with controlled access. Access to project data is strictly controlled on a need to know basis and data is stored and transmitted securely using methods such as encryption and access controls for physical records where appropriate."
                )}
                <br />
                {t(
                  "Alongside these technical measures there are comprehensive and effective policies and processes in place to ensure that those who process you’re the study information (such as researchers, relevant University administrators and/or third-party processors) are aware of their obligations and responsibilities for the data they have access to."
                )}
                <br />
                {t(
                  "By default, people are only granted access to the information they require to perform their duties. Mandatory data protection and information security training is provided to staff and expert advice available if needed."
                )}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {t("How long do we keep your data for?")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "Your research data will only be retained for as long as is necessary to fulfil the cited purpose of the research. The length of time we keep the data will depend on several factors including the significance of the data, funder requirements, and the nature of the study. Specific details are provided in the attached Participant Information Sheet."
                )}
                <br />
                {t(
                  "Anonymised data that falls outside the scope of data protection legislation as it contains no identifying or identifiable information may be stored in UWE Bristol’s research data archive or another carefully selected appropriate data archive."
                )}
              </Typography>

              <Typography variant="h6" gutterBottom>
                {t("Your Rights and how to exercise them")}
              </Typography>
              <Typography variant="body1" paragraph align="justify">
                {t(
                  "Under the Data Protection legislation, you have the following qualified rights:"
                )}
              </Typography>

              <ul style={{ listStyleType: "decimal" }}>
                <li>
                  {t(
                    "The right to access research data held by or on behalf of the University;"
                  )}
                </li>
                <li>
                  {t(
                    "The right to rectification if the information is inaccurate or incomplete;"
                  )}
                </li>
                <li>
                  {t(
                    "The right to restrict processing and/or erasure of the research data;"
                  )}
                </li>
                <li>{t("The right to data portability;")}</li>
                <li>{t("The right to object to processing;")}</li>
                <li>
                  {t(
                    "The right to object to automated decision making and profiling;"
                  )}
                </li>
                <li>
                  {t(
                    "The right to complain to the Information Commissioner’s Office (ICO)."
                  )}
                </li>
              </ul>

              <Typography variant="body1" paragraph align="justify">
                {t(
                  "We will always respond to concerns or queries you may have. If you wish to exercise your rights or have any other general data protection queries, please contact UWE Bristol’s Data Protection Officer ("
                )}
                <Link href="mailto:dataprotection@uwe.ac.uk" target="_blank">
                  dataprotection@uwe.ac.uk
                </Link>
                {t(").")}
                <br />
                {t(
                  "If you have any complaints or queries relating to the research in which you are taking part please contact either the research project lead, whose details are in the attached Participant Information Sheet or UWE Bristol’s research governance manager ("
                )}
                <Link
                  href="mailto:researchgovernance@uwe.ac.uk"
                  target="_blank"
                >
                  researchgovernance@uwe.ac.uk
                </Link>
                {t(").")}
                <br />
                {t(
                  "v.2: This template Privacy Notice was last amended in June 2024 and will be subject to regular review/update."
                )}
              </Typography>
            </div>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
