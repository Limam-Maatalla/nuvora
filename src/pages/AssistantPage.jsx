import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AutoAwesome, Send } from "@mui/icons-material";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage } from "../context/AppProviders.jsx";
import { getAssistantReply } from "../services/assistantService.js";
export default function AssistantPage() {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((m) => [...m, { id: Date.now(), from: "you", text }]);
    setInput("");
    const reply = await getAssistantReply(text);
    setMessages((m) => [
      ...m,
      { id: Date.now() + 1, from: "assistant", text: reply },
    ]);
  };
  return (
    <>
      <PageHeader title={t("assistantTitle")} subtitle={t("assistantIntro")} />
      <Card sx={{ maxWidth: 850, mx: "auto" }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            {t("assistantDisclaimer")}
          </Alert>
          <Box sx={{ minHeight: 300, maxHeight: 460, overflowY: "auto", p: 1 }}>
            {messages.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Avatar
                  sx={{
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.main",
                    width: 56,
                    height: 56,
                  }}
                >
                  <AutoAwesome />
                </Avatar>
                <Typography color="text.secondary">
                  {t("noMessages")}
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {messages.map((m) => (
                  <Box
                    key={m.id}
                    sx={{
                      display: "flex",
                      justifyContent:
                        m.from === "you" ? "flex-end" : "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: "85%",
                        p: 1.6,
                        borderRadius: 3,
                        bgcolor:
                          m.from === "you" ? "primary.main" : "action.hover",
                        color:
                          m.from === "you"
                            ? "primary.contrastText"
                            : "text.primary",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {m.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={t("messagePlaceholder")}
            />
            <Button variant="contained" onClick={send} aria-label={t("send")}>
              <Send />
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
