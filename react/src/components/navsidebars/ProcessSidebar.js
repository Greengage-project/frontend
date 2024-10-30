import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Skeleton,
  Stack,
  Typography,
  Popover,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  SavedSearch,
  AccountTree,
  ArrowBack,
  Dashboard,
  Folder,
  Group as GroupIcon,
  Settings,
  Timeline,
  Leaderboard,
  MilitaryTech,
  Newspaper,
} from "@mui/icons-material";
import { StatusChip } from "components/Icons";
import useDependantTranslation from "hooks/useDependantTranslation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { LANGUAGES } from "translations/i18n";
import NavSection from "../NavSection";
import Scrollbar from "../Scrollbar";

const ProcessSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const { process, hasSchema, loading, updating } = useSelector(
    (state) => state.process
  );
  const navigate = useNavigate();
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const processId = process?.id;
  const gameId = process?.game_id;
  const gameStrategy = process?.game_strategy;
  const [anchorElGamification, setAnchorElGamification] = useState(null);

  const { t } = useDependantTranslation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  let sections = [];

  if (process) {
    if (process.is_part_of_publication) {
      sections = [
        {
          title: "",
          items: [
            {
              title: t("Guide"),
              path: `/dashboard/coproductionprocesses/${processId}/guide`,
              icon: <AccountTree />,
              disabled: !hasSchema,
            },
            {
              title: t("Team"),
              path: `/dashboard/coproductionprocesses/${processId}/team`,
              icon: <GroupIcon />,
              disabled: !hasSchema,
            },
            {
              title: t("Settings"),
              path: `/dashboard/coproductionprocesses/${processId}/settings`,
              icon: <Settings />,
              disabled: false,
            },
          ],
        },
      ];
    } else {
      sections = [
        {
          title: "",
          items: [
            {
              title: t("Front Page"),
              path: `/dashboard/coproductionprocesses/${processId}/profile`,
              icon: <Newspaper />,
              disabled: false,
            },
            {
              title: t("Overview"),
              path: `/dashboard/coproductionprocesses/${processId}/overview`,
              icon: <SavedSearch />,
              disabled: false,
            },

            {
              title: t("Resources"),
              path: `/dashboard/coproductionprocesses/${processId}/resources`,
              icon: <Dashboard />,
              disabled: false,
            },
            {
              title: t("Guide"),
              path: `/dashboard/coproductionprocesses/${processId}/guide`,
              icon: <AccountTree />,
              disabled: !hasSchema,
            },
            {
              title: t("Leaderboard"),
              path: `/dashboard/coproductionprocesses/${processId}/leaderboard`,
              icon: <Leaderboard />,
              disabled: !gameId,
            },
            {
              title: t("Workplan"),
              path: `/dashboard/coproductionprocesses/${processId}/workplan`,
              icon: <Timeline />,
              disabled: !hasSchema || process.is_part_of_publication,
            },
            {
              title: t("Team"),
              path: `/dashboard/coproductionprocesses/${processId}/team`,
              icon: <GroupIcon />,
              disabled: !hasSchema,
            },
            {
              title: t("Settings"),
              path: `/dashboard/coproductionprocesses/${processId}/settings`,
              icon: <Settings />,
              disabled: false,
            },
          ],
        },
      ];
    }
  }
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        {false && (
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => navigate("/dashboard")}
          />
        )}

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={!loading && !updating ? 1 : 0}
          sx={{ p: 3 }}
        >
          {!loading && !updating ? (
            <Avatar
              variant="rounded"
              sx={{ width: "80px", height: "80px" }}
              src={process && process.logotype_link}
            >
              {(!process || !process.logotype_link) && <Folder />}{" "}
            </Avatar>
          ) : (
            <Skeleton
              variant="rounded"
              sx={{ m: 1, width: "80px", height: "80px" }}
            />
          )}
          <Typography sx={{ textAlign: "center", width: "100%" }} variant="h6">
            {!loading && !updating && process ? process.name : <Skeleton />}
          </Typography>
          {!loading && !updating && process ? (
            <StatusChip t={t} status={process.status} />
          ) : (
            <Skeleton sx={{ width: 80, height: 45, m: 0, p: 0 }} />
          )}
          {!loading && !updating && process ? (
            <Chip
              size="small"
              color="default"
              label={
                LANGUAGES.find((el) => el.value === process.language).label
              }
            />
          ) : (
            <Skeleton sx={{ width: 80, height: 45, m: 0, p: 0 }} />
          )}
          {!loading && !updating && gameId && (
            <>
              <Popover
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                open={anchorElGamification}
                onClose={() => setAnchorElGamification(null)}
                anchorEl={anchorElGamification}
                PaperProps={{
                  sx: {
                    padding: 2,
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#3f51b5" }}
                  >
                    {t("Strategy")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {gameStrategy}
                  </Typography>
                </Box>
              </Popover>
              <Chip
                size="small"
                color="primary"
                label={"Incentives"}
                icon={<MilitaryTech />}
                sx={{ backgroundColor: "gold.main" }}
                onClick={(e) => setAnchorElGamification(e.currentTarget)}
              />
            </>
          )}
        </Stack>
        <Divider />
        <Box sx={{ p: 2 }}>
          {!loading &&
            sections.map((section) => (
              <NavSection
                key={section.title}
                pathname={location.pathname}
                sx={{
                  "& + &": {
                    mt: 3,
                  },
                  color: "text.secondary",
                }}
                {...section}
              />
            ))}
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "background.paper",
            height: "calc(100% - 64px) !important",
            top: "64px !Important",
            width: "260px",
            zIndex: 0,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          width: 300,
          zIndex: 0,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

ProcessSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default ProcessSidebar;
