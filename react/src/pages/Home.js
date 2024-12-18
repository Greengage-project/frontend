import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { HomeRow } from "components/home";
import { HomeLogo } from "components/Logo";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeBottomRow from "components/home/HomeBottomRow";
import i18n from "translations/i18n";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);
  const [showCookiePopup, setShowCookiePopup] = useState(true);

  useEffect(() => {
    const storedPopupValue = Cookies.get("cookiePreference");

    if (storedPopupValue) {
      setOpen(false);
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAcceptAll = () => {
    console.log("Accepted all cookies");
    Cookies.set("cookiePreference", "accept-all", { expires: 365 });

    setOpen(false);
  };

  const handleAcceptEssential = () => {
    console.log("Accepted only essential cookies");
    Cookies.set("cookiePreference", "accept-essentials", { expires: 365 });

    setOpen(false);
  };

  const links = [
    { path: "/", label: "Project" },
    { path: "/platform", label: "INTERLINK platform" },
    { path: "/copro", label: "Co-production" },
    { path: "/catal", label: "Catalogue" },
    { path: "/about", label: "About" },
  ];

  return (
    <>
      <Helmet>
        <title>GREENGAGE</title>
      </Helmet>
      <div>
        <Fade in>
          <Box
            sx={{
              backgroundColor: "background.paper",
              pt: 6,
              pb: 4,
            }}
          >
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
              <HomeLogo style={{ width: "90%", height: "auto" }} />
              <Typography
                align="center"
                variant="h5"
                sx={{ my: 5 }}
                data-cy="home-1-1"
              >
                {t("home-1-1")}
              </Typography>
              <Button
                color="primary"
                component={RouterLink}
                size="large"
                to="/dashboard"
                variant="contained"
                sx={{ fontSize: "20px" }}
                endIcon={<ChevronRight />}
                data-cy="home-1-2"
              >
                {t("home-1-2")}
              </Button>

              <Snackbar
                open={open}
                onClose={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Alert
                  severity="info"
                  sx={{
                    width: "95vw",

                    border: "1px solid black",
                    typography: {
                      fontWeight: "bold",
                      fontSize: "1.2em",
                    },
                    ".MuiAlert-icon": {
                      fontSize: "2em",
                      alignSelf: "center",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                      This site uses cookies to offer a better browsing
                      experience. More information about{" "}
                      <Link to="/cookie-policy">how we use cookies.</Link>
                    </Grid>
                    <Grid item xs={4} container justifyContent="flex-end">
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleAcceptAll}
                        >
                          Accept all cookies
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleAcceptEssential}
                        >
                          Accept only essential cookies
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Alert>
              </Snackbar>
            </Container>
          </Box>
        </Fade>

        <HomeRow
          light={false}
          graphic={
            <iframe
              data-cy="home-2-0"
              style={{
                minHeight: "300px",
                width: "100%",
              }}
              src="https://www.youtube.com/embed/oCPz7dxN2Hk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          }
          right={
            <div>
              <Typography data-cy="home-2-1" variant="h4">
                {t("home-2-1")}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ my: 3, textAlign: "justify" }}
                variant="subtitle1"
                data-cy="home-2-2"
              >
                {t("home-2-2")}
              </Typography>
            </div>
          }
        />
        <HomeRow
          graphic={
            <img
              style={{ width: "100%", height: "auto" }}
              src="/static/graphics/figure7.png"
              data-cy="home-3-0"
            />
          }
          right={
            <>
              <Typography variant="h3">{t("home-3-1")}</Typography>
              <Typography
                color="textSecondary"
                sx={{ my: 3 }}
                variant="subtitle1"
                data-cy="home-3-2"
              >
                {t("home-3-2")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                <Button
                  onClick={() => navigate("/coprod")}
                  size="large"
                  sx={{ m: 1 }}
                  variant="outlined"
                  data-cy="home-3-3"
                >
                  {t("home-3-3")}
                </Button>
              </Box>
            </>
          }
        />

        <HomeRow
          graphic={
            <img
              style={{ width: "100%", height: "auto" }}
              src="/static/graphics/wordcloud-white.png"
              data-cy="home-4-0"
            />
          }
          light={false}
          right={
            <>
              <Typography variant="h3" data-cy="home-4-1">
                {t("home-4-1")}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ my: 3 }}
                variant="subtitle1"
                data-cy="home-4-2"
              >
                {t("home-4-2-1")}
                <a href="https://interlink-project.eu/">INTERLINK</a>
                {t("home-4-2-2")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                <Button
                  onClick={() => navigate("/catal")}
                  size="large"
                  sx={{ m: 1 }}
                  variant="outlined"
                  data-cy="home-4-3"
                >
                  {t("home-4-3")}
                </Button>
              </Box>
            </>
          }
        />
        <HomeRow
          graphic={
            <img
              style={{ width: "100%", height: "auto" }}
              src="/static/graphics/map2.png"
              data-cy="home-5-0"
            />
          }
          right={
            <>
              <Typography variant="h3" data-cy="home-5-1">
                {t("home-5-1")}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ my: 3 }}
                variant="subtitle1"
                data-cy="home-5-2"
              >
                {t("home-5-2-1")}
                <a href="https://www.greengage-project.eu/">GREENGAGE</a>
                {t("home-5-2-2")}
                <a href="https://demo.greengage-project.eu/platform">
                  GREENGAGE’s Collaborative Environment
                </a>
                {t("home-5-2-3")}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="large"
                  sx={{ m: 1 }}
                  variant="outlined"
                  data-cy="home-5-3"
                >
                  {t("home-5-3")}
                </Button>
              </Box>
            </>
          }
        />

        <HomeBottomRow
          light={false}
          graphic={
            <Box>
              <img
                decoding="async"
                width="150"
                height="99"
                src="https://interlink-project.eu/wp-content/uploads/2021/01/flag_yellow_150x99.jpg"
                className="attachment-large size-large wp-image-165"
                alt="the European flag"
              />

              <p>
                This project has received funding from the European Union’s
                Horizon 2020 research and Innovation programme under Grant
                Agreement 101086530
              </p>
            </Box>
          }
          right={
            <>
              {links.map((link) => (
                <Typography
                  color="textSecondary"
                  sx={{ my: 3 }}
                  variant="subtitle1"
                  data-cy={`home-link-${link.path.slice(1)}`}
                >
                  <Link
                    color={
                      location.pathname === link.path
                        ? "primary"
                        : "textSecondary"
                    }
                    component={RouterLink}
                    to={link.path}
                    underline="none"
                    variant="body1"
                    sx={{
                      color:
                        location.pathname === link.path
                          ? "primary.main"
                          : "grey.600 !important",
                      textDecoration: "none !important",
                      "&:hover": {
                        textDecoration: "underline !important",
                      },
                      transition: "color 0.3s ease",
                    }}
                    data-cy={`landingPage_link_${i18n
                      .t(link.label)
                      .replace(" ", "_")}`}
                  >
                    {i18n.t(link.label)}
                  </Link>
                </Typography>
              ))}

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  m: -1,
                  padding: 2,
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  color="textSecondary"
                  sx={{ my: 3 }}
                  variant="subtitle1"
                >
                  <a
                    href="https://www.greengage-project.eu/cookie-policy/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cookie Policy
                  </a>
                </Typography>

                <Typography
                  color="textSecondary"
                  sx={{ my: 3 }}
                  variant="subtitle1"
                >
                  <a
                    href="https://www.greengage-project.eu/privacy-policy/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </Typography>

                <Typography
                  color="textSecondary"
                  sx={{ my: 3 }}
                  variant="subtitle1"
                >
                  <a
                    href="https://www.greengage-project.eu/terms/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Use
                  </a>
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ my: 3 }}
                  variant="subtitle1"
                />
              </Box>
            </>
          }
        />
      </div>
    </>
  );
};

export default Home;
