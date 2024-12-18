import {
  Alert,
  Avatar,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Button,
  Snackbar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import useDependantTranslation from "hooks/useDependantTranslation";
import useMounted from "hooks/useMounted";
import { useEffect, useRef, useState } from "react";
import { usersApi } from "__api__";
import Papa from "papaparse";
import { ExportToCsv } from "export-to-csv";

const UserSearch = ({
  exclude = [],
  onClick,
  showTemporalMessage = null,
  organization_id = null,
  alert = true,
  importCsv = true,
  error = false,
  onBulk = false,
  include = [],
}) => {
  const [loading, setLoading] = useState(false);
  const mounted = useMounted();
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const { t } = useDependantTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const textInput = useRef(null);
  const [fileParsedMsn, setFileParsedMsn] = useState(false);
  const [mailErrors, setMailErrors] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenParseMsn = () => {
    setFileParsedMsn(true);
  };

  const handleCloseParseMsn = () => {
    setFileParsedMsn(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const downloadExampleFile = () => {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      filename: "example",
      useTextFile: false,
      useBom: true,
    };
    const csvExporter = new ExportToCsv(options);
    const data = [
      {
        email: "example1@example.com",
      },
      {
        email: "example2@example.com",
      },
    ];
    csvExporter.generateCsv(data);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    if (open && textInput.current) {
      textInput.current.focus();
    }
  }, [open]);

  useEffect(() => {
    let delayDebounceFn;
    if (mounted && inputValue) {
      setLoading(true);
      delayDebounceFn = setTimeout(() => {
        usersApi
          .search(inputValue, organization_id)
          .then((res) => {
            if (mounted.current) {
              setSearchResults(res);
              setOpen(true);
            }
          })
          .catch(() => {
            if (mounted.current) {
              setSearchResults([]);
            }
          })
          .finally(() => {
            if (mounted.current) {
              setLoading(false);
            }
          });
      }, 3500);
    }
    return () => {
      clearTimeout(delayDebounceFn);
      setLoading(false);
    };
  }, [mounted, inputValue]);

  const parseFile = (evt) => {
    if (!(evt.target && evt.target.files && evt.target.files[0])) {
      return;
    }
    const options = {
      fieldSeparator: ",",
      decimalSeparator: ".",
      showLabels: false,
      filename: "Rejected mails",
      useTextFile: false,
      useBom: true,
      headers: ["mails"],
    };

    const csvExporter = new ExportToCsv(options);
    const rejected_users = [];
    Papa.parse(evt.target.files[0], {
      header: false,
      skipEmptyLines: true,
      async complete(results) {
        const new_users = [];
        for (const u of results.data) {
          const res = await usersApi.search(u);

          if (res.length > 0) {
            if (!exclude.includes(res[0].id)) {
              exclude.push(res[0].id);
              if (!onBulk) {
                onClick(res[0]);
              } else {
                new_users.push(res[0]);
              }
            }
          } else {
            rejected_users.push(u);
          }
        }
        if (onBulk) {
          onClick(new_users);
        }

        if (rejected_users.length > 0) {
          setMailErrors(true);
          console.log(rejected_users);
          csvExporter.generateCsv(rejected_users);
        }
        handleOpenParseMsn();
      },
    });
  };

  return (
    <>
      {/* Snackbar that informs about mail parsing */}
      <Snackbar
        open={fileParsedMsn}
        autoHideDuration={6000}
        onClose={handleCloseParseMsn}
      >
        {mailErrors ? (
          <Alert onClose={handleCloseParseMsn} severity="warning">
            {t(
              "Some of the users could not be added. Check the csv file with the rejected mails"
            )}
          </Alert>
        ) : (
          <Alert onClose={handleCloseParseMsn} severity="success">
            {t("All the users have been added successfully")}
          </Alert>
        )}
      </Snackbar>

      {/* Dialog that provides help about csv format */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("E-mail file fomating")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t(
              "The file must be a CSV file with one column containing all the mails to be added. Here you can download an example file."
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={downloadExampleFile}>{t("Download example")}</Button>
          <Button onClick={handleCloseDialog} autoFocus>
            {t("Okay")}
          </Button>
        </DialogActions>
      </Dialog>
      {alert && (
        <Alert severity="warning" data-cy="warning-userSearch-only-registered">
          {t("Only registered users can be added")}
        </Alert>
      )}

      <TextField
        error={error}
        sx={{ mt: 1 }}
        variant="standard"
        fullWidth
        value={inputValue}
        inputRef={textInput}
        onChange={(event) => {
          setOpen(false);
          setInputValue(event.target.value);
          handleClick(event);
        }}
        id="outlined-basic"
        label={t("Type here to add users")}
        data-cy="add-user-input"
      />
      {loading && <LinearProgress />}
      {importCsv && (
        <>
          <Button sx={{ mt: 2 }} variant="contained" component="label">
            {t("Import from CSV")}
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={parseFile}
              data-cy="import-csv-button"
            />
          </Button>
          <IconButton sx={{ mt: 2 }} color="primary" onClick={handleOpenDialog}>
            <Info />
          </IconButton>
        </>
      )}
      {open && (
        <Paper>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {searchResults.length === 0 ? (
              <MenuItem disabled>
                {t("No results. Try to type the complete email of the user")}
              </MenuItem>
            ) : (
              open &&
              searchResults.slice(0, 4).map((user) => {
                if (include.length > 0 && include.includes(user.id)) {
                  return null;
                }

                const alreadySelected = exclude.includes(user.id);
                return (
                  <MenuItem
                    key={user.id}
                    disabled={alreadySelected}
                    onClick={(event) => {
                      onClick(user);
                      if (showTemporalMessage !== null) {
                        showTemporalMessage();
                      }
                      setInputValue("");
                      handleClose();
                    }}
                    data-cy={`add-user-${user.email}`}
                  >
                    <Avatar
                      sx={{ mr: 2, height: 30, width: 30 }}
                      src={user.picture}
                    />
                    {user.full_name +
                      (alreadySelected ? ` (${t("already added")})` : "")}
                  </MenuItem>
                );
              })
            )}
          </Menu>
        </Paper>
      )}
    </>
  );
};

export default UserSearch;
