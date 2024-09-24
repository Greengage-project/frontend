import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Link,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "./RewardSettings.css";

const BehavioralRewardSettings = (props) => {
  const { handleGoBack, onClose } = props;
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      {handleGoBack && (
        <Link
          href="#"
          variant="h6"
          color="textSecondary"
          onClick={handleGoBack}
          role="button"
          sx={{ display: "block", mb: 2 }}
        >
          {t("Go back")}
        </Link>
      )}
      <Grid container spacing={3}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          item
          xs={12}
        >
          <Grid item sx={{ margin: "0 auto" }}>
            <Typography
              color="textPrimary"
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              {"Dynamic Reward System".toUpperCase()}
            </Typography>

            <Typography
              color="textSecondary"
              variant="h6"
              sx={{ m: 1, textAlign: "center" }}
            >
              {
                "A strategy for calculating rewards based on user activity and time spent on tasks."
              }
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box
        alt="Medals"
        component="img"
        src={`/static/reward/behavioral_strategy.svg`}
        sx={{
          width: "100%",
          margin: "0 auto",
          display: "block",
          mt: 4,
          mb: 4,
          textAlign: "center",
        }}
      />
      <Divider />

      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          spacing={3}
          sx={{ mt: 2, p: 3, display: "flex", flexDirection: "column" }}
        >
          <Grid item xs={12} sx={{ flex: 1 }}>
            <Box
              sx={{
                border: "2px solid #E0E0E0",
                borderRadius: "5px",
                padding: 2,
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                {"Legend"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {"m: Minutes | DP: Default Points | BP: Bonus Points"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {
                  "PBP: Personal Bonus Points | DPTE: Default Points Time Elapsed"
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          spacing={3}
          sx={{ mt: 2, p: 3, display: "flex", flexDirection: "column" }}
        >
          <Grid item xs={12} sx={{ flex: 1 }}>
            <Box
              sx={{
                border: "2px solid #E0E0E0",
                borderRadius: "5px",
                padding: 2,
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                {"Calculation"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {"DP: Defined in the strategy"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {"DPTE = DP × m"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {"BP = DPTE + (DPTE / 2)"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {"PBP = DPTE + (DPTE / 4)"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        className="col-reward-setting"
        sx={{
          pb: {
            xs: 16,
            lg: 10,
          },
        }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              border: "2px solid #E0E0E0",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              {"Case 1.1: Default Points"}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {
                "If the last points were rewarded less than 1 minute ago, award default points."
              }
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              border: "2px solid #E0E0E0",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              {"Case 1.2: Half Default Points"}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {
                "If the last points were rewarded less than 1 minute ago, award half of the default points."
              }
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              border: "2px solid #E0E0E0",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              {"Case 2: Double Default Points"}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {
                "If the user has no prior record for this task, award double default points."
              }
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              border: "2px solid #E0E0E0",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              {"Case 3: Bonus Points"}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {
                "If the user's time spent is greater than the global average, award bonus points."
              }
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              border: "2px solid #E0E0E0",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              {"Case 4.1: Personal Bonus Points"}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {
                "If the user's time spent is greater than their personal average, award personal bonus points."
              }
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              border: "2px solid #E0E0E0",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              {"Case 4.2: Default Points Time Elapsed"}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {"Award default points based on the time elapsed (DPTE)."}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        className="footer-behavioral"
        sx={{
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Grid item md={8} sm={12}>
          <Typography
            variant="body1"
            className="footer-instruction"
            style={{
              color: "black",
            }}
          >
            {t(
              "If you change your mind during the process, you can disable this function in the settings"
            )}
          </Typography>
        </Grid>
        <Grid item md={2} sm={12} className="skip-reward">
          <Link
            href="#"
            variant="body2"
            color="textSecondary"
            onClick={() => {
              onClose();
            }}
          >
            {t("I want to skip that part")}
          </Link>
        </Grid>
        <Grid item md={2} sm={12} className="skip-reward">
          <Button
            sx={{
              minWidth: {
                xs: "140px",
                lg: "190px",
              },
              mr: 2,
            }}
            variant="outlined"
            onClick={() => {
              //
            }}
          >
            {t("Activate this function")}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

BehavioralRewardSettings.propTypes = {
  handleGoBack: PropTypes.func,
};

BehavioralRewardSettings.defaultProps = {
  handleGoBack: undefined,
};

export default BehavioralRewardSettings;
