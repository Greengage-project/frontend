import { Avatar, Box, Button, Chip, Divider, Drawer, Skeleton, Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AccountTree, ArrowBack, Dashboard, Folder, Group as GroupIcon, Settings, Timeline, Leaderboard } from '@mui/icons-material';
import { StatusChip } from 'components/Icons';
import useDependantTranslation from 'hooks/useDependantTranslation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { LANGUAGES } from 'translations/i18n';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';

const ProcessSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const { process, hasSchema, loading, updating } = useSelector((state) => state.process);
  const navigate = useNavigate();
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const processId = process && process.id;


  const { t } = useDependantTranslation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const sections = [

    {
      title: '',
      items: [
        {
          title: t('Overview'),
          path: `/dashboard/coproductionprocesses/${processId}/overview`,
          icon: <Dashboard />,
          disabled: false
        },
        {
          title: t('Guide'),
          path: `/dashboard/coproductionprocesses/${processId}/guide`,
          icon: <AccountTree />,
          disabled: !hasSchema
        },
        {
          title: t('Leaderboard'),
          path: `/dashboard/coproductionprocesses/${processId}/leaderboard`,
          icon: <Leaderboard />,
          disabled: !hasSchema
        },
        {
          title: t('Workplan'),
          path: `/dashboard/coproductionprocesses/${processId}/workplan`,
          icon: <Timeline />,
          disabled: !hasSchema
        },
        {
          title: t('Team'),
          path: `/dashboard/coproductionprocesses/${processId}/team`,
          icon: <GroupIcon />,
          disabled: !hasSchema
        },
        {
          title: t('Settings'),
          path: `/dashboard/coproductionprocesses/${processId}/settings`,
          icon: <Settings />,
          disabled: false
        },
      ]
    },
  ];
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        {false && (
        <Button
          startIcon={<ArrowBack />}
          variant='outlined'
          fullWidth
          size='large'
          onClick={() => navigate('/dashboard')}
        />
        )}

        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={!loading && !updating ? 1 : 0}
          sx={{ p: 3 }}
        >

          {!loading && !updating ? (
            <Avatar
              variant='rounded'
              sx={{ width: '80px', height: '80px' }}
              src={process && process.logotype_link}
            >
              {(!process || !process.logotype_link) && <Folder />}
              {' '}
            </Avatar>
          ) : (
            <Skeleton
              variant='rounded'
              sx={{ m: 1, width: '80px', height: '80px' }}
            />
          )}
          <Typography
            sx={{ textAlign: 'center', width: '100%' }}
            variant='h6'
          >
            {!loading && !updating && process ? process.name : <Skeleton />}
          </Typography>
          {!loading && !updating && process ? (
            <StatusChip
              t={t}
              status={process.status}
            />
          ) : <Skeleton sx={{ width: 80, height: 45, m: 0, p: 0 }} />}
          {!loading && !updating && process ? (
            <Chip
              size='small'
              color='default'
              label={LANGUAGES.find((el) => el.value === process.language).label}
            />
          ) : <Skeleton sx={{ width: 80, height: 45, m: 0, p: 0 }} />}

        </Stack>
        <Divider />
        <Box sx={{ p: 2 }}>
          {!loading && sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3
                },
                color: 'text.secondary'
              }}
              {...section}
            />
          ))}
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100% - 64px) !important',
            top: '64px !Important',
            width: '260px',
            zIndex: 0
          }
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 300,
          zIndex: 0
        }
      }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
};

ProcessSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default ProcessSidebar;
