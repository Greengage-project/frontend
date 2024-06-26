import { Box, Container, Grid, Typography } from "@mui/material";
import PublicCoproductionBrowse from "components/dashboard/publiccoproductions/browse/PublicCoproductionBrowse";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { getLanguage } from "translations/i18n";
import React from "react";
import useMounted from "hooks/useMounted";
import { useNavigate } from "react-router-dom";

import SelectTypeCoproProcess from "components/dashboard/coproductionprocesses/SelectTypeCoproProcess";
import { useDispatch } from "react-redux";
import { getProcess } from "slices/process";

const PublicCoproductionCatalogue = () => {
  const [open, setOpen] = useState(false);
  const [publiccoproduction, setPublicCoproduction] = useState(null);

  const { t } = useTranslation();
  const language = getLanguage();

  const mounted = useMounted();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //const { trackEvent } = useMatomo();

  return (
    <>
      <Helmet>
        <title>{t("catalogue-title")}</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 5,
          px: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                
                <Typography
                  color="textPrimary"
                  variant="h5"
                  data-cy="Processes-Catalogue"
                >
                  {t("Open Processes Catalogue").toUpperCase()}
                </Typography>
                <Typography color="textSecondary" variant="h6" sx={{m:1}}>
                {t(
                    "Here there is a list of public processes you can join in case you think that you can collaborate"
                  )+'.'}
                </Typography>
              </Grid>
              <Grid item />
            </Grid>
          </Grid>

          <PublicCoproductionBrowse
            language={language}
            onPublicCoproductionClick={(publiccoproduction) => {
              // trackEvent({
              //   category: 'catalogue',
              //   action: 'publiccoproduction-open',
              //   name: publiccoproduction.id
              // });
              setPublicCoproduction(publiccoproduction);
              
              handleClickOpen();
              navigate("/publiccoproductions/"+publiccoproduction.id + "/profile");
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default PublicCoproductionCatalogue;
