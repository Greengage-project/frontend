import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  Fab,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
  Button
} from '@mui/material';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';
import { Close as CloseIcon } from '@mui/icons-material';
import { debounce } from 'lodash';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { tasksApi } from '__api__/coproduction/tasksApi';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Launch from '@mui/icons-material/Launch';
import { newGamesApi, assetsApi } from '__api__';
import useAuth from 'hooks/useAuth';

const GamificationPanel = ({
  windowActiveTime,
  iframeActiveTime,
  activeTime,
  idleTime,
  iframeHeight,
  toggleDrawer,
  drawerOpen,
  className
}) => {
  const { t } = useTranslation();

  const [showSecretInfo, setShowSecretInfo] = useState(false);
  const secretCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];
  const [keySequence, setKeySequence] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(0);

  const milestones = [0, 1, 5, 15, 30, 60];
  useEffect(() => {
    const handleKeyDown = event => {
      setKeySequence(prevSequence => [...prevSequence, event.key].slice(-10));

      if (JSON.stringify([...keySequence, event.key].slice(-10)) === JSON.stringify(secretCode)) {
        setShowSecretInfo(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keySequence, secretCode]);

  useEffect(() => {
    const maxTime = milestones[milestones.length - 1] * 60;
    const progressValue = Math.min((activeTime / maxTime) * 100, 100);
    setCurrentProgress(progressValue);
  }, [activeTime, milestones]);

  const getProgressColor = () => '#4caf50';

  const getMilestoneColor = milestone =>
    currentProgress >= (milestone / milestones[milestones.length - 1]) * 100
      ? getProgressColor()
      : '#e0e0e0';

  const getMilestonePosition = milestone => (milestone / milestones[milestones.length - 1]) * 100;

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{ zIndex: 1300, height: `${iframeHeight}px`, position: 'absolute' }}
      variant="persistent"
      className={className}
    >
      <Box
        sx={{
          width: 250,
          height: '100%',
          padding: '16px',
          backgroundColor: '#f4f4f4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" className="text-center">
              {t('Rewards')}
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          {showSecretInfo && (
            <>
              <Typography>
                Active Time: {activeTime} seconds
                <br />
              </Typography>
              <Typography>
                Window Active Time:
                {windowActiveTime} seconds
              </Typography>
              <Typography>
                Iframe Active Time:
                {iframeActiveTime} seconds
              </Typography>
              <Typography>
                Idle Time:
                {idleTime} seconds
              </Typography>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mt: 2,
            height: 'calc(100vh - 150px)',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: 20,
              backgroundColor: '#e0e0e0',
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              marginRight: '16px'
            }}
          >
            <Box
              sx={{
                height: `${currentProgress}%`,
                width: '100%',
                backgroundColor: getProgressColor(),
                position: 'absolute',
                bottom: 0
              }}
            />
          </Box>

          <Box
            sx={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            {milestones.map((milestone, index) => (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  bottom: `${getMilestonePosition(milestone)}%`,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: getMilestoneColor(milestone),
                    marginRight: '8px'
                  }}
                />

                <Typography
                  variant="body2"
                  color={
                    currentProgress >= (milestone / milestones[milestones.length - 1]) * 100
                      ? 'textPrimary'
                      : 'textSecondary'
                  }
                  sx={{ whiteSpace: 'nowrap' }}
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
  const [windowStatus, setWindowStatus] = useState('validating');
  const [openModal, setOpenModal] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const [iframeActiveTime, setIframeActiveTime] = useState(0);
  const [windowActiveTime, setWindowActiveTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [timestampsActivity, setTimestampsActivity] = useState([]);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(0);
  const [lastLocation, setLastLocation] = useState(null);
  const [userIsAllowed, setUserIsAllowed] = useState(true);
  const [showLightbox, setShowLightbox] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const iframeRef = useRef(null);
  const navigate = useNavigate();

  const [contributionText, setContributionText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const unblockRef = useRef(false);

  const location = useLocation();
  const getQueryParams = search => new URLSearchParams(search);
  const { t } = useTranslation();
  const url = getQueryParams(location.search).get('url');
  const taskId = getQueryParams(location.search).get('taskId');
  const assetId = getQueryParams(location.search).get('assetId');
  const coproductionprocessesId = getQueryParams(location.search).get('coproductionprocessesId');

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
    const fetchAssetData = async () => {
      try {
        const assetData = await assetsApi.getAssetInfo(assetId);

        if (assetData?.name && url && assetData.name.endsWith('.pdf')) {
          setShouldRedirect(true);
        }
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }

      setLoading(false);
    };

    if (assetId && url && loading) {
      fetchAssetData();
    }
  }, [assetId, url, loading]);

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
        setIdleTime(prevIdleTime => prevIdleTime + 1);
      } else {
        if (iframeFocused) {
          setIframeActiveTime(prevTime => prevTime + 1);
          setActiveTime(prevTime => prevTime + 1);
        }
        if (windowFocused) {
          setWindowActiveTime(prevTime => prevTime + 1);
          setActiveTime(prevTime => prevTime + 1);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    const idleInterval = setInterval(checkIdleTime, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
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
    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
    };
  }, []);

  useEffect(() => {
    const fetchTaskData = async () => {
      const data = await tasksApi.checkTaskAndResource(taskId, assetId, coproductionprocessesId);
      if (data) {
        setWindowStatus('valid');
      }
      if (!data) {
        setWindowStatus('invalid');
      }
    };

    fetchTaskData();
  }, [taskId]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const totalTime = (windowActiveTime + iframeActiveTime) / 60;
  const progress = Math.min((totalTime / 15) * 100, 100);

  useEffect(() => {
    const fetchTaskData = async () => {
      const data = await tasksApi
        .checkTaskAndResource(taskId, assetId, coproductionprocessesId)
        .catch(error => {
          setUserIsAllowed(false);
        });
      setWindowStatus(data ? 'valid' : 'invalid');
    };
    fetchTaskData();
  }, [taskId, assetId]);

  useEffect(() => {
    if (lastLocation && lastLocation.pathname !== location.pathname && !unblockRef.current) {
      setOpenModal(true);
    } else {
      setLastLocation(location);
    }
  }, [location, lastLocation]);

  useEffect(() => {
    let lastActivityType = null;
    let lastTimestamp = Date.now();

    const updateTimestamps = type => {
      const currentTimestamp = Date.now();

      setTimestampsActivity(prev => [...prev, { from: lastTimestamp, to: currentTimestamp, type }]);

      lastActivityType = type;
      lastTimestamp = currentTimestamp;
    };

    const handleActivityUpdate = () => {
      if (iframeFocused && lastActivityType !== 'activeTime') {
        updateTimestamps('activeTime');
      } else if (!windowFocused && lastActivityType !== 'idleTime') {
        updateTimestamps('idleTime');
      }
    };

    const intervalId = setInterval(handleActivityUpdate, 1000);

    return () => clearInterval(intervalId);
  }, [iframeFocused, windowFocused]);

  const handleAttemptToLeave = e => {
    if (unblockRef.current) return;
    e.preventDefault();
    e.returnValue = '';
    setOpenModal(true);
  };

  const confirmLeave = () => {
    if (contributionText.length <= 3 || rating < 1 || rating > 5) {
      setError(
        'Please enter a contribution of more than 3 characters and rate between 1 and 5 stars.'
      );
      return;
    }

    const minutes = Math.round((windowActiveTime + iframeActiveTime) / 60);

    newGamesApi
      .rewardPoints(
        coproductionprocessesId,
        taskId,
        user?.sub,
        assetId,
        minutes,
        contributionText,
        rating,
        timestampsActivity
      )
      .then(res => {
        const pointsReceived = res?.points || 0;
        Swal.fire({
          title: `You earned ${pointsReceived} points!`,
          text: 'Thank you for your contribution!',
          icon: 'success',
          confirmButtonText: 'Awesome!'
        }).then(() => {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        });
        unblockRef.current = true;
        setOpenModal(false);
        navigate(`/dashboard/coproductionprocesses/${coproductionprocessesId}/guide`);
      })
      .catch(error => {
        console.error('Reward Points Error:', error);
        setOpenModal(false);
      });
  };

  const cancelLeave = () => {
    unblockRef.current = false;
    setOpenModal(false);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleAttemptToLeave);
    return () => {
      window.removeEventListener('beforeunload', handleAttemptToLeave);
    };
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (shouldRedirect) {
    window.location.href = url;
    return null;
  }

  if (!userIsAllowed) {
    return <Typography>{t('You are not allowed to access this task')}</Typography>;
  }

  if (windowStatus === 'validating') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (windowStatus === 'invalid') {
    return <Typography>{t('Task o resource invalid')}</Typography>;
  }

  if (!url || !taskId) {
    return (
      <Typography>
        {t('The URL is not valid, a task ID or Asset ID has not been provided')}
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" height="100%" position="relative">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      <iframe
        ref={iframeRef}
        src={url}
        title="Gamification"
        style={{ flex: 1, width: '100%', border: 'none' }}
        onMouseEnter={handleIframeEnter}
        onMouseLeave={handleIframeLeave}
      />
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Confirm Exit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave? If you have completed your contribution, please describe
            your work in the input below and rate your contribution to the task from 1 to 5.
            <br />
            <br />
            <strong>Warning:</strong> If you close this window without submitting, you will lose any
            points that could be awarded.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Describe your contribution"
            type="text"
            fullWidth
            variant="outlined"
            value={contributionText}
            onChange={e => {
              setContributionText(e.target.value);
              setError('');
            }}
          />
          <DialogContentText>Rate your contribution (1-5)</DialogContentText>
          <Rating
            name="customized-empty"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => {
              setRating(newValue);
              setError('');
            }}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            icon={<StarIcon fontSize="inherit" />}
            getLabelText={value => `${value} Star${value !== 1 ? 's' : ''}`}
            renderValue={value => (
              <span>
                {value >= 1 ? (
                  <StarIcon fontSize="inherit" />
                ) : value >= 0.5 ? (
                  <StarHalfIcon fontSize="inherit" />
                ) : (
                  <StarBorderIcon fontSize="inherit" />
                )}
              </span>
            )}
          />
          {error && <DialogContentText color="error">{error}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={confirmLeave} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        color="primary"
        onClick={toggleDrawer}
        style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1301 }}
      >
        <WorkspacePremiumIcon />
      </Fab>
      <Box>
        {showLightbox && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1400,
              textAlign: 'center',
              padding: '16px'
            }}
            onClick={() => setShowLightbox(false)}
          >
            <Box>
              <DialogTitle>Complete Your Task</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Click the green "Complete Task" button to finalize your work, submit your
                  contribution, and earn points.
                </DialogContentText>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowLightbox(false)}
                  sx={{ marginTop: 2 }}
                >
                  Got it
                </Button>
              </DialogContent>
            </Box>
          </Box>
        )}

        <Fab
          color="warning"
          onClick={() => {
            Swal.fire({
              title: t('Do you want to access this resource directly?'),
              text: t(
                'If you choose to open this resource directly, you will leave the current view. Any unsaved progress may be lost.'
              ),
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: t('Yes, access directly'),
              cancelButtonText: t('No, stay here')
            }).then(result => {
              if (result.isConfirmed) {
                window.open(url, '_self');
              }
            });
          }}
          style={{ position: 'fixed', bottom: 136, right: 16, zIndex: 1301 }}
          aria-label="Access Resource"
        >
          <Launch />
        </Fab>

        <Fab
          color="success"
          onClick={() => setOpenModal(true)}
          style={{ position: 'fixed', bottom: 76, right: 16, zIndex: 1301 }}
          aria-label="Complete Task"
        >
          <CheckCircleIcon />
        </Fab>
      </Box>
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
