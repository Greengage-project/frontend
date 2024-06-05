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
                {t("GREENGAGE PROJECT PRIVACY NOTICE")}
              </Typography>
              <br />

              <Typography variant="body1" paragraph>
                {t("Welcome to ")}
                <Link href="https://greengage-project.eu/" target="_blank">
                  https://greengage-project.eu/
                </Link>
                {t(
                  ', the website of the GREENGAGE project (the “Project”). The website is managed by University of Deusto, ("DEUSTO" or “We”, “us”, “our”) and is hosted by AIT, both partners to the Project. AIT is the processor and we are the controller of the Personal Data processed in relation to the website and we are responsible for compliance with EU Data Protection Law.'
                )}
              </Typography>

              <Typography variant="body1" paragraph>
                {t(
                  'This Privacy Notice describes how we use the Personal Data of visitors of the website, individuals registering to our newsletters and or reaching out to us in relation to the Project ("You", “your”).'
                )}
              </Typography>

              <Typography variant="h6" paragraph>
                {t("1. What Personal Data do We collect about You?")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t(
                  "Depending on who You are and on how You engage with us, We collect Personal Data about You, for different reasons and based upon a specific legal basis."
                )}
              </Typography>

              <ul style={{ listStyleType: "disc" }}>
                <li>
                  <strong>{t("Visitors of the website")}</strong> –{" "}
                  {t(
                    "When You visit our Website, We collect information about You or your device. This includes technical information, such as the Internet protocol (IP) address used to connect your device to the Internet, as well as information about your visit, including the dates and times You use our website, length of visits to certain pages, etc. This information may be considered Personal Data either in itself or when combined with other information about You. We use cookies and other tracking technologies to do so. You can learn more about such technologies by reading the Cookies Notice available on our website."
                  )}
                </li>
                <li>
                  <strong>{t("Newsletter’s subscribers")}</strong> –{" "}
                  {t(
                    "When You sign up to receive our newsletters, We ask your e-mail address. We use this Personal Data to keep You informed about our Project and its related activities. We do so with your consent."
                  )}
                </li>
                <li>
                  <strong>{t("When You reach out to us")}</strong> –{" "}
                  {t(
                    "When You send us an email message, We may process your Personal Data such as your email, name and any Personal Data You include in your message. We process your Personal Data based on our legitimate interest, as We do so to be able to respond to your query and communicate with You. When We process your Personal Data on the basis of legitimate interest, we considered the impact of our activities on your rights and freedoms as a Data Subject, as well as your expectations. You can learn more on our legitimate interest assessment by contacting us at "
                  )}
                  <Link
                    href="mailto:contact@greengage-project.eu"
                    target="_blank"
                  >
                    contact@greengage-project.eu
                  </Link>
                  .
                </li>
              </ul>

              <Typography variant="h6" paragraph>
                {t("2. Do We Change the purpose of the processing?")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t(
                  "We will only use your Personal Data for the purposes for which We collected them, unless We reasonably consider that We need to use them for another reason and this is compatible with the original purpose. If We need to use your Personal Data for an unrelated purpose, We will notify You and We will explain the legal basis that allows us to do so."
                )}
              </Typography>

              <Typography variant="h6" paragraph>
                {t("3. How do we protect your Personal Data?")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t(
                  "Your Personal Data are treated as confidential. We never pass on your contact details to third-parties for commercial purposes. We have put in place appropriate administrative, physical and technical measures. We update and test our security technology on an ongoing basis. We restrict access to your Personal Data to those employees and staff who need to know that information to provide benefits or services to You. In addition, We train our staff about the importance of confidentiality and maintaining the privacy and security of your information. We commit to taking appropriate disciplinary measures to enforce our staff’ privacy responsibilities."
                )}
              </Typography>

              <Typography variant="h6" paragraph>
                {t("4. How long do we store your Personal Data?")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t(
                  "We store your Personal Data until the end of the Project (expected December 31, 2025). We might delete Personal Data before the end of the Project if We achieve the purpose for which We collected them. When We process your Personal Data based on your consent (e.g., when You subscribe to our newsletters), You have the right to withdraw your consent at any time (see section 5 below). In this case, Your Personal Data will be deleted."
                )}
              </Typography>

              <Typography variant="h6" paragraph>
                {t(
                  "5. What rights do You have in connection with your Personal Data?"
                )}
              </Typography>
              <Typography variant="body1" paragraph>
                {t(
                  "Under certain circumstances, under EU Data Protection Law, You have the right to:"
                )}
              </Typography>

              <ul style={{ listStyleType: "disc" }}>
                <li>
                  <strong>{t("Request access")}</strong>{" "}
                  {t(
                    "to your Personal Data. This enables You to receive a copy of the Personal Data We hold about You and to check that We are lawfully Processing it."
                  )}
                </li>
                <li>
                  <strong>{t("Request correction")}</strong>{" "}
                  {t(
                    "of the Personal Data that We hold about You. This enables You to have any incomplete or inaccurate information We hold about You corrected."
                  )}
                </li>
                <li>
                  <strong>{t("Request erasure")}</strong>{" "}
                  {t(
                    "of your Personal Data. This enables You to ask us to delete or remove Personal Data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your Personal Data where You have exercised your right to object to Processing (see below)."
                  )}
                </li>
                <li>
                  <strong>{t("Request the restriction")}</strong>{" "}
                  {t(
                    "of Processing of your Personal Data. This enables You to ask us to suspend the Processing of Personal Data about You, for example if You want us to establish its accuracy or the reason for Processing it."
                  )}
                </li>
                <li>
                  <strong>{t("Request the transfer")}</strong>{" "}
                  {t(
                    "of your Personal Data to another party (right to data portability)."
                  )}
                </li>
              </ul>

              <Typography variant="body1" paragraph>
                {t(
                  "To exercise your rights as Data Subject, make queries or complaints, please contact "
                )}
                <Link href="mailto:greengage.admin@deusto.es" target="_blank">
                  greengage.admin@deusto.es
                </Link>
                .{" "}
                {t(
                  "When You provide your consent to the Processing your Personal Data for a specific purpose, You have the right to withdraw your consent at any time. You can unsubscribe from our newsletter by clicking on the unsubscribe button at the bottom of our emails. When We process your Personal Data based on our legitimate interest You have the right to object to such Processing. To object to the Processing, please contact "
                )}
                <Link href="mailto:greengage.admin@deusto.es" target="_blank">
                  greengage.admin@deusto.es
                </Link>
                .{" "}
                {t(
                  "If You are dissatisfied with any aspect of our handling of your Personal Data, You have the right to make a complaint at any time to the relevant Supervisory Authority."
                )}
              </Typography>

              <Typography variant="h6" paragraph>
                {t("6. How will we update the Privacy Notice?")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t(
                  "We may revise this Privacy Notice from time to time and any revisions will be made available to You via our website."
                )}
              </Typography>

              <Typography variant="h6" paragraph>
                {t("7. How can You contact us?")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t(
                  "If You have any queries concerning the processing of your Personal Data, You may address them by email at "
                )}
                <Link href="mailto:greengage.admin@deusto.es" target="_blank">
                  greengage.admin@deusto.es
                </Link>
                .
              </Typography>

              <Typography variant="h6" paragraph>
                {t("8. Our Details")}
              </Typography>

              <ul>
                <li>
                  <Typography variant="body1">
                    {t("AIT Austrian Institute of Technology")}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">{t("Giefinggasse 4")}</Typography>
                </li>
                <li>
                  <Typography variant="body1">{t("1210 Vienna")}</Typography>
                </li>
                <li>
                  <Typography variant="body1">{t("Austria")}</Typography>
                </li>
              </ul>

              <Typography variant="h6" paragraph>
                {t("9. Glossary")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("In this Notice:")}
              </Typography>

              <ul>
                <li>
                  <Typography variant="body1">
                    <strong>{t("“EU Data Protection Law”")}</strong>{" "}
                    {t(
                      "means the General Data Protection Regulation 2016/679 (“GDPR“) and the national privacy laws, as amended from time to time."
                    )}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>{t("“EU”")}</strong>{" "}
                    {t("refers to “European Union”.")}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>{t("“EEA”")}</strong>{" "}
                    {t(
                      "refers to the “European Economic Area” which consists of all the EU Member States and Iceland, Norway and Liechtenstein."
                    )}
                  </Typography>
                </li>
              </ul>
            </div>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
