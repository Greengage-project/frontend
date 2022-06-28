import { Alert, Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Paper, Stack, Tab, Tabs, Typography } from '@material-ui/core';
import { NatureChip, OfficialityChip } from 'components/dashboard/assets/Icons';
import {
  InterlinkerReference,
  InterlinkerReviews
} from 'components/dashboard/interlinkers';
import SwipeableTextMobileStepper from 'components/SwipeableTextMobileStepper';
import { useCustomTranslation } from 'hooks/useDependantTranslation';
import { useState } from 'react';
import { SafeHTMLElement } from 'utils/safeHTML';
import InterlinkerResults from '../browse/InterlinkerResults';

const InterlinkerDetails = ({ language, interlinker }) => {
  const [currentTab, setCurrentTab] = useState('overview');

  const { link, description, tags, name, problemprofiles, softwareinterlinker, snapshots_links } = interlinker;
  const t = useCustomTranslation(language)

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!interlinker) {
    return null;
  }

  const isKnowledge = interlinker.nature === "knowledgeinterlinker"
  const isExternal = interlinker.nature === "externalknowledgeinterlinker" || interlinker.nature === "externalsoftwareinterlinker"

  const common = [
    { label: t('Overview'), value: 'overview' },
    { label: t('Instructions'), value: 'instructions' },
    { label: t('Reviews'), value: 'reviews' },
    { label: t('Related interlinkers'), value: 'related' },
  ]
  const tabs = isKnowledge ? [
    ...common,
    { label: t('Preview-noun'), value: 'preview' },
  ] : [
    ...common
  ]

  return (
    <>
      <Tabs
        indicatorColor='primary'
        onChange={handleTabsChange}
        scrollButtons='auto'
        textColor='primary'
        value={currentTab}
        centered
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider />

      <Box sx={{ mt: 3 }} >
        {currentTab === 'overview' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} lg={5} xl={5}
            >
              <Paper>
                <SwipeableTextMobileStepper height="50vh" images={snapshots_links} objectFit="contain" />

              </Paper>
            </Grid>

            <Grid item xs={12} md={7} lg={7} xl={7}
            >
              <Card >
                <CardContent sx={{ minHeight: "55vh", overflowY: "scroll" }}>
                  <Stack direction="column" spacing={1}>
                    <Typography
                      color='textSecondary'
                      variant='overline'
                    >
                      {t("Name")}
                    </Typography>
                    <Typography
                      color='textPrimary'
                      variant='subtitle2'
                    >
                      {name}
                    </Typography>
                    <Typography
                      color='textSecondary'
                      variant='overline'
                    >
                      {t("Nature")}
                    </Typography>
                    <NatureChip interlinker={interlinker} t={t} />
                    <Typography
                      color='textSecondary'
                      variant='overline'
                    >
                      {t("Creator")}
                    </Typography>
                    <OfficialityChip t={t} />

                    <Typography
                      color='textSecondary'
                      variant='overline'
                    >
                      {t("Tags")}
                    </Typography>
                    <Box>
                      {tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          sx={{ mt: 1, ml: 1}}
                          variant='outlined'
                        />
                      ))}
                    </Box>
                    <Typography
                      color='textSecondary'
                      variant='overline'
                    >
                      {t("Problem profiles")}
                    </Typography>
                    <Box>
                      {problemprofiles.map((problem) => (
                        <Chip
                          key={problem.id}
                          label={problem.id + " - " + problem.name}
                          title={problem.id}
                          variant='outlined'
                          sx={{ mt: 1, mr: 1 }}
                        />
                      ))}
                    </Box>

                    {softwareinterlinker && <>
                      <Typography
                        color='textSecondary'
                        variant='overline'
                      >
                        {t("Based on")}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <InterlinkerReference interlinker_id={softwareinterlinker.id} />
                      </Box>
                    </>}

                    {isExternal && <>
                      <Typography
                        color='textSecondary'
                        variant='overline'
                      >
                        {t("URI")}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Link onClick={() => window.open(interlinker.uri)}>
                          {interlinker.uri || <Alert severity='warning'>{t("Not available")}</Alert>}
                        </Link>
                      </Box>
                    </>}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {currentTab === 'instructions' && (
          <Card sx={{ p: 3, height: "100%" }}>

            <Typography
              color='textSecondary'
              variant='overline'
            >
              {t("Description")}
            </Typography>
            <SafeHTMLElement data={description} />
            <Typography
              color='textSecondary'
              variant='overline'
            >
              {t("Instructions")}
            </Typography>
            <SafeHTMLElement data={interlinker.instructions} />
          </Card>
        )}
        {currentTab === 'preview' && isKnowledge && (

          <Box
            style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Box sx={{ mt: 2 }}>
              <Typography
                align='center'
                color='textPrimary'
                variant='h5'
              >
                {t("This resource cannot be displayed here. Instead...")}
              </Typography>
            </Box>
            {softwareinterlinker.preview && <>
              <Box sx={{ mt: 2 }}>
                <Typography
                  align='center'
                  color='textSecondary'
                  variant='subtitle1'
                >
                  {t("you can preview the resource externally")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => window.open(interlinker.link + "/preview", "_blank")}
                >
                  {softwareinterlinker.preview_text || t("Preview resource externally")}
                </Button>
              </Box>
            </>}

            {softwareinterlinker && !softwareinterlinker.preview && softwareinterlinker.download && <>
              <Box sx={{ mt: 2 }}>
                <Typography
                  align='center'
                  color='textSecondary'
                  variant='subtitle1'
                >
                  {t("you can download a copy of it to preview it on your machine")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                }}
              >
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => window.open(interlinker.link + "/download", "_blank")}
                >
                  {softwareinterlinker.download_text || t("Download resource")}
                </Button>
              </Box>
            </>}
          </Box>
        )}
        {currentTab === 'related' && (
          <InterlinkerResults language={language} filters={{ problemprofiles: interlinker.problemprofiles.map(el => el.id) }} onInterlinkerClick={(interlinker) => { console.log(interlinker) }} />
        )}
        {currentTab === 'reviews' && (
          <InterlinkerReviews interlinker={interlinker} />
        )}

      </Box>
    </>
  );
};

export default InterlinkerDetails;
