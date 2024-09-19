import React, { useState, useEffect } from "react";

const IframeGamification = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [iframeFocused, setIframeFocused] = useState(false);
  const [windowFocused, setWindowFocused] = useState(true);
  const [keyPressesInIframe, setKeyPressesInIframe] = useState(0);
  const [scrollPositionInIframe, setScrollPositionInIframe] = useState(0);
  const [focusSwitches, setFocusSwitches] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [iframeActiveTime, setIframeActiveTime] = useState(0);
  const [windowActiveTime, setWindowActiveTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  const handleKeyDown = (event) => {
    if (iframeFocused) {
      setKeyPressesInIframe((prevCount) => prevCount + 1);
      setLastActiveTime(Date.now());
    }
  };

  const handleIframeEnter = () => {
    setIframeFocused(true);
    setFocusSwitches((prevSwitches) => prevSwitches + 1);
    setLastActiveTime(Date.now());
  };

  const handleIframeLeave = () => {
    setIframeFocused(false);
  };

  const handleIframeScroll = (event) => {
    const scrollPosition = event.target.scrollTop;
    setScrollPositionInIframe(scrollPosition);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <iframe
        src="https://docs.google.com/presentation/d/1ma6q20H1HGWiYhH3Cex8pSEPZ0xNcYvZ/edit#slide=id.p1"
        title="Gamification"
        style={{ flex: 1, width: "100%", border: "none" }}
        onMouseEnter={handleIframeEnter}
        onMouseLeave={handleIframeLeave}
        onLoad={(e) =>
          e.target.contentWindow.addEventListener("scroll", handleIframeScroll)
        }
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
