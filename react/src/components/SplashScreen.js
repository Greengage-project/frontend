import { Box } from '@mui/material';

const SlashScreen = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 2000
    }}
  >
    <img
      alt='Splash logo'
      src='/static/customization/logo-splash.png'
      height='60px'
    />
  </Box>
);

export default SlashScreen;
