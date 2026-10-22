import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PageHeader from "../components/common/PageHeader.jsx";
import StatCard from "../components/common/StatCard.jsx";
import { analyticsService } from "../services/analyticsService/index.js";
import { useLanguage } from "../context/AppProviders.jsx";
import { PeopleAlt, Visibility, Timeline, Web } from "@mui/icons-material";

export default function EngineeringDashboardPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [activity, setActivity] = useState([]);
  const [devices, setDevices] = useState([]);
  const authorized =
    import.meta.env.DEV &&
    sessionStorage.getItem("nuvora.engineeringDemo") === "true";
  useEffect(() => {
    if (!authorized) return;
    Promise.all([
      analyticsService.getOverview(),
      analyticsService.getWeeklyVisitors(),
      analyticsService.getActivity(),
      analyticsService.getDevices(),
    ]).then(([a, b, c, d]) => {
      setOverview(a);
      setWeekly(b);
      setActivity(c);
      setDevices(d);
    });
  }, [authorized]);
  if (!authorized)
    return (
      <>
        <PageHeader title={t("engineering")} />
        <Alert severity="warning">
          Demo access is unavailable. In development, visit Engineering Access
          and use the public demo phrase.
        </Alert>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/engineering-access")}>
          {t("accessEngineering")}
        </Button>
      </>
    );
  return (
    <>
      <PageHeader title={t("engineering")} subtitle={t("analyticsSource")} />
      <Alert severity="warning" sx={{ mb: 3 }}>
        {t("engineeringWarning")} This is not a real-time analytics feed or a
        security audit.
      </Alert>
      {overview && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              label={t("visitors")}
              value={overview.visitors.toLocaleString()}
              caption="Sample count"
              icon={PeopleAlt}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              label={t("activeUsers")}
              value={overview.activeUsers}
              caption="Simulated snapshot"
              icon={Visibility}
              color="#16a394"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              label={t("sessions")}
              value={overview.sessions.toLocaleString()}
              icon={Timeline}
              color="#e89a35"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              label={t("pageViews")}
              value={overview.pageViews.toLocaleString()}
              icon={Web}
              color="#dc6384"
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" fontWeight={750} sx={{ mb: 2 }}>
                {t("weeklyVisitors")}
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={weekly}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar
                    dataKey="visitors"
                    fill="#6558d3"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: 350 }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" fontWeight={750}>
                {t("activity")}
              </Typography>
              <ResponsiveContainer width="100%" height="88%">
                <PieChart>
                  <Pie
                    data={devices}
                    dataKey="value"
                    nameKey="label"
                    outerRadius={85}
                    label
                  >
                    {devices.map((entry, i) => (
                      <Cell
                        key={entry.label}
                        fill={["#6558d3", "#16a394", "#e89a35"][i % 3]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={750} sx={{ mb: 2 }}>
                Sample event groups
              </Typography>
              <Stack spacing={1}>
                {activity.map((row) => (
                  <Box
                    key={row.label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      borderBottom: 1,
                      borderColor: "divider",
                      py: 1,
                    }}
                  >
                    <Typography>{row.label}</Typography>
                    <Typography fontWeight={750}>{row.value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mt: 2 }}
      >
        Production requirement: server-side authorization and trusted analytics
        endpoints. Do not use sessionStorage as a security boundary.
      </Typography>
    </>
  );
}
