import {
  Grid,
  Typography,
  Box,
  Container,
  Divider,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import "./RewardSettings.css";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import DeclarativeRewardSettings from "./DeclarativeRewardSettings";
import BehavioralRewardSettings from "./BehavioralRewardSettings";

const RewardSettings = (props) => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const { t } = useTranslation();

  if (selectedStrategy === "declarative") {
    return (
      <DeclarativeRewardSettings
        {...props}
        handleGoBack={() => setSelectedStrategy(null)}
      />
    );
  }
  if (selectedStrategy === "behavioral") {
    return (
      <BehavioralRewardSettings
        {...props}
        handleGoBack={() => setSelectedStrategy(null)}
      />
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          spacing={3}
          item
          xs={12}
        >
          <Grid
            item
            sx={{
              margin: "0 auto",
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
              data-cy="gamification-catalogue"
              sx={{
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              {t("Reward system catalog").toUpperCase()}
            </Typography>

            <Typography color="textSecondary" variant="h6" sx={{ m: 1 }}>
              {`${t(
                "Here is a complete list of gamification systems and strategies for use in co-production processes"
              )}.`}
            </Typography>
          </Grid>
          <Grid item />
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ mt: 3, border: "2px solid #E0E0E0", borderRadius: "5px" }}>
            <Typography
              variant="h5"
              sx={{
                margin: "0 auto",
                textAlign: "center",
                mt: 2,
              }}
            >
              {t("Declarative")}
            </Typography>
            <Box
              alt="Medals"
              component="img"
              src="/static/reward/Medals.svg"
              sx={{
                width: "50%",
                margin: "0 auto",
                display: "block",

                textAlign: "center",
              }}
            />
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                margin: "0 auto",
                textAlign: "center",
                mt: 2,
                mx: 1,
              }}
            >
              {t(
                "Reward system based on the declaration of user contributions"
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                margin: "0 auto",
                display: "block",
                mt: 2,
                mb: 4,
              }}
              onClick={() => setSelectedStrategy("declarative")}
            >
              {t("View")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ mt: 3, border: "2px solid #E0E0E0", borderRadius: "5px" }}>
            <Typography
              variant="h5"
              sx={{
                margin: "0 auto",
                textAlign: "center",
                mt: 2,
              }}
            >
              {t("Behavioral")}
            </Typography>
            <Box
              alt="Medals"
              component="img"
              src="/static/reward/behavioral_strategy.svg"
              sx={{
                width: "70%",
                margin: "0 auto",
                display: "block",
                mt: 4,
                mb: 4,
                textAlign: "center",
              }}
            />
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                margin: "0 auto",
                textAlign: "center",
                mt: 2,
                mx: 1,
              }}
            >
              {t(
                "Rewards system based on user behavior, where points are awarded based on time spent"
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                margin: "0 auto",
                display: "block",
                mt: 2,
                mb: 4,
              }}
              onClick={() => setSelectedStrategy("behavioral")}
            >
              {t("View")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

RewardSettings.propTypes = {
  onClose: PropTypes.func,
  activateReward: PropTypes.func,
  coproductionProcessId: PropTypes.string,
};

RewardSettings.defaultProps = {
  onClose: () => {},
  activateReward: () => {},
  coproductionProcessId: "",
};

export default RewardSettings;
