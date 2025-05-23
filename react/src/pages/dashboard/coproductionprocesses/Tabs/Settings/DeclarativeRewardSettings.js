import { Grid, Typography, Box, Link, Radio, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import {
  SentimentSatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
} from "../../../../../icons";
import "./RewardSettings.css";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const DeclarativeRewardSettings = (props) => {
  const { onClose, activateReward, handleGoBack } = props;
  const [leaderboard, setLeaderboard] = useState(true);

  const leftColumn = useRef(null);
  const rightColumn = useRef(null);
  const imageRef = useRef(null);

  const { t } = useTranslation();
  return (
    <>
      {handleGoBack && (
        <Link
          href="javascript:void(0);"
          variant="h6"
          color="textSecondary"
          onClick={handleGoBack}
          sx={{ mb: "1rem", cursor: "pointer" }}
          role="button"
        >
          {t("Go back")}
        </Link>
      )}
      <Box
        alt="Medals"
        component="img"
        src="/static/reward/Medals.svg"
        className="medals-image-pc imageContainer"
        ref={imageRef}
      />

      <Grid container className="col-reward-setting">
        <Grid item sm={12} md={6} className="col-reward-left" ref={leftColumn}>
          <Grid container md={12}>
            <Typography
              variant="h1"
              style={{ fontWeight: 700, color: "black" }}
            >
              {t("Reward System")}
            </Typography>
            <Typography sx={{ my: "2rem" }} style={{ fontWeight: 600 }}>
              {t(
                "The reward system permits to reward your contributors, but how?"
              )}
            </Typography>
          </Grid>
          <Grid container md={12} className="mb-2">
            <Grid item md={1} className="reward-left-number">
              <Typography variant="h1" sx={{ mt: 0, mr: 1 }}>
                1.
              </Typography>
            </Grid>
            <Grid item md={11} sx={{ mt: 0 }}>
              <Grid container md={12} className="row-reward-left">
                <Typography variant="body1">
                  {t(
                    "You will able to set the difficulty of every task on three levels"
                  )}
                  :
                  <Box className="box-reward">
                    <li>
                      <Typography variant="body1">•{t("Easy")}</Typography>
                      <SentimentSatisfied />
                    </li>
                    <li>
                      <Typography variant="body1">•{t("Medium")}</Typography>
                      <SentimentNeutral />
                    </li>
                    <li>
                      <Typography variant="body1">•{t("Hard")}</Typography>
                      <SentimentDissatisfied />
                    </li>
                  </Box>
                </Typography>
              </Grid>
            </Grid>

            <Box
              alt="Reward image 1"
              component="img"
              src="/static/reward/Reward_image_1.svg"
              sx={{
                height: "auto",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            />
          </Grid>
          <Grid container md={12} className="mb-2">
            <Grid item md={1} className="reward-left-number">
              <Typography variant="h1" sx={{ mt: 0 }}>
                2.
              </Typography>
            </Grid>
            <Grid item md={11} sx={{ mt: 0 }}>
              <Typography variant="body1" className="reward-left-text">
                {t(
                  "Every time someone adds a resource to the task, she will be able to claim her contribution"
                )}
              </Typography>
              <Box
                className="mt-1"
                alt="Reward image 2"
                component="img"
                src="/static/reward/Reward_image_2.svg"
                sx={{
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
          <Grid container md={12}>
            <Grid item md={1} className="reward-left-number">
              <Typography variant="h1" sx={{ mt: 0 }}>
                3.
              </Typography>
            </Grid>
            <Grid item md={11} sx={{ mt: 0 }}>
              <Typography variant="body1" className="reward-left-text">
                {`${t(
                  "Once finished a task you will have to set the contribution of every collaborator assigning a level of contribution based on four levels"
                )}:`}
              </Typography>
              <Box className="box-reward">
                <li>
                  <Typography variant="body1">
                    •{" "}
                    <span style={{ color: "#F44336" }}>
                      {t("No contribution")}
                    </span>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    •{" "}
                    <span style={{ color: "#FF7A00" }}>
                      {t("Low contribution")}
                    </span>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    •{" "}
                    <span style={{ color: "#FFE607" }}>
                      {t("Medium contribution")}
                    </span>
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    •{" "}
                    <span style={{ color: "#44C949" }}>
                      {t("High contribution")}
                    </span>
                  </Typography>
                </li>
              </Box>

              <Box
                className="mt-1 mb-1"
                alt="Reward image 3"
                component="img"
                src="/static/reward/Reward_image_3.svg"
                sx={{
                  height: "auto",
                  maxWidth: "100%",
                }}
              />
            </Grid>
          </Grid>
          <Grid container md={12}>
            <Grid item md={1} className="reward-left-number">
              <Typography variant="h1" sx={{ mt: 0 }}>
                4.
              </Typography>
            </Grid>
            <Grid item md={11} sx={{ mt: 0 }}>
              <Typography variant="body1" className="reward-left-text">
                {t(
                  "Now you have two ways, you can active the Leaderboard or not. This function permit to the users to see (in addition to his profile) the points of other collaborators. Obviously, activating this function, you have to bear in mind that could incentivize the competition between users"
                )}
                .
                <strong>
                  {` ${t(
                    "Remember that in any case the admins will see the Leaderboard"
                  )}`}
                  .
                </strong>
                <p>
                  <Radio
                    checked={leaderboard}
                    onChange={(e) => setLeaderboard(!leaderboard)}
                    value="noleaderboard"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  {t("Leaderboard + profile")}
                </p>
                <p>
                  <Radio
                    checked={!leaderboard}
                    onChange={(e) => setLeaderboard(!leaderboard)}
                    value="noleaderboard"
                    name="radio-buttons"
                  />
                  {t("No Leaderboard, only personal profile")}
                </p>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} className="col-reward-right" ref={rightColumn}>
          <Box
            alt="Medals"
            component="img"
            src="/static/reward/Medals.svg"
            className="medals-image imageContainer"
            ref={imageRef}
          />
        </Grid>
      </Grid>
      <Grid container className="footer">
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
            sx={{ minWidth: "200px", mr: 2 }}
            variant="outlined"
            onClick={() => {
              activateReward(leaderboard);
              onClose();
            }}
          >
            {t("Activate this function")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

DeclarativeRewardSettings.propTypes = {
  onClose: PropTypes.func,
  activateReward: PropTypes.func,
  handleGoBack: PropTypes.func,
  coproductionProcessId: PropTypes.string,
};

DeclarativeRewardSettings.defaultProps = {
  onClose: () => {},
  activateReward: () => {},
  handleGoBack: () => {},
  coproductionProcessId: "",
};

export default DeclarativeRewardSettings;
