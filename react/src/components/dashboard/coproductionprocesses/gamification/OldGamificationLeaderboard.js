import {
  Box,
  List,
  Chip,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserAvatar from "components/UserAvatar";
import { useCustomTranslation } from "hooks/useDependantTranslation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTreeItemById } from "slices/process";
import { useNavigate } from "react-router";

const DEVELOPMENT_COMPLEXITY = {
  0: "None",
  20: "Very low",
  40: "Low",
  60: "Medium",
  80: "High",
  100: "Very high",
  default: "No defined",
};

const RANKING = {
  1: "gold",
  2: "silver",
  3: "bronze",
};

const CONTRIBUTION_LEVELS = {
  1: "Low contribution",
  2: "Average contribution",
  3: "High contribution",
};

const CONTRIBUTION_COLORS = {
  1: "low_contribution.main",
  2: "average_contribution.main",
  3: "high_contribution.main",
};

const OldGamificationLeaderboard = ({ user, game, place, loading }) => {
  const { process, tree, treeitems } = useSelector((state) => state.process);
  const [filteredGame, setFilteredGame] = useState({});
  const [phases, setPhases] = useState({});
  const [points, setPoints] = useState(0);
  const dispatch = useDispatch();
  const t = useCustomTranslation(process.language);
  const navigate = useNavigate();

  const redirect_to_task = (task_id) => {
    dispatch(
      setSelectedTreeItemById(task_id, () => {
        navigate(`/dashboard/coproductionprocesses/${process.id}/guide`);
      })
    );
  };

  const filterGame = () => {
    const tmpGame = {};
    const tmpPhases = {};
    let tmpPoints = 0;
    for (const task of game.taskList) {
      for (const player of task.players) {
        if (player.id === user.id) {
          tmpGame[task.id] = {
            score: task.development * player.development,
            contribution: player.development,
          };
          const { phase_id } = treeitems.find((item) => item.id === task.id);
          if (tmpPhases[phase_id] === undefined) {
            tmpPhases[phase_id] = task.development * player.development;
          } else {
            tmpPhases[phase_id] += task.development * player.development;
          }
          tmpPoints += task.development * player.development;
        }
      }
    }
    setPoints(tmpPoints);
    setPhases(tmpPhases);
    setFilteredGame(tmpGame);
  };

  useEffect(() => {
    if (!loading) {
      filterGame();
    }
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={8}>
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                <UserAvatar user={user} sx={{ width: "15%", height: "100%" }} />
                <Box sx={{ m: 2, textAlign: "left" }}>
                  <Typography variant="h3" component="h3" gutterBottom>
                    {user.full_name}
                  </Typography>
                  <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                      sx={{ ml: 0.3 }}
                    >
                      {user.email}
                    </Typography>
                    <Chip
                      label={`${points} points`}
                      sx={{
                        ml: 2,
                        backgroundColor: `${RANKING[place]}.main`,
                        color: `${RANKING[place]}.contrastText`,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4} sx={{ textAlign: "center" }}>
              <Typography variant="h3" component="h2" gutterBottom>
                {t("Place")}:
              </Typography>

              {place < 4 && place != 0 ? (
                <img
                  src={`/static/graphics/${place}place.svg`}
                  alt="medal"
                  loading="lazy"
                />
              ) : place === 0 ? (
                <Typography variant="h6" component="h6" gutterBottom>
                  {t("No contributions yet")}
                </Typography>
              ) : (
                <Typography variant="h2" component="h2" gutterBottom>
                  {place}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={3} sx={{ mt: 2 }}>
                <Typography variant="h5" component="h5">
                  {t("Your contribution in each task")}
                </Typography>
              </Grid>
            </Grid>

            {tree.map((node) => (
              <>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                  {node.name} -{phases[node.id] ? phases[node.id] : "0"}{" "}
                  {t("points")}
                </Typography>
                <List>
                  {node.children.map((objective) => (
                    <>
                      {objective.children.map((child) => (
                        <ListItem>
                          <ListItemSecondaryAction>
                            <Typography
                              variant="body2"
                              color={
                                filteredGame[child.id]
                                  ? CONTRIBUTION_COLORS[
                                      filteredGame[child.id].contribution
                                    ]
                                  : "primary"
                              }
                            >
                              {filteredGame[child.id]
                                ? `${
                                    CONTRIBUTION_LEVELS[
                                      filteredGame[child.id].contribution
                                    ]
                                  } - ${filteredGame[child.id].score} points`
                                : "No contribution"}
                            </Typography>
                          </ListItemSecondaryAction>
                          <ListItemText
                            primary={
                              <Link
                                onClick={() => {
                                  redirect_to_task(child.id);
                                }}
                                color="inherit"
                              >
                                {child.name}
                              </Link>
                            }
                            secondary={`${
                              DEVELOPMENT_COMPLEXITY[child.development]
                            } - ${child.development * 3}${t(
                              " points possible"
                            )}`}
                            sx={{
                              bgcolor: "",
                              borderRadius: "5px",
                              p: 0,
                            }}
                          />
                        </ListItem>
                      ))}
                    </>
                  ))}
                </List>
              </>
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default OldGamificationLeaderboard;
