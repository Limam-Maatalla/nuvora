import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import {
  ArrowForward,
  Spa,
  CalendarMonth,
  Forum,
  AutoAwesome,
  Timer,
  TaskAlt,
  SelfImprovement,
} from "@mui/icons-material";
import PageHeader from "../components/common/PageHeader.jsx";
import StatCard from "../components/common/StatCard.jsx";
import { useLanguage, usePreferences } from "../context/AppProviders.jsx";
import { getStored } from "../utils/storage.js";
const actions = [
  ["/awareness", "awareness", "Notice your habits", Spa],
  ["/planner", "planner", "Make a realistic plan", CalendarMonth],
  ["/discussion", "discussion", "Explore a prompt", Forum],
  ["/assistant", "assistant", "Reflect with a guide", AutoAwesome],
];

export default function DashboardPage() {
  const { t } = useLanguage();
  const { displayName } = usePreferences();
  const tasks = getStored("nuvora.tasks", []);
  const checks = getStored("nuvora.checkins", []);
  const done = tasks.filter((x) => x.done).length;
  return (
    <>
      <PageHeader
        title={`${t("welcome")}, 
                ${displayName.split(" ")[0]}`}
        subtitle={t("tagline")}
        action={
          <Chip
            label={new Date().toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
            variant="outlined"
          />
        }
      />
      <Card
        sx={{
          mb: 3,
          background: "linear-gradient(120deg, #6558d3, #897de9)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Typography variant="overline" sx={{ opacity: 0.85 }}>
              NUVORA / YOUR SPACE
            </Typography>
            <Typography variant="h4" fontWeight={850} sx={{ my: 1 }}>
              {t("focus")}. {t("learn")}. {t("grow")}.
            </Typography>
            <Typography sx={{ opacity: 0.9, mb: 2 }}>
              {t("aboutBody")}
            </Typography>
            <Button
              component={Link}
              to="/planner"
              variant="contained"
              color="secondary"
              endIcon={<ArrowForward />}
              sx={{ color: "#fff" }}
            >
              {t("planner")}
            </Button>
          </Box>
          <Box
            sx={{
              fontSize: 76,
              opacity: 0.9,
              pr: 3,
              display: { xs: "none", sm: "block" },
            }}
          >
            ✦
          </Box>
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label={t("studyTasks")}
            value={tasks.length}
            caption={`${done} ${t("done").toLowerCase()}`}
            icon={TaskAlt}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label={t("mindfulCheckins")}
            value={checks.length}
            caption={t("awarenessNote")}
            icon={SelfImprovement}
            color="#16a394"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label={t("focusTime")}
            value={`${tasks
              .filter((x) => x.done)
              .reduce((a, x) => a + (Number(x.duration) || 0), 0)}m`}
            caption={t("weeklyGoal")}
            icon={Timer}
            color="#e89a35"
          />
        </Grid>
      </Grid>
      <PageHeader title={t("quickActions")} subtitle={t("openTool")} />
      <Grid container spacing={2}>
        {actions.map(([to, key, desc, Icon]) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={to}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                transition: "transform .2s",
                "&:hover": { transform: "translateY(-3px)" },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "primary.main",
                    color: "#fff",
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    mb: 2,
                  }}
                >
                  <Icon />
                </Box>
                <Typography variant="h6" fontWeight={750}>
                  {t(key)}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{
                    my: 1,
                    minHeight: 40,
                  }}
                >
                  {desc}
                </Typography>
                <Button
                  component={Link}
                  to={to}
                  endIcon={<ArrowForward />}
                  sx={{ px: 0 }}
                >
                  {t("openTool")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        color="text.secondary"
        variant="caption"
        display="block"
        sx={{
          mt: 3,
        }}
      >
        {t("profileNote")}
      </Typography>
    </>
  );
}
