import {
  Autocomplete,
  List,
  Paper,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogContent,
  Alert,
  Avatar,
  Box,
  Switch,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Input,
  Stack,
  TextField as MuiTextField,
  Select,
  MenuItem,
  Typography,
  AppBar,
  Tab,
  Tabs as MuiTabs,
} from "@mui/material";
import {
  ViewList,
  AutoStories,
  Close,
  Delete,
  Download,
  Help,
  Public,
  CleaningServices,
  ContentCopy,
  Edit,
  Save,
  DownloadForOffline,
} from "@mui/icons-material";
import ConfirmationButton from "components/ConfirmationButton";
import { LoadingButton } from "@mui/lab";
import UsersList from "components/dashboard/organizations/UsersList";
import { Form, Formik } from "formik";
import { useCustomTranslation } from "hooks/useDependantTranslation";
import useMounted from "hooks/useMounted";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getProcess, updateProcess } from "slices/process";
import * as Yup from "yup";
import {
  coproductionProcessesApi,
  storiesApi,
  oldgamesApi,
  tagsApi,
  tasksApi,
} from "__api__";
import { withStyles } from "@mui/styles";
import { getSelectedStory, getTags } from "slices/general";
import { Link } from "react-router-dom";
import InterlinkAnimation from "components/home/InterlinkLoading";
import { styled } from "@mui/material/styles";
import Lightbox from "../../../../../components/Lightbox";
import CreateSchema from "components/dashboard/SchemaSelector";
import RewardSettings from "./RewardSettings";
import MakePublicDialog from "components/dashboard/coproductionprocesses/MakePublicDialog";
import { set } from "store";
import DownloadDialog from "./DownloadDialog";

