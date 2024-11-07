import React, { useState } from "react";
import {
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardContent,
  Card,
  Input,
  Typography,
  Chip,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { recommenderApi } from "__api__";
import { Done, Delete, Close, KeyboardArrowRight } from "@mui/icons-material";
import SelectGovernanceModel from "./SelectGovernanceModel";
import { useSelector } from "react-redux";
import { useCustomTranslation } from "hooks/useDependantTranslation";

export default function SelectTypeCoproProcess({
  open,
  setOpen,
  loading,
  setLoading,
}) {
  const { process } = useSelector((state) => state.process);

  const t = useCustomTranslation(process.language);

  const [listKeywords, setListKeywords] = useState(
    t("list-tags-governance-predefined").split(",")
  );
  const [recomendedCategories, setRecomendedCategories] = useState([]);
  const [listSelectedKeywords, setListSelectedKeywords] = useState([]);

  const [openGovernanceSelector, setOpenGovernanceSelector] =
    React.useState(false);
  const [selectorGovTypeLoading, setSelectorGovTypeLoading] =
    React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const handleNext = async () => {
    setLoading(true);

    const listCategories =
      "C2C,C2G;C2G;G+G,C2G;G+G,G2C,C2G;C2G,G2C;G2C,C2G;G+G,C2C,C2G;G2C,C2C,C2G;G2C,C2C,C2G;G2C,C2G;C2C,C2G;C2C,C2G;G+G,C2C,C2G;G+G,G2C,C2G;C2C,C2G;G+G,G2C,C2G;G+G,G2C;G+G;G+G;G+G;G+G,G2C;G+G,G2C;G+G,C2G;G+G,C2G;G+G,G2C;G2C,G+G;G2C,G+G;G+G,G+G;C2C,C2G,G+G;G2C,G+G;G2C;G2C;G2C;G2C;G2C;G2C;G2C;G2C;G2C;G2C;G2C;G2C;G2C;G2C;C2C,C2G,G2C;C2C;C2C;C2C,C2G;C2C;C2C;C2C,C2G;C2C,G+G;C2C,G+G;C2C,G+G;C2C,C2G;C2C,C2G;G+G,C2C;G+G,C2C".split(
        ";"
      );

    const trainingdata = {};
    let cont = 0;
    for (const keyword of listKeywords) {
      trainingdata[keyword] = listCategories[cont];
      cont++;
    }

    const sampleData = listSelectedKeywords.join(",");

    recommenderApi
      .recommendGovernanceModel(sampleData, [trainingdata])
      .then((data) => {
        setRecomendedCategories(data);

        setOpen(false);
        setLoading(false);
        setOpenGovernanceSelector(true);
      });
  };

  const handleClick = (keyword) => {
    const newSelectedList = listSelectedKeywords.concat(keyword);
    setListSelectedKeywords(newSelectedList);

    const newKeyList = listKeywords.filter((item) => item !== keyword);
    setListKeywords(newKeyList);
  };

  const handleDelete = (keyword) => {
    const newSelectedList = listSelectedKeywords.filter(
      (item) => item !== keyword
    );
    setListSelectedKeywords(newSelectedList);

    const newKeyList = listKeywords.concat(keyword);
    setListKeywords(newKeyList);
  };

  const listChipsKeywords = listKeywords.map((keyword) => (
    <Chip
      key={`active-keyword-${keyword}`}
      label={keyword}
      onClick={() => handleClick(keyword)}
      onDelete={() => handleClick(keyword)}
      deleteIcon={<Done />}
    />
  ));

  const listChipsSelectedKeywords = listSelectedKeywords.map((keyword) => (
    <Chip
      key={`active-sel-keyword-${keyword}`}
      label={keyword}
      onClick={() => handleDelete(keyword)}
      onDelete={() => handleDelete(keyword)}
      deleteIcon={<Delete />}
      variant="outlined"
    />
  ));

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ textAlign: "center", m: 2 }}>
          {t("Select the features of your process")}
        </DialogTitle>
        <DialogContent>
          <>
            <Box sx={{ textAlign: "center" }}>
              <label htmlFor="contained-button-file">
                <Input
                  inputProps={{ accept: "image/*" }}
                  id="contained-button-file"
                  type="file"
                  sx={{ display: "none" }}
                  // onChange={handleFileSelected}
                />
                {/* <IconButton component='span'>
                  <Avatar
                    src={logotype && logotype.path}
                    style={{
                      margin: '10px',
                      width: '60px',
                      height: '60px',
                    }}
                  />
                  {!logotype && (
                  <Typography variant='body1'>
                    {t('Click here to add a logo')}
                  </Typography>
                  )}
                </IconButton> */}
              </label>
              {/* {logotype && (
              <IconButton onClick={(event) => {
                setLogotype(null);
              }}
              >
                <Close />
              </IconButton>
              )} */}
            </Box>
            <Typography sx={{ mb: 1 }} variant="body1">
              {`${t(
                "Select the keywords that represent you type of co-production process"
              )}.`}
            </Typography>

            <Box sx={{ minWidth: 275, flexGrow: 1, p: 2 }}>
              <Card className="h-50 d-flex flex-column" variant="outlined">
                <CardContent>
                  <Grid container spacing={1}>
                    {listChipsKeywords}
                  </Grid>
                </CardContent>
              </Card>
            </Box>

            <Typography sx={{ textAlign: "center", m: 2 }} variant="body1">
              {t("Your Keywords")}
            </Typography>

            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={1}>
                    {listChipsSelectedKeywords}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            sx={{ my: 2 }}
            loading={loading}
            size="small"
            onClick={handleNext}
          >
            {t("Next")}
            <KeyboardArrowRight />
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <SelectGovernanceModel
        open={openGovernanceSelector}
        setOpen={setOpenGovernanceSelector}
        setOpenPreviousDialog={setOpen}
        loading={selectorGovTypeLoading}
        setLoading={setSelectorGovTypeLoading}
        categories={recomendedCategories}
      />
    </>
  );
}
