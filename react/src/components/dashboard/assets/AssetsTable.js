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
  Chip,
} from "@mui/material";
import { Close, MilitaryTech } from "@mui/icons-material";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Article, MoreVert as MoreVertIcon } from "@mui/icons-material";
import { InterlinkerDialog } from "components/dashboard/interlinkers";
import { useCustomTranslation } from "hooks/useDependantTranslation";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { InterlinkerReference } from "../interlinkers";
import CoproNotifications from "components/dashboard/coproductionprocesses/CoproNotifications";
import { useDispatch, useSelector } from "react-redux";
import { getCoproductionProcessNotifications } from "slices/general";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const { process } = useSelector((state) => state.process);
  console.log("-------------------> process");
  console.log(process);
  console.log("-------------------> process");
  const isGamification = process?.game_gamification_engine === "GAME";

  const { assetsList } = useSelector((state) => state.general);
  const [pageSize, setPageSize] = React.useState(5);

  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const largeDevice = useMediaQuery(theme.breakpoints.down("lg"));
  const xlargeDevice = useMediaQuery(theme.breakpoints.down("xl"));

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    //console.log(event);
  };

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
          renderCell: (params) => {
            return (
              <Avatar
                src={params.row.icon}
                sx={{ height: "30px", width: "30px" }}
              >
                {!params.row.icon && <Article />}
              </Avatar>
            );
          },
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
          renderCell: (params) => {
            //console.log(params.row);
            return (
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
            );
          },
        },
      ];
    } else {
      columns = [
        {
          field: "icon",
          headerName: "",
          sortable: false,
          flex: 0.05,
          renderCell: (params) => {
            return (
              <Avatar
                src={params.row.icon}
                sx={{ height: "30px", width: "30px" }}
              >
                {!params.row.icon && <Article />}
              </Avatar>
            );
          },
        },
        {
          field: "badge",
          headerName: t("Badge"),
          sortable: false,
          flex: 0.2,
          renderCell: (params) => {
            return <MilitaryTech color="black" tooltip="This is a badge" />;
          },
        },
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
          renderCell: (params) => {
            //console.log(params.row);
            return (
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
            );
          },
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
        renderCell: (params) => {
          return (
            <Avatar
              src={params.row.icon}
              sx={{ height: "30px", width: "30px" }}
            >
              {!params.row.icon && <Article />}
            </Avatar>
          );
        },
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
    let dataExtra = {};
    if (asset.type == "externalasset") {
    } else {
      //Add extra information needed:
      const backend = asset["software_response"]["backend"];
      dataExtra["link"] = backend + "/" + asset["external_asset_id"];

      const api_path = asset["software_response"]["api_path"];
      dataExtra["internal_link"] =
        "http://" + backend + api_path + "/" + asset["external_asset_id"];

      dataExtra["capabilities"] = {
        clone: asset["software_response"]["clone"],
        view: asset["software_response"]["view"],
        edit: asset["software_response"]["edit"],
        delete: asset["software_response"]["delete"],
        download: asset["software_response"]["download"],
      };

      dataExtra["softwareinterlinker"] = null;
      if (asset["software_response"]) {
        dataExtra["softwareinterlinker"] = {
          id: asset["software_response"]["id"],
          name: asset["software_response"]["name"],
          description: asset["software_response"]["description"],
          logotype_link: asset["software_response"]["logotype_link"],
        };
      }
    }
    //console.log("asset", asset);
    return {
      id: asset.id,
      icon: asset.internalData.icon,
      name: asset.internalData.name,
      updated: moment(asset.updated_at || asset.created_at).fromNow(),
      actions: getActions && getActions(asset),
      data: asset,
      dataExtra: dataExtra,
    };
  });

  const QuickSearchToolbar = () => {
    return (
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
  };

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
              columns={columns}
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
              disableRowSelectionOnClick={true}
              autoHeight
              onRowClick={(params) => {
                console.log("Clicked on row");
                let uriToOpen = "";
                console.log(params);

                if (params.row.data.type === "internalasset") {
                  console.log("internalasset");
                  console.log(
                    "---------------------`${params.row.dataExtra.link}/view`"
                  );
                  console.log(`${params.row.dataExtra.link}/view`);
                  uriToOpen = `${params.row.dataExtra.link}/view`;
                } else {
                  uriToOpen = params.row.data.uri;
                }
                // navigate with params (not in uri) new=1
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
