import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  SpaceDashboard,
  Spa,
  CalendarMonth,
  Forum,
  AutoAwesome,
  Person,
  Info,
  Mail,
  Shield,
  Engineering,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useLanguage, usePreferences } from "../../context/AppProviders.jsx";
import { LanguageMenu } from "./LanguageMenu.jsx";
import PublicSiteFooter from "./PublicSiteFooter.jsx";
const drawerWidth = 252;
export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t, isRtl } = useLanguage();
  const { mode, setMode, displayName } = usePreferences();
  const location = useLocation();
  const links = [
    ["/", t("dashboard"), SpaceDashboard],
    ["/awareness", t("awareness"), Spa],
    ["/planner", t("planner"), CalendarMonth],
    ["/discussion", t("discussion"), Forum],
    ["/assistant", t("assistant"), AutoAwesome],
    ["/profile", t("profile"), Person],
  ];
  const publicLinks = [
    ["/about", t("about"), Info],
    ["/contact", t("contact"), Mail],
    ["/privacy-policy", t("privacy"), Shield],
  ];
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2.5 }}>
        <Typography variant="h5" fontWeight={900} color="primary">
          ✦ Nuvora
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {t("tagline")}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1.2, py: 1 }}>
        {links.map(([to, label, Icon]) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            onClick={() => setOpen(false)}
            selected={location.pathname === to}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.active": { color: "primary.main" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ mx: 2 }} />
      <List sx={{ px: 1.2, py: 1 }}>
        {publicLinks.map(([to, label, Icon]) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            onClick={() => setOpen(false)}
            selected={location.pathname === to}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ mt: "auto", p: 2 }}>
        <Button
          fullWidth
          component={NavLink}
          to="/engineering-access"
          startIcon={<Engineering />}
          variant="outlined"
          size="small"
        >
          {t("engineering")}
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {t("footerNote")}
        </Typography>
      </Box>
    </Box>
  );
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {mobile && (
            <IconButton onClick={() => setOpen(true)} edge="start">
              <MenuIcon />
            </IconButton>
          )}
          <Typography sx={{ flexGrow: 1, fontWeight: 750 }}>
            {t("appName")}
          </Typography>
          <LanguageMenu />
          <Tooltip title={mode === "light" ? t("dark") : t("light")}>
            <IconButton
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>
          <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>
            {(displayName || "N").slice(0, 1).toUpperCase()}
          </Avatar>
        </Toolbar>
      </AppBar>
      {mobile ? (
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{ sx: { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: 0,
              borderLeft: isRtl ? 1 : 0,
              borderColor: "divider",
            },
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          pt: 11,
          px: { xs: 2, sm: 3, lg: 4 },
          pb: 2,
        }}
      >
        <Box
          sx={{ maxWidth: 1240, mx: "auto", minHeight: "calc(100vh - 160px)" }}
        >
          <Outlet />
        </Box>
        <PublicSiteFooter />
      </Box>
    </Box>
  );
}
