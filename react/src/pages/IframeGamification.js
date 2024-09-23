import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const IframeGamification = () => {
  const [iframeFocused, setIframeFocused] = useState(false);
  const [windowFocused, setWindowFocused] = useState(true);
  const [idleTime, setIdleTime] = useState(0);
  const [iframeActiveTime, setIframeActiveTime] = useState(0);
  const [windowActiveTime, setWindowActiveTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const location = useLocation();

  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };
  const { t } = useTranslation();
  const url = getQueryParams(location.search).get("url");
  const taskId = getQueryParams(location.search).get("taskId");

  const handleKeyDown = (event) => {
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
    const handleMouseMove = (event) => {
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
      // Idle time only increases if the iframe is NOT focused and there's no other activity
      if (Date.now() - lastActiveTime > 5000 && !iframeFocused) {
        setIdleTime((prevIdleTime) => prevIdleTime + 1);
      } else {
        if (iframeFocused) {
          setIframeActiveTime((prevTime) => prevTime + 1);
        }
        if (windowFocused) {
          setWindowActiveTime((prevTime) => prevTime + 1);
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
  console.log({ url });
  if (!url || !taskId) {
    return (
      <p>{t("The URL is not valid or a task ID has not been provided")}</p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <iframe
        src={url}
        title="Gamification"
        style={{ flex: 1, width: "100%", border: "none" }}
        onMouseEnter={handleIframeEnter}
        onMouseLeave={handleIframeLeave}
        onLoad={(e) => {}}
      />
      <div
        style={{
          flexShrink: 0,
          padding: "10px",
          backgroundColor: "#f4f4f4",
          borderTop: "1px solid #ccc",
        }}
      >
        <p>Window Active Time: {windowActiveTime} seconds</p>
        <p>Iframe Active Time: {iframeActiveTime} seconds</p>
        <p>Idle Time: {idleTime} seconds</p>
      </div>
    </div>
  );
};

export default IframeGamification;
