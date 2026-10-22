import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage } from "../context/AppProviders.jsx";
export default function EngineeringAccessPage() {
  const { t } = useLanguage();
  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dev = import.meta.env.DEV;
  const enter = (e) => {
    e.preventDefault();
    if (dev && phrase === "NUVORA-DEMO") {
      sessionStorage.setItem("nuvora.engineeringDemo", "true");
      navigate("/engineering");
    } else setError(true);
  };
  return (
    <>
      <PageHeader title={t("engineering")} subtitle={t("demoGateNote")} />
      <Alert severity="warning" sx={{ mb: 2 }}>
        {t("engineeringWarning")}
      </Alert>
      <Card sx={{ maxWidth: 560 }}>
        <CardContent>
          <Stack component="form" onSubmit={enter} spacing={2}>
            <Typography>{t("demoGateNote")}</Typography>
            <TextField
              label={t("enterDemoPhrase")}
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained">
              {t("unlock")}
            </Button>
            {error && (
              <Alert severity="error">
                {dev
                  ? "Phrase not recognized."
                  : "Demo access is disabled in production."}
              </Alert>
            )}
            {dev && (
              <Typography variant="caption" color="text.secondary">
                Development demo phrase: NUVORA-DEMO
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
