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
import { newGamesApi } from "__api__";
import { useSelector } from "react-redux";
const BehavioralRewardSettings = (props) => {
  const { handleGoBack, onClose, coproductionProcessId } = props;
  console.log("----------------------------------");
  console.log(coproductionProcessId);
  const { process, hasSchema, tree } = useSelector((state) => state.process);
  console.log({ process, hasSchema, tree });
  const { t } = useTranslation();

  const prepareGameTemplate = (tree) => {
    const taskList = [];
    for (const phase of tree) {
      for (const objective of phase.children) {
        for (const task of objective.children) {
          if (task.type === "task" && task.is_disabled === false) {
            taskList.push({
              id: task.id,
              management: task.management,
              development: task.development,
              exploitation: task.exploitation,
            });
          }
        }
      }
    }
    return taskList;
  };

  console.log("1*!*!");
  console.log("1*!*!2");
  console.log("1*!*!");
  console.log("1*!*!2");
  console.log("1*!*!");
  console.log("1*!*!2");

  const taskList = prepareGameTemplate(tree);
  console.log(taskList);
  const handleActivate = () => {
    newGamesApi
      .setGame(coproductionProcessId, {
        coproductionProcessId,
        taskList,
      })
      .then((res) => {
        console.log(res);
      });
  };

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
              {t("Dynamic Reward System").toUpperCase()}
            </Typography>

            <Typography
              color="textSecondary"
              variant="h6"
              sx={{ m: 1, textAlign: "center" }}
            >
              {t(
                "A strategy for calculating rewards based on user activity and time spent on tasks."
              )}
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
                {t("Legend")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {t("m: Minutes | DP: Default Points | BP: Bonus Points")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {t(
                  "PBP: Personal Bonus Points | DPTE: Default Points Time Elapsed"
                )}
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
                {t("Calculation")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {t("DP: Defined in the strategy")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {t("DPTE = DP × m")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {t("BP = DPTE + (DPTE / 2)")}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {t("PBP = DPTE + (DPTE / 4)")}
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
              {t("Case 1.1: Default Points")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {t(
                "If the last points were rewarded less than 1 minute ago, award default points"
              )}
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
              {t("Case 1.2: Half Default Points")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {t(
                "If the last points were rewarded less than 1 minute ago, award half of the default points"
              )}
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
              {t("Case 2: Double Default Points")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {t(
                "If the user has no prior record for this task, award double default points"
              )}
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
              {t("Case 3: Bonus Points")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {t(
                "If the user's time spent is greater than the global average, award bonus points"
              )}
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
              {t("Case 4.1: Personal Bonus Points")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {t(
                "If the user's time spent is greater than their personal average, award personal bonus points"
              )}
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
              {t("Case 4.2: Default Points Time Elapsed")}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              {t("Award default points based on the time elapsed (DPTE)")}
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
              handleActivate();
              onClose();
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
  coproductionProcessId: PropTypes.string,
};

BehavioralRewardSettings.defaultProps = {
  handleGoBack: undefined,
  coproductionProcessId: "",
};

export default BehavioralRewardSettings;
