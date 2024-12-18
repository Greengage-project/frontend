import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { newGamesApi, oldgamesApi, usersApi } from "__api__";
import { Box, Tab, Tabs, Grid, Typography } from "@mui/material";
import { useCustomTranslation } from "hooks/useDependantTranslation";
import OverallLeaderboard from "components/dashboard/coproductionprocesses/OverallLeaderboard";
import useAuth from "hooks/useAuth";
import PersonalLeaderboard from "components/dashboard/coproductionprocesses/gamification/PersonalLeaderboard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const LeaderboardTab = ({}) => {
  const { process } = useSelector((state) => state.process);
  const t = useCustomTranslation(process.language);
  const [value, setValue] = useState(0);
  const [game, setGame] = useState({});
  const [users, setUsers] = useState([]);
  const [place, setPlace] = useState(0);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const handleLeaderboard = async (game) => {
    const us = [];
    for (const player of game.content) {
      const user = await usersApi.get(player.playerId);
      if (player.score > 0) {
        us.push({
          id: player.playerId,
          name: user.full_name,
          score: player.score,
        });
      }
    }
    setUsers(us);
    setPlace(us.findIndex((user) => user.id === auth.user.id) + 1);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    setLoading(true);

    if (process?.game_gamification_engine === "old_gamification") {
      oldgamesApi.getLeaderboard(process.id).then((res) => {
        handleLeaderboard(res);
      });

      const res = await oldgamesApi.getGame(process.id);
      setGame(res[0]);
      setLoading(false);
    } else {
      newGamesApi.getLeaderboard(process.id).then((res) => {
        console.log(">>>>>>>>>>>>>>>>>>>>< res");
        console.log(">>>>>>>>>>>>>>>>>>>>1 res");
        console.log(">>>>>>>>>>>>>>>>>>>>< res");
        console.log(">>>>>>>>>>>>>>>>>>>>2 res");
        console.log(res);
        setGame(res);
        setLoading(false);
      });
    }
  }, []);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Grid container>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              disabled={loading}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              sx={{
                "& .Mui-selected": {
                  background: "#a4cbd8",
                  color: "black",
                },
                "& .MuiTabs-flexContainer": {
                  "justify-content": "center",
                },
              }}
            >
              <Tab
                label={process.leaderboard ? t("Leaderboard") : t("My Profile")}
              />
              {process.leaderboard ? (
                <Tab disabled={loading} label={t("My Profile")} />
              ) : (
                <></>
              )}
            </Tabs>
          </Box>

          {process.leaderboard ? (
            <>
              <TabPanel value={value} index={0}>
                <OverallLeaderboard users={users} loading={loading} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PersonalLeaderboard
                  user={auth.user}
                  game={game}
                  place={place}
                  loading={loading}
                />
              </TabPanel>
            </>
          ) : (
            <>
              <TabPanel value={value} index={0}>
                <PersonalLeaderboard
                  user={auth.user}
                  game={game}
                  place={place}
                  loading={loading}
                />
              </TabPanel>
            </>
          )}

          {/* <TabPanel value={value} index={0}
                        disabled={!leaderboard}>
                        <OverallLeaderboard
                            users={users}
                            loading={loading} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PersonalLeaderboard
                            user={auth.user}
                            game={game}
                            place={place}
                            loading={loading} />
                    </TabPanel> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaderboardTab;
