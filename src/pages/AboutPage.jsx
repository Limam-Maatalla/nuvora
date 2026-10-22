import { Card, CardContent, Grid, Typography } from "@mui/material";
import { AutoAwesome, Spa, CalendarMonth } from "@mui/icons-material";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage } from "../context/AppProviders.jsx";
export default function AboutPage() {
  const { t } = useLanguage();
  const items = [
    ["Focus", "Create space for one meaningful task at a time.", AutoAwesome],
    [
      "Learn",
      "Turn intentions into practical, manageable study sessions.",
      CalendarMonth,
    ],
    ["Grow", "Notice habits with curiosity rather than judgement.", Spa],
  ];
  return (
    <>
      <PageHeader title={t("aboutTitle")} subtitle={t("aboutBody")} />
      <Grid container spacing={2}>
        {items.map(([title, body, Icon]) => (
          <Grid size={{ xs: 12, md: 4 }} key={title}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Icon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                <Typography variant="h6" fontWeight={750}>
                  {title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
