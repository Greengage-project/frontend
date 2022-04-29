import { Box, Container, Grid, LinearProgress, ToggleButton, ToggleButtonGroup, Typography } from '@material-ui/core';
import { ViewModule } from '@material-ui/icons';
import { LoadingButton } from '@material-ui/lab';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useInViewport } from 'react-in-viewport';
import { interlinkersApi } from '__api__';
import { InterlinkerBrowseFilter, InterlinkerCard } from '../../../components/dashboard/interlinkers';
import useMounted from '../../../hooks/useMounted';
import InterlinkerDialog from './InterlinkerDialog';

const InterlinkerBrowse = () => {
  const mounted = useMounted();
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);
  const [interlinker, setInterlinker] = useState(null);
  const [mode, setMode] = useState('grid');

  const handleModeChange = (event, value) => {
    setMode(value);
  };

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(9);
  const [filters, setFilters] = useState({});
  const [loadedRows, setLoadedRows] = useState([]);

  const hasNextPage = loadedRows.length < total

  const loadServerRows = async (page, loadedRows) => {
    setLoading(true);
    try {
      interlinkersApi.getMulti({ page: page + 1, size, ...filters }).then(res => {
        if (mounted.current) {
          setLoading(false);
          setPage(page + 1)
          setTotal(res.total)
          setLoadedRows([...loadedRows, ...res.items].filter((element, index, self) => self.indexOf(el => el.id === element.id) !== index))
        }
      })

    } catch (err) {
      console.error("Failed to load data: ", err);
    }
  };

  const handleLoadMore = async () => {
    console.log(hasNextPage, loadedRows.length, "/", total)
    if (hasNextPage) {
      loadServerRows(page, loadedRows)
    }
  };

  useEffect(() => {
    setPage(0)
    setLoadedRows([])
    loadServerRows(0, [])
  }, [filters])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{t("catalogue-title")}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid
            alignItems='center'
            container
            justifyContent='space-between'
            spacing={3}
          >
            <Grid item>
              <Typography
                color='textPrimary'
                variant='h5'
              >
                {t("interlinkers-catalogue")}
              </Typography>
            </Grid>
            <Grid item>
              {/* <Box sx={{ m: -1 }}>
                <Button
                  color='primary'
                  component={RouterLink}
                  startIcon={<PlusIcon fontSize='small' />}
                  sx={{ m: 1 }}
                  to='/dashboard/interlinkers/new'
                  variant='contained'
                >
                  New Interlinker
                </Button>
      </Box>*/}
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <InterlinkerBrowseFilter onFiltersChange={setFilters} />
          </Box>

          <Box sx={{ mt: 6 }}>


            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mb: 2
              }}
            >
              <Typography
                color='textPrimary'
                sx={{
                  position: 'relative',
                  '&:after': {
                    backgroundColor: 'primary.main',
                    bottom: '-8px',
                    content: '" "',
                    height: '3px',
                    left: 0,
                    position: 'absolute',
                    width: '48px'
                  }
                }}
                variant='h6'
              >
                {t("interlinkers-catalogue-total", { total })}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <ToggleButtonGroup
                  exclusive
                  onChange={handleModeChange}
                  size='small'
                  value={mode}
                >
                  <ToggleButton value='grid'>
                    <ViewModule fontSize='small' />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            <Grid
              container
              spacing={3}
            >
              {loadedRows.map((interlinker, i) => (
                <Grid
                  item
                  key={interlinker.id}
                  md={mode === 'grid' ? 4 : 12}
                  sm={mode === 'grid' ? 6 : 12}
                  xs={12}
                >
                  <InterlinkerCard interlinker={interlinker} onInterlinkerClick={(i) => {
                    setInterlinker(i)
                    handleClickOpen()
                  }} mode={mode} />
                </Grid>
              ))}

              <Grid item xs={12} sx={{ justifyContent: "center", textAlign: "center" }}>
                {hasNextPage && <LoadingButton loading={loading} variant="contained" onClick={handleLoadMore}>{t("Load more")}</LoadingButton>}
              </Grid>
            </Grid>
          </Box>

        </Container>
        <InterlinkerDialog
          interlinker={interlinker}
          open={open}
          setOpen={setOpen}
        />
      </Box>
    </>
  );
};

export default InterlinkerBrowse;