import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage, usePreferences } from "../context/AppProviders.jsx";

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const prefs = usePreferences();
  const [name, setName] = useState(prefs.displayName);
  const [email, setEmail] = useState(prefs.email);
  const [mode, setMode] = useState(prefs.mode);
  const [notifications, setNotifications] = useState(prefs.notifications);
  const [saved, setSaved] = useState(false);
  const save = () => {
    prefs.setDisplayName(name.trim() || "Nuvora Explorer");
    prefs.setEmail(email.trim());
    prefs.setMode(mode);
    prefs.setNotifications(notifications);
    setSaved(true);
  };
  return (
    <>
      <PageHeader title={t("profile")} subtitle={t("profileNote")} />
      <Card sx={{ maxWidth: 760 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Stack spacing={2.5}>
            <Typography variant="h6" fontWeight={750}>
              {t("settings")}
            </Typography>
            <TextField
              label={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label={t("email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("language")}
              </Typography>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="en">{t("english")}</MenuItem>
                <MenuItem value="fr">{t("french")}</MenuItem>
                <MenuItem value="ar">{t("arabic")}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("theme")}
              </Typography>
              <Select value={mode} onChange={(e) => setMode(e.target.value)}>
                <MenuItem value="light">{t("light")}</MenuItem>
                <MenuItem value="dark">{t("dark")}</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              }
              label={t("notifications")}
            />
            <Button variant="contained" onClick={save}>
              {t("saveProfile")}
            </Button>
            {saved && <Alert severity="success">{t("save")}</Alert>}
            <Typography variant="caption" color="text.secondary">
              {t("profileNote")}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
