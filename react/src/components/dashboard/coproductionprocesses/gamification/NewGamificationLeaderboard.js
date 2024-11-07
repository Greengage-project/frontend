import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  List,
  Container,
  Avatar,
  Pagination,
  Card,
  CardContent,
  Tooltip,
  TextField,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import SwipeableViews from "react-swipeable-views";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SearchIcon from "@mui/icons-material/Search";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const ITEMS_PER_PAGE = 10;

const NewGamificationLeaderboard = ({ user, game, loading }) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const leaderboard = game.task
    .flatMap((task) =>
      task.points.map((point) => ({
        ...point,
        taskId: task?.externalTaskId,
        taskName: task?.name,
        taskStatus: task?.status,
      }))
    )
    .reduce((acc, point) => {
      const userEntry = acc.find(
        (entry) => entry.externalUserId === point.externalUserId
      );
      if (userEntry) {
        userEntry.points += point.points * point.timesAwarded;
        userEntry.taskPoints.push({
          taskId: point.taskId,
          taskName: point.taskName,
          taskStatus: point.taskStatus,
          points: point.points,
          timesAwarded: point.timesAwarded,
        });
      } else {
        acc.push({
          ...point,
          points: point.points * point.timesAwarded,
          taskPoints: [
            {
              taskId: point.taskId,
              taskName: point.taskName,
              taskStatus: point.taskStatus,
              points: point.points,
              timesAwarded: point.timesAwarded,
            },
          ],
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.points - a.points);

  const topThree = [];
  let index = 0;
  while (topThree.length < 3 && index < leaderboard.length) {
    const entry = leaderboard[index];
    if (entry.full_name) {
      topThree.push(entry);
    }
    index++;
  }

  const others = [
    ...leaderboard.slice(index),
    ...leaderboard.slice(0, index).filter((entry) => !entry.full_name),
  ];

  const filteredOthers = others.filter(
    (entry) =>
      entry.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.full_name === undefined &&
        "unknown user".includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredOthers.length / ITEMS_PER_PAGE);
  const displayedLeaderboard = filteredOthers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleUserSelect = (entry) => {
    setSelectedUser(entry);
  };

  const generateChartData = (entry) => ({
    labels: entry.taskPoints.map((task) => task.taskName),
    datasets: [
      {
        label: "Points",
        data: entry.taskPoints.map((task) => task.points * task.timesAwarded),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      {!loading ? (
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Leaderboard
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Your score:{" "}
                {leaderboard.find((entry) => entry.externalUserId === user.sub)
                  ?.points || 0}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: "auto" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search user"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} mt={3}>
              <Grid container spacing={2} justifyContent="center">
                {Array(3)
                  .fill(null)
                  .map((_, i) => {
                    const entry = topThree[i];
                    if (!entry) {
                      return <Grid item xs={12} sm={4} key={i} />;
                    }

                    const isCurrentUser = entry.externalUserId === user.sub;
                    const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
                    const medalLabels = ["1st Place", "2nd Place", "3rd Place"];

                    return (
                      <Grid item xs={12} sm={4} key={entry.externalUserId}>
                        <Card
                          onClick={() => handleUserSelect(entry)}
                          sx={{
                            cursor: "pointer",
                            backgroundColor: isCurrentUser
                              ? "rgba(0, 150, 250, 0.1)"
                              : "inherit",
                            textAlign: "center",
                            animation: "fadeIn 1s ease",
                            borderColor: medalColors[i],
                            borderWidth: 2,
                            borderStyle: "solid",
                          }}
                        >
                          <CardContent>
                            <EmojiEventsIcon
                              fontSize="large"
                              sx={{ color: medalColors[i], mb: 1 }}
                            />
                            <Avatar
                              src={entry.picture}
                              alt={entry.full_name || "Unknown User"}
                              sx={{
                                width: 80,
                                height: 80,
                                mx: "auto",
                                bgcolor: medalColors[i],
                                color: "white",
                                mb: 2,
                              }}
                            >
                              {entry.full_name
                                ? entry.full_name.charAt(0)
                                : "U"}
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">
                              {entry.full_name || "Unknown User"}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {medalLabels[i]}
                            </Typography>
                            <Tooltip
                              title={entry.taskPoints
                                .map(
                                  (task) =>
                                    `${task.taskName} (${task.taskStatus}): ${task.points} points (x${task.timesAwarded})`
                                )
                                .join(", ")}
                            >
                              <Typography variant="body2" color="textSecondary">
                                Total Points: {entry.points.toLocaleString()}
                              </Typography>
                            </Tooltip>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>

            {/* Resto del leaderboard con paginación */}
            <Grid item xs={12} mt={4}>
              <List>
                {displayedLeaderboard.map((entry, index) => {
                  const isCurrentUser = entry.externalUserId === user.sub;
                  const position = 4 + (page - 1) * ITEMS_PER_PAGE + index;

                  return (
                    <Card
                      onClick={() => handleUserSelect(entry)}
                      key={entry.externalUserId}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: isCurrentUser
                          ? "rgba(0, 150, 250, 0.1)"
                          : "inherit",
                        mb: 1,
                      }}
                    >
                      <CardContent>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Avatar
                              src={entry.picture}
                              alt={entry.full_name || "Unknown User"}
                              sx={{ mr: 2 }}
                            >
                              {entry.full_name
                                ? entry.full_name.charAt(0)
                                : "U"}
                            </Avatar>
                          </Grid>
                          <Grid item xs>
                            <Typography
                              variant="body1"
                              fontWeight={isCurrentUser ? "bold" : "normal"}
                            >
                              {`${position}. ${
                                entry.full_name || "Unknown User"
                              }`}
                            </Typography>
                            <Tooltip
                              title={entry.taskPoints
                                .map(
                                  (task) =>
                                    `${task.taskName} (${task.taskStatus}): ${task.points} points (x${task.timesAwarded})`
                                )
                                .join(", ")}
                            >
                              <Typography variant="body2" color="textSecondary">
                                Total Points: {entry.points.toLocaleString()}
                              </Typography>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
              </List>
            </Grid>

            {/* Paginación */}
            <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Grid>

            {/* Gráfico de puntos por tarea del usuario seleccionado */}
            {selectedUser && (
              <Grid item xs={12} mt={4}>
                <SwipeableViews>
                  <Card sx={{ padding: 3 }}>
                    <Typography variant="h6" align="center">
                      Points per Task for{" "}
                      {selectedUser.full_name || "Unknown User"}
                    </Typography>
                    <Bar
                      data={generateChartData(selectedUser)}
                      options={{
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </Card>
                </SwipeableViews>
              </Grid>
            )}
          </Grid>
        </Container>
      ) : (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default NewGamificationLeaderboard;
