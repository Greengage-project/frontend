import React, { useState, useEffect } from "react"
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Snackbar,
  Alert,
  IconButton,
  Input,
  TextField,
  Typography,
  InputAdornment,
  Divider
} from "@mui/material"

import { CopyAll, Email, Person, Group } from "@mui/icons-material"

import { LoadingButton } from "@mui/lab"
import { useTranslation } from "react-i18next"
import { getLanguage, LANGUAGES } from "translations/i18n"
import { assetsApi, assignmentsApi } from "__api__"
import { REACT_APP_COMPLETE_DOMAIN } from "configuration"
import { useSelector } from "react-redux"
import useMounted from "hooks/useMounted"
import UserSearch from "./UserSearch"

export default function AssetsShare({
  open,
  setOpen,
  loading,
  setLoading,
  asset
}) {
  const { process, isAdministrator, selectedTreeItem } = useSelector(
    state => state.process
  )
  const [language, setLanguage] = useState(getLanguage())
  const [assetLink, setAssetLink] = useState("")
  const [subject, setSubject] = useState("")
  const [instructions, setInstructions] = useState("")

  const [openSnakbar, setOpenSnakbar] = React.useState(false)
  const { t } = useTranslation()
  const [listTeams, setListTeams] = useState([])

  const [checkboxValues, setCheckboxValues] = useState([])
  const [linkOptions, setLinkOptions] = useState([])
  const [singleuser, setSingleuser] = useState(null)
  const [showSingleUserOps, setShowSingleUserOps] = useState(false)
  const [showTeamOps, setShowTeamOps] = useState(false)
  const mounted = useMounted()

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const includedUsers = new Set(
    process.enabled_teams
      .map(team => team.users.map(user => user.id))
      .flat()
      .concat(process.administrators_ids)
  )

  const handleCheckboxChange = event => {
    const { value } = event.target
    const { checked } = event.target

    if (checked) {
      setCheckboxValues([...checkboxValues, value])
    } else {
      setCheckboxValues(checkboxValues.filter(v => v !== value))
    }
  }

  const handleLinkOptionsChange = event => {
    const { value, checked } = event.target

    if (checked) {
      setLinkOptions(prev => [...prev, value])
    } else {
      setLinkOptions(prev => prev.filter(v => v !== value))
    }
  }

  useEffect(() => {
    if (process && asset) {
      setAssetLink(
        `${REACT_APP_COMPLETE_DOMAIN}/dashboard/coproductionprocesses/${process.id}/${asset.id}/view`
      )
      setOpenSnakbar(false)
    }
    setLinkOptions(["assignmentAsLink"])
  }, [open])

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpenSnakbar(false)
  }

  const copyTextToClipboard = async text => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text)
    }
    return document.execCommand("copy", true, text)
  }

  const handleClose = () => {
    setSubject("")
    setInstructions("")
    setCheckboxValues([])
    setLinkOptions(["assignmentAsLink"])
    setOpen(false)
    setLoading(false)
    setSingleuser(null)
    setShowSingleUserOps(false)
    setShowTeamOps(false)
  }

  const handleCopyLink = () => {
    copyTextToClipboard(assetLink)
    setOpenSnakbar(true)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleShowSingleUserOps = () => {
    setShowSingleUserOps(true)
    setShowTeamOps(false)
  }

  const handleShowTeamsOps = () => {
    setShowSingleUserOps(false)
    setShowTeamOps(true)
  }

  const createAssignments_by_users = async (
    user_ids,
    asset_id,
    title,
    description
  ) => {
    const assignmentData = {
      users_id: user_ids,
      asset_id,
      task_id: selectedTreeItem.id,
      coproductionprocess_id: process.id,
      title,
      description,
      state: false
    }

    const assigmentsCreated = await assignmentsApi.createAssignmentsForUsers(
      assignmentData
    )

    return assigmentsCreated
  }

  const createAssignments_by_teams = async (
    team_ids,
    asset_id,
    title,
    description
  ) => {
    const assignmentData = {
      teams_id: team_ids,
      asset_id,
      task_id: selectedTreeItem.id,
      coproductionprocess_id: process.id,
      title,
      description,
      state: false
    }

    const assigmentsCreated = await assignmentsApi.createAssignmentsForTeams(
      assignmentData
    )
    return assigmentsCreated
  }

  const validateForm = () => {
    let valid = true

    if (instructions === "" || subject === "") {
      setIsError(true)
      setErrorMessage(
        t("Include a subject and instruction for the assignment.")
      )
      valid = false
    }
    if (valid) {
      setErrorMessage("")
      setIsError(false)
    }

    return valid
  }

  const handleNext = async () => {
    if (!validateForm()) {
      return
    }

    let assetLinkOp = ""
    if (linkOptions.includes("shareDirectLink")) {
      assetLinkOp = assetLink
    } else if (linkOptions.includes("assignmentAsLink")) {
      assetLinkOp = "assignmentPageLink"
    } else if (linkOptions.includes("linktoClaim")) {
      assetLinkOp = "linktoClaim"
    }

    if (singleuser) {
      const assigmentList = await createAssignments_by_users(
        [singleuser.id],
        asset.id,
        subject,
        instructions
      )

      if (linkOptions.includes("assignmentAsLink")) {
        assetLinkOp =
          assigmentList[0].link || assetLink || assigmentList[0].asset?.link
      } else if (linkOptions.includes("linktoClaim")) {
        assetLinkOp = assigmentList[0].link_to_claim
      }

      const dataToSend = {
        asset_id: asset.id,
        link: assetLinkOp,
        asset_name: asset.internalData.name,
        icon: asset.internalData.icon,
        subject,
        instructions,
        userTo: singleuser.id,
        resourceId: asset.id,
        taskName: selectedTreeItem.name,
        processId: process.id
      }

      assetsApi
        .emailAskUserContribution(dataToSend)
        .then(res => {
          handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      const assigmentList = await createAssignments_by_teams(
        checkboxValues,
        asset.id,
        subject,
        instructions
      )

      const assigmentDict = {}
      for (let i = 0; i < assigmentList.length; i++) {
        if (linkOptions.includes("assignmentAsLink")) {
          assigmentDict[assigmentList[i].user_id] = assigmentList[i].link
        } else if (linkOptions.includes("shareDirectLink")) {
          assigmentDict[assigmentList[i].user_id] = assetLink
        } else if (linkOptions.includes("linktoClaim")) {
          assigmentDict[assigmentList[i].user_id] =
            assigmentList[i].link_to_claim
        }
      }

      const dataToSend = {
        asset_id: asset.id,
        link: assetLinkOp,
        asset_name: asset.internalData.name,
        icon: asset.internalData.icon,
        subject,
        instructions,
        resourceId: asset.id,
        taskName: selectedTreeItem.name,
        listTeams: checkboxValues,
        processId: process.id,
        assigmentDict
      }

      assetsApi
        .emailAskTeamContribution(dataToSend)
        .then(res => {
          handleClose()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    const { permissions } = selectedTreeItem
    setListTeams([])

    const listTeamsTemporal = []

    for (let i = 0; i < permissions.length; i++) {
      const equipoTemp = permissions[i].team

      if (listTeamsTemporal.includes(equipoTemp)) {
      } else {
        listTeamsTemporal.push(equipoTemp)
      }
    }

    const listTeamsSet = new Set(listTeamsTemporal)
    setListTeams(Array.from(listTeamsSet))
  }, [asset])

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ textAlign: "left", m: 1 }}>
          <Typography color='primary' variant='h5'>
            {t("Share or assign options")}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <>
            <Box sx={{ textAlign: "center" }}>
              <label htmlFor='contained-button-file'>
                <Input
                  inputProps={{ accept: "image/*" }}
                  id='contained-button-file'
                  type='file'
                  sx={{ display: "none" }}
                />
              </label>
            </Box>
            {!(showSingleUserOps || showTeamOps) && (
              <>
                <Typography sx={{ mb: 1, fontWeight: "bold" }} variant='body1'>
                  {`1.- ${t(
                    "You may copy the link below and share it with your colleagues"
                  )}.`}
                </Typography>

                <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
                  <Input
                    id='standard-adornment-password'
                    type='text'
                    value={assetLink}
                    disabled
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleCopyLink}
                          onMouseDown={handleMouseDownPassword}
                        >
                          <CopyAll />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Divider sx={{ my: 2 }} />
              </>
            )}

            <Typography sx={{ mb: 1, fontWeight: "bold" }} variant='body1'>
              {`2.- ${t("You may send and email")}.`}
            </Typography>

            {!(showSingleUserOps || showTeamOps) && (
              <>
                <Box
                  sx={{
                    justifyContent: "center",
                    display: "flex",
                    mb: 2,
                    mt: 2,
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center"
                  }}
                >
                  <LoadingButton
                    sx={{ my: 2 }}
                    loading={loading}
                    size='large'
                    onClick={handleShowSingleUserOps}
                    color='primary'
                    variant='outlined'
                  >
                    {t("Single user")}
                    <Person sx={{ ml: 2 }} />
                  </LoadingButton>
                  <LoadingButton
                    sx={{ my: 2 }}
                    loading={loading}
                    size='large'
                    onClick={handleShowTeamsOps}
                    color='primary'
                    variant='outlined'
                  >
                    {t("Teams")}
                    <Group sx={{ ml: 2 }} />
                  </LoadingButton>
                </Box>
              </>
            )}

            <FormControl fullWidth sx={{ m: 1 }} variant='standard'>
              {checkboxValues.length == 0 ? (
                <>
                  {singleuser ? (
                    <></>
                  ) : (
                    <>
                      {showSingleUserOps && (
                        <>
                          <Typography
                            sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                            variant='body1'
                          >
                            {`${t("Enter the user email")}:`}
                          </Typography>

                          <UserSearch
                            alert={false}
                            importCsv={false}
                            onClick={user => {
                              setSingleuser(user)
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              {singleuser ? (
                <></>
              ) : (
                <>
                  {showTeamOps && (
                    <>
                      <Typography
                        sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                        variant='body1'
                      >
                        {`- ${t("Select the Teams")}:`}
                      </Typography>

                      <Typography sx={{ mt: 1, mb: 1 }} variant='body1'>
                        {`${t(
                          "If a user is included in multiple teams, the user only will receive one email"
                        )}.`}
                      </Typography>

                      <FormGroup>
                        {listTeams.length === 0 &&
                          `${t(
                            "No teams assigned to this task please assign a team to it"
                          )}.`}
                        {listTeams.length > 0 &&
                          listTeams.map(team => (
                            <>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked
                                    checked={checkboxValues.includes(team.id)}
                                    onChange={handleCheckboxChange}
                                    name={team.name}
                                    value={team.id}
                                  />
                                }
                                label={team.name}
                              />

                              <ul>
                                {team.users.length > 0 &&
                                  team.users.map(user => (
                                    <li>{user.full_name}</li>
                                  ))}
                              </ul>
                            </>
                          ))}
                      </FormGroup>
                    </>
                  )}
                </>
              )}

              {(showTeamOps || showSingleUserOps) && (
                <>
                  <Typography
                    sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                    variant='body1'
                  >
                    {`- ${t("Content included in the email")}:`}
                  </Typography>

                  <Typography sx={{ mt: 1, mb: 1 }} variant='body1'>
                    {`${t(
                      "You may add more information and instruction about the activity to perform"
                    )}:`}
                  </Typography>

                  {singleuser && (
                    <Typography
                      sx={{ mb: 1, mt: 1, fontWeight: "bold" }}
                      variant='body1'
                    >
                      {`${t("To")}: ${singleuser.full_name}`}
                    </Typography>
                  )}

                  <TextField
                    sx={{ mb: 3 }}
                    id='standard-basic'
                    label={t("Subject")}
                    variant='standard'
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />

                  <TextField
                    id='outlined-multiline-static'
                    label={t("Instructions")}
                    multiline
                    rows={4}
                    defaultValue='Default Value'
                    value={instructions}
                    onChange={e => setInstructions(e.target.value)}
                  />

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    sx={{ mt: 1, mb: 1, fontWeight: "bold" }}
                    variant='body1'
                  >
                    {`- ${t("Options to share")}:`}
                  </Typography>
                  <Typography sx={{ mt: 1, mb: 1 }} variant='body1'>
                    {`${t(
                      "You can choose one of the follow ways to share the link"
                    )}:`}
                  </Typography>

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          checked={linkOptions.includes("assignmentAsLink")}
                          onChange={handleLinkOptionsChange}
                          name='assignmentAsLink'
                          value='assignmentAsLink'
                        />
                      }
                      label={`${t(
                        "Send a link to access assignment and claim registration page"
                      )}.`}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          checked={linkOptions.includes("shareDirectLink")}
                          onChange={handleLinkOptionsChange}
                          name='shareDirectLink'
                          value='shareDirectLink'
                        />
                      }
                      label={`${t(
                        "Send a link with the direct access to the resource"
                      )}.`}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          checked={linkOptions.includes("linktoClaim")}
                          onChange={handleLinkOptionsChange}
                          name='linktoClaim'
                          value='linktoClaim'
                        />
                      }
                      label={`${t(
                        "Send a link to the claim submission form"
                      )}.`}
                    />
                  </FormGroup>
                </>
              )}
            </FormControl>

            <Snackbar
              open={openSnakbar}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity='success'
                sx={{ width: "100%" }}
              >
                {`${t("The link has been copied to the clipboard")}!`}
              </Alert>
            </Snackbar>
          </>
        </DialogContent>

        {(showSingleUserOps || showTeamOps) && (
          <DialogActions sx={{ justifyContent: "center" }}>
            {isError && (
              <Alert variant='outlined' severity='error' sx={{ m: 1 }}>
                {errorMessage}
              </Alert>
            )}
            <LoadingButton
              sx={{ my: 2 }}
              loading={loading}
              size='large'
              onClick={handleNext}
            >
              {t("Send email")}
              <Email sx={{ ml: 2 }} />
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>
    </>
  )
}
