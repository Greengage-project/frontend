import { Box, Container } from '@mui/material';
import { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import Loadable from 'routes/Loadable';

const InterlinkerBrowse = Loadable(
  lazy(() => import('../components/dashboard/interlinkers/browse/InterlinkerBrowse'))
);

const HomeCatalogue = () => (
  <>
    <Helmet>
      <title>GREENGAGE: Catalogue</title>
    </Helmet>
    <Box sx={{ backgroundColor: 'background.default',
      minHeight: '100%',
      py: 6 }}
    >
      <Container maxWidth='lg'>
        <InterlinkerBrowse />

      </Container>
    </Box>
  </>
);

export default HomeCatalogue;
