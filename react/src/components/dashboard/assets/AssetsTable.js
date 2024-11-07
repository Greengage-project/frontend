import {
  Button,
  Dialog,
  DialogContent,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Close,
  MilitaryTech,
  Article,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { InterlinkerDialog } from "components/dashboard/interlinkers";
import { useCustomTranslation } from "hooks/useDependantTranslation";
import moment from "moment";
import React, { useState } from "react";
import { InterlinkerReference } from "../interlinkers";
import CoproNotifications from "components/dashboard/coproductionprocesses/CoproNotifications";
import { useDispatch, useSelector } from "react-redux";
import { getCoproductionProcessNotifications } from "slices/general";
import { useLocation } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/styles";

const MyMenuItem = ({ onClick, text, icon, id, loading }) => (
  <MenuItem aria-describedby={id} onClick={onClick}>
    <ListItemIcon>{loading === id ? <CircularProgress /> : icon}</ListItemIcon>
    <ListItemText>{text}</ListItemText>
  </MenuItem>
);

const Assets = ({ language, loading, getActions = null }) => {
  const [interlinkerDialogOpen, setInterlinkerDialogOpen] = useState(false);
  const [selectedInterlinker, setSelectedInterlinker] = useState(false);
  const [activitiesDialogOpen, setactivitiesDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();

  const { process } = useSelector((state) => state.process);
  const isGamification = process?.game_gamification_engine === "GAME";

  const { assetsList } = useSelector((state) => state.general);
  const [pageSize, setPageSize] = React.useState(5);

  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickHistory = (id) => {
    setactivitiesDialogOpen(true);
    dispatch(
      getCoproductionProcessNotifications({
        coproductionprocess_id: process.id,
        asset_id: id,
      })
    );
  };

  const t = useCustomTranslation(language);

  const location = useLocation();
  const isLocationCatalogue = location.pathname.startsWith("/stories/");

  let columns = [];

  if (!isLocationCatalogue) {
    if (mobileDevice) {
      columns = [
        {
          field: "icon",
          headerName: "",
          sortable: false,
          flex: 0.05,
          renderCell: (params) => (
            <Avatar
              src={params.row.icon}
              sx={{ height: "30px", width: "30px" }}
            >
              {!params.row.icon && <Article />}
            </Avatar>
          ),
        },
        {
          field: "name",
          headerName: t("Name"),
          flex: 1,
          headerAlign: "left",
        },

        {
          field: "history",
          sortable: false,
          headerName: t("History"),
          flex: 0.3,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              return handleClickHistory(params.row.id);
            };
            return (
              <Button variant="contained" onClick={onClick} color="primary">
                {t("Activities")}
              </Button>
            );
          },
        },
        {
          field: "actions",
          disablePadding: false,
          headerName: t("Actions"),
          sortable: false,
          flex: 0.15,
          renderCell: (params) => (
            <>
              <IconButton
                aria-label="settings"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setAnchorEl(event.currentTarget);
                  setSelectedRow(params.row.id);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open && selectedRow == params.row.id}
                onClose={handleClose}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {params.row.actions &&
                  params.row.actions.map(
                    ({ id, loading, onClick, text, icon }) => (
                      <MyMenuItem
                        key={id}
                        loading={loading}
                        id={id}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          onClick(handleClose);
                        }}
                        text={text}
                        icon={icon}
                      />
                    )
                  )}
              </Menu>
            </>
          ),
        },
      ];
    } else {
      columns = [
        {
          field: "icon",
          headerName: "",
          sortable: false,
          flex: 0.05,
          renderCell: (params) => (
            <Avatar
              src={params.row.icon}
              sx={{ height: "30px", width: "30px" }}
            >
              {!params.row.icon && <Article />}
            </Avatar>
          ),
        },
        process?.game_gamification_engine === "GAME"
          ? {
              field: "Gamified",
              headerName: t("Gamified"),
              sortable: false,
              flex: 0.2,
              renderCell: (params) => (
                <Tooltip title="This badge represents a gamified reward for your achievements!">
                  <MilitaryTech
                    color="black"
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </Tooltip>
              ),
            }
          : undefined,
        {
          field: "name",
          headerName: t("Name"),
          flex: 1,
          headerAlign: "left",
        },
        {
          field: "updated",
          disablePadding: false,
          headerAlign: "center",
          headerName: t("Updated"),
          flex: 0.3,
        },
        {
          field: "interlinker",
          disablePadding: false,
          headerAlign: "center",
          headerName: t("INTERLINKER"),
          flex: 0.5,
          renderCell: (params) => {
            {
              const showInterlinkerId =
                params.row.data &&
                (params.row.data.externalinterlinker_id ||
                  params.row.data.knowledgeinterlinker_id ||
                  params.row.data.softwareinterlinker_id);
              return showInterlinkerId ? (
                <InterlinkerReference
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setInterlinkerDialogOpen(true);
                    setSelectedInterlinker(showInterlinkerId);
                  }}
                  interlinker_id={showInterlinkerId}
                />
              ) : (
                t("external-resource")
              );
            }
          },
        },
        {
          field: "history",
          sortable: false,
          headerName: t("History"),
          flex: 0.3,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation();
              e.preventDefault();
              return handleClickHistory(params.row.id);
            };
            return (
              <Button variant="contained" onClick={onClick} color="primary">
                {t("Activities")}
              </Button>
            );
          },
        },
        {
          field: "actions",
          disablePadding: false,
          headerName: t("Actions"),
          sortable: false,
          flex: 0.15,
          renderCell: (params) => (
            <>
              <IconButton
                aria-label="settings"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setAnchorEl(event.currentTarget);
                  setSelectedRow(params.row.id);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open && selectedRow == params.row.id}
                onClose={handleClose}
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {params.row.actions &&
                  params.row.actions.map(
                    ({ id, loading, onClick, text, icon }) => (
                      <MyMenuItem
                        key={id}
                        loading={loading}
                        id={id}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          onClick(handleClose);
                        }}
                        text={text}
                        icon={icon}
                      />
                    )
                  )}
              </Menu>
            </>
          ),
        },
      ];
    }
  } else {
    columns = [
      {
        field: "icon",
        headerName: "",
        sortable: false,
        flex: 0.05,
        renderCell: (params) => (
          <Avatar src={params.row.icon} sx={{ height: "30px", width: "30px" }}>
            {!params.row.icon && <Article />}
          </Avatar>
        ),
      },
      {
        field: "name",
        headerName: t("Name"),
        flex: 1,
        headerAlign: "left",
      },
      {
        field: "interlinker",
        disablePadding: false,
        headerAlign: "center",
        headerName: t("INTERLINKER"),
        flex: 0.5,
        renderCell: (params) => {
          {
            const showInterlinkerId =
              params.row.data &&
              (params.row.data.externalinterlinker_id ||
                params.row.data.knowledgeinterlinker_id ||
                params.row.data.softwareinterlinker_id);
            return showInterlinkerId ? (
              <InterlinkerReference
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setInterlinkerDialogOpen(true);
                  setSelectedInterlinker(showInterlinkerId);
                }}
                interlinker_id={showInterlinkerId}
              />
            ) : (
              t("external-resource")
            );
          }
        },
      },
    ];
  }

  const rows = assetsList.map((asset) => {
    const dataExtra = {};
    if (asset.type == "externalasset") {
    } else {
      const { backend } = asset.software_response;
      dataExtra.link = `${backend}/${asset.external_asset_id}`;

      const { api_path } = asset.software_response;
      dataExtra.internal_link = `http://${backend}${api_path}/${asset.external_asset_id}`;

      dataExtra.capabilities = {
        clone: asset.software_response.clone,
        view: asset.software_response.view,
        edit: asset.software_response.edit,
        delete: asset.software_response.delete,
        download: asset.software_response.download,
      };

      dataExtra.softwareinterlinker = null;
      if (asset.software_response) {
        dataExtra.softwareinterlinker = {
          id: asset.software_response.id,
          name: asset.software_response.name,
          description: asset.software_response.description,
          logotype_link: asset.software_response.logotype_link,
        };
      }
    }
    return {
      id: asset.id,
      icon: asset.internalData.icon,
      name: asset.internalData.name,
      updated: moment(asset.updated_at || asset.created_at).fromNow(),
      actions: getActions && getActions(asset),
      data: asset,
      dataExtra,
    };
  });

  const QuickSearchToolbar = () => (
    <Box
      sx={{
        pl: 1,
        pr: 1,
        pb: 2,
        pt: 1,
        display: "flex",
      }}
    >
      <GridToolbarQuickFilter
        style={{ flex: 1 }}
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
        debounceMs={600}
      />
    </Box>
  );

  return (
    <>
      {!loading ? (
        <>
          <InterlinkerDialog
            language={language}
            open={interlinkerDialogOpen}
            setOpen={setInterlinkerDialogOpen}
            interlinker={selectedInterlinker}
          />
          {/* <Box sx={{ my: 2, mx: 10 }}>
            <SearchBox
              size='small'
              language={language}
              loading={loading}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </Box> */}
          <Box sx={{ my: 1, mx: 2 }}>
            <DataGrid
              rows={rows}
              columns={columns.filter((column) => column)}
              components={{
                Toolbar: QuickSearchToolbar,
              }}
              pageSize={pageSize}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              rowSelection={false}
              disableRowSelectionOnClick
              autoHeight
              onRowClick={(params) => {
                let uriToOpen = "";
                if (params.row.data.type === "internalasset") {
                  uriToOpen = `${params.row.dataExtra.link}/view`;
                } else {
                  uriToOpen = params.row.data.uri;
                }
                const gameId = process?.game_id;
                if (isGamification && gameId) {
                  uriToOpen = `/dashboard/gamification?taskId=${params?.row?.data?.task_id}&url=${uriToOpen}&assetId=${params?.row?.id}&coproductionprocessesId=${process?.id}`;
                } else {
                  uriToOpen = `/dashboard/contributionIframe?taskId=${params?.row?.data?.task_id}&url=${uriToOpen}&assetId=${params?.row?.id}&coproductionprocessesId=${process?.id}`;
                }
                window.open(uriToOpen, "_blank");
              }}
              localeText={{
                noRowsLabel: t("No assets found"),
              }}
            />
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}

      <Dialog
        open={activitiesDialogOpen}
        onClose={() => setactivitiesDialogOpen(false)}
      >
        <IconButton
          aria-label="close"
          onClick={() => setactivitiesDialogOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>

        <DialogContent sx={{ p: 3 }}>
          <CoproNotifications />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Assets;
