import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage } from "../context/AppProviders.jsx";
import { getStored, setStored } from "../utils/storage.js";
export default function AwarenessPage() {
  const { t } = useLanguage();
  const [minutes, setMinutes] = useState("12");
  const [mood, setMood] = useState("okay");
  const [energy, setEnergy] = useState("okay");
  const [checks, setChecks] = useState(() => getStored("nuvora.checkins", []));
  const save = () => {
    const next = [
      {
        id: Date.now(),
        date: new Date().toISOString(),
        minutes: Number(minutes) || 0,
        mood,
        energy,
      },
      ...checks,
    ].slice(0, 30);
    setChecks(next);
    setStored("nuvora.checkins", next);
  };
  const avg = checks.length
    ? Math.round(checks.reduce((a, x) => a + x.minutes, 0) / checks.length)
    : 0;
  return (
    <>
      <PageHeader title={t("awarenessTitle")} subtitle={t("awarenessNote")} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={750} sx={{ mb: 2 }}>
                {t("logCheckin")}
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label={t("screenMinutes")}
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  inputProps={{ min: 0, max: 1440 }}
                />
                <TextField
                  select
                  label={t("mood")}
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                >
                  <MenuItem value="low">{t("low")}</MenuItem>
                  <MenuItem value="okay">{t("okay")}</MenuItem>
                  <MenuItem value="good">{t("good")}</MenuItem>
                </TextField>
                <TextField
                  select
                  label={t("energy")}
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                >
                  <MenuItem value="low">{t("low")}</MenuItem>
                  <MenuItem value="okay">{t("okay")}</MenuItem>
                  <MenuItem value="good">{t("good")}</MenuItem>
                </TextField>
                <Button variant="contained" onClick={save}>
                  {t("logCheckin")}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={750}>
                {t("overview")}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Average self-reported screen time
              </Typography>
              <Typography variant="h3" fontWeight={850} sx={{ my: 1 }}>
                {avg}
                <Typography
                  component="span"
                  color="text.secondary"
                  variant="body1"
                >
                  {" "}
                  min
                </Typography>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min((avg / 600) * 100, 100)}
                sx={{ height: 9, borderRadius: 9 }}
              />
              <Alert severity="info" sx={{ mt: 2 }}>
                {t("awarenessNote")}
              </Alert>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={750} sx={{ mb: 2 }}>
                {t("recentCheckins")}
              </Typography>
              {checks.length === 0 ? (
                <Typography color="text.secondary">—</Typography>
              ) : (
                <Stack spacing={1}>
                  {checks.slice(0, 7).map((x) => (
                    <Stack
                      key={x.id}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ py: 1, borderBottom: 1, borderColor: "divider" }}
                    >
                      <Typography variant="body2">
                        {new Date(x.date).toLocaleDateString()}
                      </Typography>
                      <Chip size="small" label={`${x.minutes} min`} />
                      <Chip size="small" label={`${t("mood")}: ${t(x.mood)}`} />
                    </Stack>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
