import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage } from "../context/AppProviders.jsx";
import { contactService } from "../services/contactService.js";
export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [result, setResult] = useState(null);
  const change = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const submit = async (e) => {
    e.preventDefault();
    const r = await contactService.sendMessage(form);
    setResult(
      r.demo ? "demo" : r.reason === "validation" ? "invalid" : "error"
    );
  };
  return (
    <>
      <PageHeader title={t("contactTitle")} subtitle={t("contactDemo")} />
      <Card sx={{ maxWidth: 760 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Stack component="form" onSubmit={submit} spacing={2}>
            <TextField
              required
              label={t("name")}
              value={form.name}
              onChange={(e) => change("name", e.target.value)}
              fullWidth
            />
            <TextField
              required
              type="email"
              label={t("email")}
              value={form.email}
              onChange={(e) => change("email", e.target.value)}
              fullWidth
            />
            <TextField
              required
              multiline
              minRows={5}
              label={t("message")}
              value={form.message}
              onChange={(e) => change("message", e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained">
              {t("sendMessage")}
            </Button>
            {result === "demo" && (
              <Alert severity="info">{t("contactSuccess")}</Alert>
            )}
            {result === "invalid" && (
              <Alert severity="error">
                Please complete all required fields.
              </Alert>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
