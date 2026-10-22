import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PageHeader from "../components/common/PageHeader.jsx";
import { privacySections } from "../content/privacyPolicyContent.js";
import { useLanguage } from "../context/AppProviders.jsx";
export default function PrivacyPolicyPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader title={t("privacy")} subtitle={t("privacyIntro")} />
      <Alert severity="warning" sx={{ mb: 2 }}>
        Starter policy only — review it for the actual deployed service and
        applicable law.
      </Alert>
      {privacySections.map((s, i) => (
        <Accordion
          key={s.title}
          defaultExpanded={i === 0}
          variant="outlined"
          sx={{
            mb: 1,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={700}>{s.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{s.body}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
