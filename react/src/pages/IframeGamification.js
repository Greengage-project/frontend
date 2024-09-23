import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  Fab,
  Box,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { debounce } from "lodash";

const GamificationPanel = ({
  windowActiveTime,
  iframeActiveTime,
  activeTime,
  idleTime,
  iframeHeight,
  toggleDrawer,
  drawerOpen,
  className,
}) => {
  const [showSecretInfo, setShowSecretInfo] = useState(false);
  const secretCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  const [keySequence, setKeySequence] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [rewards, setRewards] = useState([]);

  const milestones = [0, 1, 5, 15, 30, 60];
  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeySequence((prevSequence) => [...prevSequence, event.key].slice(-10));

      if (
        JSON.stringify([...keySequence, event.key].slice(-10)) ===
        JSON.stringify(secretCode)
      ) {
        setShowSecretInfo(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keySequence, secretCode]);

  useEffect(() => {
    const maxTime = milestones[milestones.length - 1] * 60;
    const progressValue = Math.min((activeTime / maxTime) * 100, 100);
    setCurrentProgress(progressValue);
  }, [activeTime, milestones]);

  const getProgressColor = () => {
    return "#4caf50";
  };

  const getMilestoneColor = (milestone) => {
    return currentProgress >=
      (milestone / milestones[milestones.length - 1]) * 100
      ? getProgressColor()
      : "#e0e0e0";
  };

  const getMilestonePosition = (milestone) => {
    return (milestone / milestones[milestones.length - 1]) * 100;
  };

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{ zIndex: 1300, height: `${iframeHeight}px`, position: "absolute" }}
      variant="persistent"
      className={className}
    >
      <Box
        sx={{
          width: 250,
          height: "100%",
          padding: "16px",
          backgroundColor: "#f4f4f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {showSecretInfo && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Activity Info</Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          {showSecretInfo && (
            <>
              <Typography>
                Active Time: {activeTime} seconds
                <br />
              </Typography>
              <Typography>
                Window Active Time: {windowActiveTime} seconds
              </Typography>
              <Typography>
                Iframe Active Time: {iframeActiveTime} seconds
              </Typography>
              <Typography>Idle Time: {idleTime} seconds</Typography>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 2,
            height: "calc(100vh - 150px)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: 20,
              backgroundColor: "#e0e0e0",
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              marginRight: "16px",
            }}
          >
            <Box
              sx={{
                height: `${currentProgress}%`,
                width: "100%",
                backgroundColor: getProgressColor(),
                position: "absolute",
                bottom: 0,
              }}
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  bottom: `${getMilestonePosition(milestone)}%`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: getMilestoneColor(milestone),
                    marginRight: "8px",
                  }}
                />

                <Typography
                  variant="body2"
                  color={
                    currentProgress >=
                    (milestone / milestones[milestones.length - 1]) * 100
                      ? "textPrimary"
                      : "textSecondary"
                  }
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {milestone} min
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

const IframeGamification = () => {
  const [iframeFocused, setIframeFocused] = useState(false);
  const [windowFocused, setWindowFocused] = useState(true);
  const [idleTime, setIdleTime] = useState(0);
  const [iframeActiveTime, setIframeActiveTime] = useState(0);
  const [windowActiveTime, setWindowActiveTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(0);
  const iframeRef = useRef(null);

  const location = useLocation();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const { t } = useTranslation();
  const url = getQueryParams(location.search).get("url");
  const taskId = getQueryParams(location.search).get("taskId");

  const handleKeyDown = () => {
    if (iframeFocused) {
      setLastActiveTime(Date.now());
    }
  };

  const handleIframeEnter = () => {
    setIframeFocused(true);
    setLastActiveTime(Date.now());
  };

  const handleIframeLeave = () => {
    setIframeFocused(false);
  };

  useEffect(() => {
    const handleMouseMove = () => {
      setLastActiveTime(Date.now());
    };

    const handleFocus = () => {
      setWindowFocused(true);
      setLastActiveTime(Date.now());
    };

    const handleBlur = () => {
      setWindowFocused(false);
    };

    const checkIdleTime = () => {
      if (Date.now() - lastActiveTime > 5000 && !iframeFocused) {
        setIdleTime((prevIdleTime) => prevIdleTime + 1);
      } else {
        if (iframeFocused) {
          setIframeActiveTime((prevTime) => prevTime + 1);
          setActiveTime((prevTime) => prevTime + 1);
        }
        if (windowFocused) {
          setWindowActiveTime((prevTime) => prevTime + 1);
          setActiveTime((prevTime) => prevTime + 1);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    const idleInterval = setInterval(checkIdleTime, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      clearInterval(idleInterval);
    };
  }, [iframeFocused, lastActiveTime, windowFocused]);

  useEffect(() => {
    const updateIframeHeight = () => {
      if (iframeRef.current) {
        setIframeHeight(iframeRef.current.offsetHeight);
      }
    };

    const debouncedUpdate = debounce(updateIframeHeight, 300);

    updateIframeHeight();
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const totalTime = (windowActiveTime + iframeActiveTime) / 60;
  const progress = Math.min((totalTime / 15) * 100, 100);

  if (!url || !taskId) {
    return (
      <Typography>
        {t("The URL is not valid or a task ID has not been provided")}
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      position="relative"
    >
      <iframe
        ref={iframeRef}
        src={url}
        title="Gamification"
        style={{ flex: 1, width: "100%", border: "none" }}
        onMouseEnter={handleIframeEnter}
        onMouseLeave={handleIframeLeave}
      />

      <Fab
        color="primary"
        onClick={toggleDrawer}
        style={{ position: "fixed", bottom: 16, right: 16, zIndex: 1301 }}
      >
        <MenuIcon />
      </Fab>

      <GamificationPanel
        windowActiveTime={windowActiveTime}
        iframeActiveTime={iframeActiveTime}
        activeTime={activeTime}
        idleTime={idleTime}
        progress={progress}
        iframeHeight={iframeHeight}
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        className="gamification-panel"
      />
    </Box>
  );
};

export default IframeGamification;
