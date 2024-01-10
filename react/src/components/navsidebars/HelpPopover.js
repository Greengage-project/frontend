import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close, Help, OpenInNew } from "@mui/icons-material";
import { Component, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLanguage } from "translations/i18n";
import useSettings from "../../hooks/useSettings";

class Iframe extends Component {
  componentDidMount() {
    const element = document.getElementById("iframe");
    element.addEventListener("load", this.props.onLoad);
  }

  render() {
    return (
      <iframe
        id="iframe"
        src={this.props.src}
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      />
    );
  }
}

const HelpPopover = () => {
  const anchorRef = useRef(null);
  const { settings, saveSettings } = useSettings();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

  const ENVIRONMENTS = {
    "demo.greengage-project.eu": "OTHER",
    localhost: "OTHER",
  };

  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (settings) => {
    saveSettings(settings);
    setOpen(false);
  };

  const onLoad = function () {
    console.log("Iframe refreshed", openDialog, this);
  };

  return (
    <>
      {" "}
      <Tooltip title={t("Help")}>
        <IconButton
          color="inherit"
          ref={anchorRef}
          onClick={handleOpen}
          data-cy="help"
        >
          <Help fontSize="small" />
        </IconButton>
      </Tooltip>{" "}
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 200 },
        }}
      >
        {/* <Box sx={{ px: 4, justifyContent: "center", my: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.showHelp}
                color='primary'
                edge='start'
                name='showHelp'
                onChange={(event) => handleSave({ showHelp: event.target.checked })}
              />
            }
            label={t("Show contextual help")}
          />
        </Box>
          <Divider sx={{my: 1}}>{t("or")}</Divider> */}

        <Box sx={{ my: 2, mx: 2 }}>
          <Button
            startIcon={<OpenInNew />}
            fullWidth
            variant="text"
            onClick={() => window.open(`/docs/${getLanguage()}/`, "_blank")}
            data-cy="help_open_user_manual"
          >
            {t("Open user manual")}
          </Button>
        </Box>
        <Box sx={{ my: 2, mx: 2 }}>
          <Dialog maxWidth="xl" fullWidth open={openDialog !== null}>
            <DialogTitle sx={{ p: 0 }}>
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => setOpenDialog(null)}
                    aria-label="close"
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                    }}
                  >
                    <Close />
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    {openDialog && openDialog.title}
                  </Typography>
                </Toolbar>
              </AppBar>
            </DialogTitle>
            <DialogContent sx={{ height: "80vh" }}>
              <Iframe src={openDialog && openDialog.url} onLoad={onLoad} />
            </DialogContent>
          </Dialog>
          <Button
            startIcon={<OpenInNew />}
            fullWidth
            variant="text"
            onClick={() =>
              setOpenDialog({
                url: `https://docs.google.com/forms/d/e/1FAIpQLSdGGRUhx7IVkL88WPcpEsNhE1_j0wJQ0E3xLhccEW5gJ906Nw/viewform?usp=sf_link&entry.1527029454=${
                  ENVIRONMENTS[window.location.host]
                }`,
                title: t("Feedback form"),
              })
            }
            data-cy="help_open_feedback_form"
          >
            {t("Feedback form")}
          </Button>
        </Box>
        <Box sx={{ my: 2, mx: 2 }}>
          <Button
            startIcon={<OpenInNew />}
            fullWidth
            variant="text"
            onClick={() =>
              window.open(
                `https://docs.google.com/forms/d/e/1FAIpQLScTjgXDimcDtJ0qRI3erDOkXTq002-G-zI2QYVTLTMiugjCGw/viewform?usp=pp_url&entry.1527029454=${
                  ENVIRONMENTS[window.location.host]
                }`,
                "_blank"
              )
            }
            data-cy="help_open_support_form"
          >
            {t("Support form")}
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default HelpPopover;
