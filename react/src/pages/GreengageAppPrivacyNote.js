import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import FormattedText from "../utils/formatText";

const GreengageAppPrivacyNote = () => {
  const { t } = useTranslation();
  /*
Sushi Dev GmbH, Wiedner Gürtel 28/6, 1040 Vienna, Austria (manuel.pirker-ihl@sushi.dev)
DEUSTO, Avda. Universidades, 24, Deusto, 48007 Bilbao, Bizkaia. (dpo@deusto.es)
VRVis Zentrum für Virtual Reality und Visualisierung Forschungs-GmbH, Donau-City-Straße 11,
1220 Vienna, Austria (wolosiuk@vrvis.at)
*/
  return (
    <>
      <Helmet>
        <title data-cy="Legal-Note-title">Legal Note</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Typography variant="h3" sx={{ textAlign: "center", mb: 3 }}>
          {t("Privacy Note")}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {t(
                    "Why do we need your personal data (purpose of and legal basis for processing your data)"
                  )}
                </Typography>
                <Typography variant="body1">
                  <FormattedText
                    text={t("Subject to your voluntary consent,")}
                  />
                  <ul>
                    <li>
                      {t(
                        "Sushi Dev GmbH, Wiedner Gürtel 28/6, 1040 Vienna, Austria ("
                      )}
                      <a href="mailto:manuel.pirker-ihl@sushi.dev">
                        manuel.pirker-ihl@sushi.dev
                      </a>
                      {")"}
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => window.open("/path/to/download", "_blank")}
          >
            {t("Download Consent Form")}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default GreengageAppPrivacyNote;
