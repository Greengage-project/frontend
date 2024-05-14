import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import i18n from "translations/i18n";
import FormattedText from "../utils/formatText";
import { useNavigate } from "react-router";

const sameHeightCards = {
  minHeight: "200px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const pilots = [
  {
    name: i18n.t("Bristol"),
    image: "/static/about/Bristol_by_Martyna-Bober-small.png",
  },
  {
    name: i18n.t("Copenhagen"),
    image: "/static/about/Gerace.png",
  },
  {
    name: i18n.t("North-Brabant"),
    image:
      "/static/about/Eindhoven_North_Brabant_by_Rutger-Heijmerikx-small.png",
  },
  {
    name: i18n.t("Turano"),
    image: "/static/about/Turano.png",
  },
  {
    name: i18n.t("Gerace"),
    image: "/static/about/Gerace.png",
  },
];
// images extrated from https://www.greengage-project.eu/citizen-observatories/

const GridPilot = ({}) => {
  const { t } = useTranslation();
  <Grid container spacing={3} sx={{ pb: 4 }}>
    {pilots.map((pilot) => (
      <Grid key={pilot.name} item md={4} xs={12}>
        <Card style={sameHeightCards}>
          <CardMedia component="img" height="400" image={pilot.image} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-center"
            >
              {pilot.name}
            </Typography>
            {pilot?.description && (
              <Typography variant="body2" color="text.secondary">
                {pilot.description}
              </Typography>
            )}
          </CardContent>
          {pilot?.link && (
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="small"
                onClick={() => window.open(pilot.link, "_blank")}
              >
                {t("home-about-download-brochure")}
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    ))}
  </Grid>;
};

const HomeAbout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title data-cy="Interlink-title">Interlink</title>
      </Helmet>
      <div>
        <Container maxWidth="lg" sx={{ my: 2 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={3}
            sx={{ my: 4 }}
          >
            <Grid item md={8}>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", mb: 3 }}
                data-cy="home-about-1"
              >
                {t("home-about-1")}
              </Typography>

              <Typography variant="body1">
                <FormattedText text={t("home-about-1-1")} />
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }}>
                <FormattedText text={t("home-about-1-2")} />
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <FormattedText text={t("home-about-1-3")} />
              </Typography>
            </Grid>
            <Grid item md={4}>
              <img
                style={{ width: "100%", height: "auto" }}
                src="/static/graphics/logo-visual.png"
              />
            </Grid>
          </Grid>
        </Container>

        <Divider />
        <Box
          sx={{
            bgcolor: "primary.main",
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography align="center" color="primary.contrastText" variant="h3">
            {t("home-about-2")}
          </Typography>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="body1" sx={{ mb: 3 }} data-cy="home-about-2-1">
            <FormattedText text={t("home-about-2-1")} />
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }} data-cy="home-about-2-1">
            <FormattedText text={t("home-about-2-2")} />
          </Typography>

          {/* GridPilot() */}
          <Container
            maxWidth="md"
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              px: {
                md: "130px !important",
              },
              py: 5,
            }}
          >
            <Button
              onClick={() =>
                window.open("https://www.greengage-project.eu/", "_blank")
              }
              size="large"
              sx={{ fontSize: "1.5rem", mt: 3, mb: 3 }}
              variant="outlined"
            >
              {t("button-find-out-more-about-greengage")}
            </Button>
          </Container>
        </Container>
      </div>
    </>
  );
};

export default HomeAbout;