const SettingsTab = () => {
  const [isCloning, setIsCloning] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [storiesList, setStoriesList] = useState([]);
  const [jsonPropertiesFile, setJsonPropertiesFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [openDialogSchema, setOpenDialogSchema] = useState(false);
  const [openDialogPublic, setOpenDialogPublic] = useState(false);
  const [selectedTab, setSelectedTab] = useState("0");
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [timeoutExceeded, setTimeoutExceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleCloseDialogSchema = () => {
    setOpenDialogSchema(false);
  };

  const handleCloseDialogPublic = () => {
    setOpenDialogPublic(false);
  };

  const handleSwitchEvent = () => {
    setIsPublic(!isPublic);
  };

  const handleOpenLightbox = () => {
    if (!process.game_id) {
      setIsLightboxOpen(true);
    }
    if (process.game_id) {
      changeRewarding(false);
    }
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const [dialogOpenPublicationExample, setDialogOpenPublicationExample] =
    useState(false);

  const { process, hasSchema, isAdministrator, tree } = useSelector(
    (state) => state.process
  );

  const [isIncentiveModuleActive, setIsIncentiveModuleActive] = useState(
    process.incentive_and_rewards_state
  );
  const [isGuideHidden, setIsGuideHidden] = useState(
    !process.hideguidechecklist
  );
  const [isPublic, setIsPublic] = useState(process.is_public);
  const [logotype, setLogotype] = useState(null);
  const mounted = useMounted();
  const t = useCustomTranslation(process.language);

  const { tags } = useSelector((state) => state.general);
  const [selectedTags, setSelectedTags] = useState([]);

  const [publishDialogOpen, setPublishDialogOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDownloading, setIsDownloading] = useState(false);

  const onCopy = async () => {
    setIsCloning(true);
    setTimeoutExceeded(false);

    const timeoutId = setTimeout(() => {
      setTimeoutExceeded(true);
    }, 15000);

    coproductionProcessesApi
      .copy(process.id, "Copy of ")
      .then(() => navigate("/dashboard/projects"))
      .catch((error) => {
        clearTimeout(timeoutId);
        console.error(error);
        setErrorMessage(`${t("Error while clonning")}.`);
        setIsError(true);
      })
      .finally(() => {
        setIsCloning(false);
      });
  };

  const onPublish = () => {
    setPublishDialogOpen(true);
  };

  const onDownload = () => {
    setShowDownloadDialog(true);
  };

  const onRemove = () => {
    coproductionProcessesApi
      .delete(process.id)
      .then(() => navigate("/dashboard/projects"));
  };
  const onCoproductionProcessClear = () => {
    coproductionProcessesApi
      .clearSchema(process.id)
      .then(() => dispatch(getProcess(process.id, false)));
  };

  const handleAdministratorAdd = (user) => {
    if (typeof user !== "undefined") {
      user instanceof Array ? (user = user[0]) : null;

      coproductionProcessesApi
        .addAdministrator(process.id, user.id)
        .then((res) => {
          if (mounted.current) {
            dispatch(getProcess(process.id, false));
          }
        });
    }
  };
  const handleAdministratorRemove = (user) => {
    coproductionProcessesApi
      .removeAdministrator(process.id, user.id)
      .then((res) => {
        if (mounted.current) {
          dispatch(getProcess(process.id, false));
        }
      });
  };

  const handleFileSelected = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (file) {
        file.path = URL.createObjectURL(file);
        setLogotype(file);
      }
    }
  };

  const handleOpenPublicationExample = () => {
    alert("Open Publication example!.");
    setDialogOpenPublicationExample(true);
  };

  const prepareGameTemplate = (tree) => {
    const taskList = [];
    for (const phase of tree) {
      for (const objective of phase.children) {
        for (const task of objective.children) {
          if (task.type === "task" && task.is_disabled === false) {
            taskList.push({
              id: task.id,
              management: task.management,
              development: task.development,
              exploitation: task.exploitation,
            });
          }
        }
      }
    }
    return taskList;
  };

  const TextField = (props) => (
    <>
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        color="primary"
      >
        {props.label}
      </Typography>
      <MuiTextField
        fullWidth
        minRows={props.minRows || 4}
        variant={editMode ? "filled" : "standard"}
        InputProps={{
          readOnly: !editMode,
        }}
        {...props}
        label={null}
        name={props.name}
      />
    </>
  );

  const changeRewarding = async (status, leaderboard) => {
    const values = {
      incentive_and_rewards_state: status,
      leaderboard,
    };
    if (values.incentive_and_rewards_state) {
      const taskList = prepareGameTemplate(tree);
      const res = await oldgamesApi.setGame(process.id, taskList);
      values.game_id = res.id;
    } else {
      oldgamesApi.deleteGame(process.id).then((res) => {
        dispatch(
          updateProcess({
            id: process.id,
            data: {
              game_id: null,
              game_gamification_engine: null,
              game_strategy: null,
            },
            logotype: false,
            onSuccess: false,
          })
        );
      });

      tree.forEach((phase) => {
        phase.children.forEach((objective) => {
          objective.children.forEach((task) => {
            if (task.status === "finished") {
              const updated_task = { ...task };
              updated_task.status = "in_progress";
              tasksApi.update(task.id, updated_task).then((res) => {});
            }
          });
        });
      });
    }

    try {
      dispatch(
        updateProcess({
          id: process.id,
          data: values,
          logotype,
          onSuccess: () => {
            if (mounted.current) {
            }
          },
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleGuideHide = async () => {
    if (isGuideHidden) {
      if (!hasSchema) {
        alert(t("To hide the guide checklist you must select a schema."));
        setOpenDialogSchema(true);
        return false;
      }
    }

    setIsGuideHidden((prev) => !prev);

    const values = { hideguidechecklist: isGuideHidden };

    try {
      dispatch(
        updateProcess({
          id: process.id,
          data: values,
          logotype,
          onSuccess: () => {
            if (mounted.current) {
              console.log(process);
            }
          },
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleIsPublic = async () => {
    if (isPublic) {
      setIsPublic(!isPublic);
      const values = { is_public: !isPublic };
      try {
        dispatch(
          updateProcess({
            id: process.id,
            data: values,
            logotype,
            onSuccess: () => {
              if (mounted.current) {
                console.log(process);
              }
            },
          })
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      setOpenDialogPublic(true);
    }
  };

  const GoldSwitch = withStyles({
    switchBase: {
      color: "#6f7598",
      "&$checked": {
        color: "#b2b200",
      },
      "&$checked + $track": {
        backgroundColor: "#b2b1a1",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const handleCapture = async ({ target }) => {
    setTimeoutExceeded(false);
    const fileReader = new FileReader();
    fileReader.readAsText(target.files[0]);
    fileReader.onload = (e) => {
      setIsPublishing(true);
      const extractedData1 = e.target.result;
      const extractedData = JSON.parse(extractedData1);
      setJsonPropertiesFile(extractedData);

      const timeoutId = setTimeout(() => {
        setTimeoutExceeded(true);
      }, 15000);

      coproductionProcessesApi
        .publish(
          process.id,
          "Catalogue Publication of_",
          "for_publication",
          extractedData
        )
        .then((res) => {
          setIsPublishing(false);
          navigate("/stories");
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          console.error(error);
          setErrorMessage(`${t("Error while publishing the story")}.`);
          setIsError(true);
        })
        .finally(() => {
          setIsPublishing(false);
        });
    };
  };

  useEffect(() => {
    storiesApi.getStoriesbyCopro(process.id).then((res) => {
      setStoriesList(res);
    });
    if (process.tags.length > 0) {
      setSelectedTags(process.tags);
    }
  }, []);

  const handleDeleteStory = (event, story_id) => {
    storiesApi.delete(story_id).then(() => {
      setStoriesList((storiesList) =>
        storiesList.filter((story) => story.id !== story_id)
      );
      navigate(`/dashboard/coproductionprocesses/${process.id}/settings`);
    });
  };

  const logoStyle = {
    width: "300px",
    height: "auto",
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const onSelect = (value) => {
    if (mounted.current) {
      setSelectedTab(value);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} xs={12} />

          <AppBar
            position="static"
            sx={{
              color: "white",
            }}
          >
            <MuiTabs
              indicatorColor="secondary"
              onChange={(event, value) => onSelect(value)}
              value={selectedTab}
              variant="scrollable"
              textColor="inherit"
              aria-label="Coproduction phases tabs"
              sx={{
                "& .Mui-selected": {
                  background: "#a4cbd8",
                  color: "black",
                },
                "& .MuiTabs-flexContainer": {
                  "justify-content": "center",
                },
              }}
            >
              <Tab key="1" label={t("Info")} value="0" />
              <Tab key="2" label={t("Admins")} value="1" />
              <Tab key="3" label={t("Actions")} value="2" />
              <Tab key="4" label={t("Extra")} value="3" />
            </MuiTabs>
          </AppBar>
        </Grid>
      </Box>
      <Box style={{ minHeight: "87vh", backgroundColor: "background.default" }}>
        <CardHeader
          avatar={
            editMode ? (
              <label htmlFor="contained-button-file">
                <Input
                  inputProps={{ accept: "image/*" }}
                  id="contained-button-file"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={handleFileSelected}
                />
                <IconButton component="span" color="inherit">
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      position: "relative",
                    }}
                  >
                    <Avatar
                      src={logotype ? logotype.path : process.logotype_link}
                      variant="rounded"
                      style={{
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                      }}
                    />
                    <Edit
                      style={{
                        width: "50%",
                        height: "50%",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                </IconButton>
              </label>
            ) : (
              <Avatar
                src={process.logotype_link}
                variant="rounded"
                style={{
                  margin: "10px",
                  width: "100px",
                  height: "100px",
                }}
              />
            )
          }
          title={
            <Stack justifyContent="center" spacing={1}>
              <Typography variant="subtitle1">
                <b>{t("Created")}:</b> {moment(process.created_at).format("LL")}
              </Typography>
              {process.updated_at && (
                <Typography variant="subtitle1">
                  <b>{t("Last update")}:</b>{" "}
                  {moment(process.updated_at).format("LLL")}
                </Typography>
              )}
            </Stack>
          }
        />

        <Box sx={{ mx: 4 }}>
          {selectedTab === "0" && (
            <>
              <Grid
                container
                direction="row"
                justifyContent="right"
                spacing={2}
              >
                {!editMode && isAdministrator && (
                  <Button
                    sx={{ mb: 3, justifyContent: "right", textAlign: "center" }}
                    variant="contained"
                    color="primary"
                    onClick={() => setEditMode(true)}
                    startIcon={<Edit />}
                  >
                    {t("Edit coproduction process")}
                  </Button>
                )}
              </Grid>

              <Formik
                initialValues={{
                  name: process.name || "",
                  status: process.status || "",
                  description: process.description || "",
                  organization_desc: process.organization_desc || "",
                  tags: process.tags || [],
                  aim: process.aim || "",
                  idea: process.idea || "",
                  challenges: process.challenges || "",
                  submit: null,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required(t("Required")),
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting }
                ) => {
                  for (const tag of values.tags) {
                    if (!tag.id) {
                      await tagsApi
                        .createbyName({ name: tag })
                        .then((res) => {
                          if (res.status === 200) {
                            values.tags.splice(
                              values.tags.indexOf(tag),
                              1,
                              res.data
                            );
                          }
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                    }
                  }
                  try {
                    dispatch(
                      updateProcess({
                        id: process.id,
                        data: values,
                        logotype,
                        onSuccess: () => {
                          if (mounted.current) {
                            setEditMode(false);
                            setStatus({ success: true });
                            setSubmitting(false);
                          }
                        },
                      })
                    );
                  } catch (err) {
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  submitForm,
                  isSubmitting,
                  setFieldValue,
                  setFieldTouched,
                  resetForm,
                  touched,
                  isValid,
                  values,
                }) => (
                  <Form>
                    <Grid
                      container
                      direction="row"
                      justifyContent="right"
                      spacing={2}
                    >
                      {editMode && (
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ justifyContent: "right", mt: 3, mb: 2 }}
                        >
                          <Button
                            variant="contained"
                            disabled={isSubmitting}
                            color="warning"
                            size="medium"
                            startIcon={<Delete />}
                            onClick={() => {
                              setEditMode(false);
                              resetForm();
                              setLogotype(null);
                            }}
                          >
                            {t("Cancel")}
                          </Button>
                          <Button
                            variant="contained"
                            disabled={isSubmitting}
                            color="success"
                            size="large"
                            startIcon={<Save />}
                            onClick={submitForm}
                            disabled={!isValid}
                          >
                            {t("Save")}
                          </Button>
                        </Stack>
                      )}
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Grid item xs={4}>
                        <TextField
                          label={t("NAME OF THE PROJECT")}
                          helperText={touched.name && errors.name}
                          error={Boolean(touched.name && errors.name)}
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="name"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        container
                        direction="row"
                        justifyContent="flex-start"
                      >
                        <Typography
                          variant="overline"
                          sx={{ color: "primary.main" }}
                        >
                          {t("STATE OF THE PROYECT")}
                        </Typography>
                        <Select
                          labelId="select-status-label"
                          id="status"
                          value={values.status}
                          onChange={handleChange}
                          fullWidth
                          label={t("STATE OF THE PROYECT")}
                          helperText={touched.status && errors.status}
                          error={Boolean(touched.status && errors.status)}
                          onBlur={handleBlur}
                          name="status"
                          variant={editMode ? "filled" : "standard"}
                          inputProps={{ readOnly: !editMode }}
                        >
                          <MenuItem value="in_progress">
                            {t("In progress")}
                          </MenuItem>
                          <MenuItem value="finished">{t("Finished")}</MenuItem>
                        </Select>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        container
                        direction="row"
                        justifyContent="flex-start"
                      >
                        <Autocomplete
                          multiple
                          fullWidth
                          selectOnFocus
                          handleHomeEndKeys
                          openOnFocus
                          clearOnBlur
                          freeSolo
                          id="autocomplete-tags"
                          readOnly={!editMode}
                          value={values.tags}
                          options={tags}
                          noOptionsText="Enter to create a new option"
                          getOptionLabel={(tag) => {
                            if (typeof tag === "string") {
                              return tag;
                            }
                            if (tag.inputValue) {
                              return tag.inputValue;
                            }
                            return tag.name;
                          }}
                          onChange={(event, newValue) => {
                            if (typeof newValue === "string") {
                              setSelectedTags({
                                name: newValue,
                              });
                            } else if (newValue && newValue.inputValue) {
                              setSelectedTags({
                                name: newValue.inputValue,
                              });
                            } else {
                              setSelectedTags(newValue);
                            }
                            setFieldValue("tags", newValue);
                          }}
                          renderOption={(props, tag) => (
                            <li {...props}>{tag.name}</li>
                          )}
                          renderInput={(params) => (
                            <TextField {...params} label={t("TAGS")} />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          minRows={8}
                          label={t("SHORT DESCRIPTION OF THE PROJECT")}
                          multiline
                          helperText={touched.description && errors.description}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          value={values.description}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="description"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          minRows={8}
                          label={t("ACTUAL ORGANIZATION OF THE SERVICE")}
                          multiline
                          helperText={
                            touched.organization_desc &&
                            errors.organization_desc
                          }
                          error={Boolean(
                            touched.organization_desc &&
                              errors.organization_desc
                          )}
                          value={values.organization_desc}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="organization_desc"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          minRows={8}
                          label={t("AIM OF THE PROJECT")}
                          multiline
                          helperText={touched.aim && errors.aim}
                          error={Boolean(touched.aim && errors.aim)}
                          value={values.aim}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="aim"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          minRows={8}
                          label={t("IDEA OF SERVICE TO BE CO-DELIVERED")}
                          multiline
                          helperText={touched.idea && errors.idea}
                          error={Boolean(touched.idea && errors.idea)}
                          value={values.idea}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="idea"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <TextField
                          minRows={8}
                          label={t("CHALLENGES OF THE PROJECT")}
                          multiline
                          helperText={touched.challenges && errors.challenges}
                          error={Boolean(
                            touched.challenges && errors.challenges
                          )}
                          value={values.challenges}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="challenges"
                        />
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </>
          )}

          {/* Show the Resources Tab */}
          {selectedTab === "1" && (
            <Card sx={{ border: "1px solid red", p: 5, my: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                {t("Administrators of the coproduction process")}
              </Typography>
              <Alert severity="error" sx={{ my: 2 }}>
                {t(
                  "Administrators of a coproduction process can edit the coproduction tree"
                )}
              </Alert>
              <UsersList
                size="small"
                onSearchResultClick={isAdministrator && handleAdministratorAdd}
                users={process.administrators}
                getActions={(user) =>
                  isAdministrator && [
                    {
                      id: `${user.id}-remove-action`,
                      onClick: handleAdministratorRemove,
                      text: t("Remove {{what}}"),
                      icon: <Delete />,
                      disabled: process.administrators_ids.length === 1,
                    },
                  ]
                }
              />
            </Card>
          )}
          {selectedTab === "2" && (
            <>
              <Card sx={{ border: "1px solid red", p: 5, my: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                  {t("Clear coproduction process tree")}
                </Typography>
                <Alert
                  severity="error"
                  sx={{ mt: 2 }}
                  action={
                    <ConfirmationButton
                      Actionator={({ onClick }) => (
                        <Button
                          variant="contained"
                          disabled={!isAdministrator || !hasSchema}
                          color="error"
                          onClick={onClick}
                          startIcon={<CleaningServices />}
                        >
                          {t("Clear coproduction process tree")}
                        </Button>
                      )}
                      ButtonComponent={({ onClick }) => (
                        <Button
                          sx={{ mt: 1 }}
                          fullWidth
                          variant="contained"
                          color="error"
                          onClick={onClick}
                        >
                          {t("Confirm deletion")}
                        </Button>
                      )}
                      onClick={onCoproductionProcessClear}
                      text={t("Are you sure?")}
                    />
                  }
                >
                  {t("The clearing of the co-production tree is irreversible")}
                </Alert>

                <Box sx={{ mt: 2 }} />
              </Card>
              <Card sx={{ border: "1px solid red", p: 5, my: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                  {t("Delete coproduction process")}
                </Typography>
                <Alert
                  severity="error"
                  sx={{ mt: 2 }}
                  action={
                    <ConfirmationButton
                      Actionator={({ onClick }) => (
                        <Button
                          variant="contained"
                          disabled={!isAdministrator}
                          color="error"
                          onClick={onClick}
                          startIcon={<Delete />}
                        >
                          {t("Remove coproduction process")}
                        </Button>
                      )}
                      ButtonComponent={({ onClick }) => (
                        <Button
                          sx={{ mt: 1 }}
                          fullWidth
                          variant="contained"
                          color="error"
                          onClick={onClick}
                        >
                          {t("Confirm deletion")}
                        </Button>
                      )}
                      onClick={onRemove}
                      text={t("Are you sure?")}
                    />
                  }
                >
                  {t(
                    "The deletion of the coproduction process is irreversible"
                  )}
                </Alert>
              </Card>
            </>
          )}

          {!process.is_part_of_publication && (
            <>
              {/* Cloning coprod */}
              {selectedTab === "2" && (
                <>
                  <Card sx={{ border: "1px solid red", p: 5, my: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                      {t("Clone coproduction process")}
                    </Typography>

                    <Alert
                      severity="warning"
                      sx={{ mt: 3 }}
                      action={
                        <ConfirmationButton
                          Actionator={({ onClick }) => (
                            <LoadingButton
                              variant="contained"
                              disabled={!isAdministrator}
                              loading={isCloning}
                              color="warning"
                              onClick={onClick}
                              startIcon={<ContentCopy />}
                            >
                              {t("Clone coproduction process")}
                            </LoadingButton>
                          )}
                          ButtonComponent={({ onClick }) => (
                            <Button
                              sx={{ mt: 1 }}
                              fullWidth
                              variant="contained"
                              color="warning"
                              onClick={onClick}
                            >
                              {t("Confirm clonation")}
                            </Button>
                          )}
                          onClick={onCopy}
                          text={t("Are you sure?")}
                        />
                      }
                    >
                      {t(
                        "The clonation of the coproduction process will create"
                      )}
                    </Alert>
                    {isError && (
                      <Alert variant="outlined" severity="error" sx={{ m: 1 }}>
                        {errorMessage}
                      </Alert>
                    )}
                  </Card>

                  {/* Publish Coproduction Process */}
                  <Card sx={{ border: "1px solid red", p: 5, my: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                      {t("Publish coproduction process")}
                    </Typography>

                    <Alert
                      severity="warning"
                      sx={{ mt: 3 }}
                      action={
                        <LoadingButton
                          variant="contained"
                          disabled={!isAdministrator}
                          loading={isPublishing}
                          color="warning"
                          onClick={onPublish}
                          startIcon={<Public />}
                        >
                          {t("Publish coproduction process")}
                        </LoadingButton>
                      }
                    >
                      {t(
                        "The publication of the coproduction process will make"
                      )}
                    </Alert>
                    {isError && (
                      <Alert variant="outlined" severity="error" sx={{ m: 1 }}>
                        {errorMessage}
                      </Alert>
                    )}
                  </Card>

                  {/* Download co-production process */}
                  <Card sx={{ border: "1px solid red", p: 5, my: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                      {t("Download the process")}
                    </Typography>
                    <Alert
                      severity="warning"
                      sx={{ mt: 3 }}
                      action={
                        <LoadingButton
                          variant="contained"
                          disabled={!isAdministrator}
                          loading={isPublishing}
                          color="info"
                          onClick={onDownload}
                          startIcon={<DownloadForOffline />}
                        >
                          {t("Download coproduction process")}
                        </LoadingButton>
                      }
                    >
                      {`${t(
                        "This option lets you download the structure of the co"
                      )}.`}
                    </Alert>
                  </Card>

                  {/* Show Process Guide */}
                  <Card sx={{ border: "1px solid #b2b200", p: 5, my: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                      {t("Show process startup guide")}
                    </Typography>
                    <Alert
                      severity="info"
                      sx={{ mt: 2 }}
                      action={
                        <>
                          <GoldSwitch
                            checked={isGuideHidden}
                            onChange={toggleGuideHide}
                            name="guideSwitch"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            disabled={!isAdministrator}
                            color="secondary"
                          />
                        </>
                      }
                    >
                      {`${t(
                        "This option will show the process startup guide to all users"
                      )}.`}
                    </Alert>
                  </Card>

                  <Card sx={{ border: "1px solid #b2b200", p: 5, my: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                      {t("Open the process to new collaborators")}
                    </Typography>
                    <Alert
                      severity="info"
                      sx={{ mt: 2 }}
                      action={
                        <>
                          <GoldSwitch
                            checked={isPublic}
                            onChange={toggleIsPublic}
                            name="publicSwitch"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            disabled={!isAdministrator}
                            color="secondary"
                          />
                        </>
                      }
                    >
                      {`${t(
                        "This option will allow new collaborators to join the process"
                      )}.`}
                    </Alert>
                  </Card>
                </>
              )}

              {selectedTab === "3" && (
                <>
                  {/* Reward */}
                  <Card sx={{ border: "1px solid #b2b200", p: 5, my: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0 }}>
                      {t("Reward system")}
                    </Typography>
                    <Alert
                      severity="info"
                      sx={{ mt: 2 }}
                      action={
                        <>
                          <Button
                            disabled={!isAdministrator}
                            variant="contained"
                            color={process.game_id ? "error" : "success"}
                            onClick={handleOpenLightbox}
                            data-cy="reward-button"
                          >
                            {process.game_id ? t("Deactivate") : t("Settings")}
                          </Button>
                        </>
                      }
                    >
                      {t(
                        "If you disable the Reward system every data will be deleted"
                      )}
                    </Alert>
                    <div>
                      {isLightboxOpen && (
                        <Lightbox onClose={handleCloseLightbox}>
                          <RewardSettings
                            onClose={handleCloseLightbox}
                            activateReward={(leaderboard) => {
                              changeRewarding(true, leaderboard);
                            }}
                            coproductionProcessId={process?.id}
                          />
                        </Lightbox>
                      )}
                    </div>
                  </Card>
                </>
              )}
            </>
          )}
        </Box>

        <Dialog
          open={publishDialogOpen}
          onClose={() => {
            setPublishDialogOpen(false);
            setIsPublishing(false);
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => {
              setPublishDialogOpen(false);
              setIsPublishing(false);
            }}
            sx={{
              position: "absolute",
              right: 4,
              top: 4,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>

          <DialogContent sx={{ p: 3 }}>
            {storiesList && (
              <List>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  {t("Publications")}:
                </Typography>
                {storiesList.map((story) => {
                  const fechaStoryDate = new Date(story.created_at);
                  const fechaStoryText = fechaStoryDate.toUTCString();

                  return (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={(event) => {
                            dispatch(getSelectedStory(story.id));

                            navigate(`/stories/${story.id}/overview`);
                          }}
                        >
                          <ListItemIcon>
                            <AutoStories />
                          </ListItemIcon>
                          <ListItemText primary={fechaStoryText} />
                        </ListItemButton>

                        <ConfirmationButton
                          Actionator={({ onClick }) => (
                            <Button
                              variant="outlined"
                              disabled={!isAdministrator}
                              color="error"
                              onClick={onClick}
                              startIcon={<Delete />}
                            >
                              {t("Delete")}
                            </Button>
                          )}
                          ButtonComponent={({ onClick }) => (
                            <Button
                              sx={{ mt: 1 }}
                              fullWidth
                              variant="contained"
                              color="error"
                              onClick={onClick}
                              value={story.id}
                            >
                              {t("Confirm deletion")}
                            </Button>
                          )}
                          onClick={(e) => {
                            handleDeleteStory(e, story.id);
                          }}
                          text={t("Are you sure?")}
                        />
                      </ListItem>

                      <Divider />
                    </>
                  );
                })}
              </List>
            )}

            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                {t("New Publication of a Success Story")}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                  <Typography variant="p" sx={{ mt: 3 }}>
                    {t("Include the source file to publish information")}
                  </Typography>

                  <Typography variant="p" sx={{ mt: 3 }}>
                    {t("Example file:")}
                  </Typography>

                  <Link
                    to="/static/story/ExampleTemplate.json"
                    target="_blank"
                    download
                  >
                    <Download sx={{ ml: 1 }} />{" "}
                  </Link>
                </Grid>

                <Grid item xs={6} md={4}>
                  <Stack direction="row" spacing={0}>
                    <LoadingButton
                      variant="contained"
                      disabled={!isAdministrator}
                      loading={isPublishing}
                      component="label"
                      startIcon={<ViewList />}
                      sx={{
                        mb: 3,
                        justifyContent: "right",
                        textAlign: "center",
                      }}
                    >
                      {t("Publish from file")}
                      <input
                        type="file"
                        accept=".json"
                        hidden
                        onChange={handleCapture}
                      />
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </>
          </DialogContent>
        </Dialog>

        <Dialog open={isPublishing} onClose={() => setIsPublishing(false)}>
          <IconButton
            aria-label="close"
            onClick={() => setIsPublishing(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>

          <DialogContent
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack spacing={2} sx={{ width: "100%", alignItems: "center" }}>
              <Item>
                <div style={logoStyle}>
                  <InterlinkAnimation />
                </div>
              </Item>
              <Item>
                <div>{`${t("Publishing the Story please wait")}.`}</div>
              </Item>
              <Item>
                <div>{`${t("The process could last some minutes")}.`}</div>
              </Item>
              {timeoutExceeded && (
                <Item>
                  <div style={{ color: "blue" }}>
                    {`${t(
                      "The process of publishing a story can take a long time"
                    )}.`}
                  </div>
                </Item>
              )}
            </Stack>
          </DialogContent>
        </Dialog>

        <Dialog open={isCloning} onClose={() => setIsCloning(false)}>
          <IconButton
            aria-label="close"
            onClick={() => setIsCloning(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>

          <DialogContent
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack spacing={2} sx={{ width: "100%", alignItems: "center" }}>
              <Item>
                <div style={logoStyle}>
                  <InterlinkAnimation />
                </div>
              </Item>
              <Item>
                <div>{`${t("Cloning the project please wait")}.`}</div>
              </Item>
              <Item>
                <div>{`${t("The process could last some minutes")}.`}</div>
              </Item>

              {timeoutExceeded && (
                <Item>
                  <div style={{ color: "red" }}>
                    {`${t(
                      "The process of creating a clone of an entire process can"
                    )}.`}
                  </div>
                </Item>
              )}
            </Stack>
          </DialogContent>
        </Dialog>

        <Dialog open={isDownloading}>
          <DialogContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Item>
                <div style={logoStyle}>
                  <InterlinkAnimation />
                </div>
              </Item>
              <Item>
                <div>{t("Downloading the process please wait.")}</div>
              </Item>
              <Item>
                <div>{t("This process could last some minutes.")}</div>
              </Item>
            </Stack>
          </DialogContent>
        </Dialog>

        <DownloadDialog
          open={showDownloadDialog}
          handleClose={() => setShowDownloadDialog(false)}
          title={t("Downloading Process")}
        />

        {!hasSchema && (
          <Dialog
            open={openDialogSchema}
            onClose={handleCloseDialogSchema}
            fullWidth
            maxWidth="xl"
          >
            <Box sx={{ minHeight: "93vh" }}>
              <CreateSchema />
            </Box>
          </Dialog>
        )}

        <MakePublicDialog
          open={openDialogPublic}
          handleClose={handleCloseDialogPublic}
          switchEvent={handleSwitchEvent}
        />
      </Box>
    </>
  );
};

export default SettingsTab;
