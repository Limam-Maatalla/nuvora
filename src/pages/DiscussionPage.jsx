import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  FavoriteBorder,
  BookmarkBorder,
  CheckCircleOutline,
} from "@mui/icons-material";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage } from "../context/AppProviders.jsx";
import { getStored, setStored } from "../utils/storage.js";
const prompts = [
  {
    id: 1,
    category: "subjectStudy",
    title: "What is one concept you finally understood this week?",
    body: "Share the explanation, example, or practice that made it click.",
  },
  {
    id: 2,
    category: "subjectWellbeing",
    title: "What helps you return to focus after a distraction?",
    body: "Small, repeatable habits can be more useful than perfect routines.",
  },
  {
    id: 3,
    category: "subjectGeneral",
    title: "What is one useful thing you learned recently?",
    body: "It can be a tool, a habit, a fact, or a lesson from a mistake.",
  },
  {
    id: 4,
    category: "subjectStudy",
    title: "How do you break a difficult task into smaller steps?",
    body: "Describe the first step you would recommend to someone else.",
  },
];
export default function DiscussionPage() {
  const { t } = useLanguage();
  const [state, setState] = useState(() => getStored("nuvora.discussion", {}));
  const update = (id, field) => {
    const next = {
      ...state,
      [id]: { ...(state[id] || {}), [field]: !(state[id] || {})[field] },
    };
    setState(next);
    setStored("nuvora.discussion", next);
  };
  return (
    <>
      <PageHeader
        title={t("discussionTitle")}
        subtitle="Reflection prompts for a thoughtful learning community."
      />
      <Grid container spacing={2}>
        {prompts.map((p) => (
          <Grid size={{ xs: 12, md: 6 }} key={p.id}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Chip size="small" label={t(p.category)} sx={{ mb: 2 }} />
                <Typography variant="h6" fontWeight={750}>
                  {p.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  {p.body}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Button
                    size="small"
                    startIcon={<FavoriteBorder />}
                    onClick={() => update(p.id, "liked")}
                  >
                    {state[p.id]?.liked ? t("liked") : t("like")}
                  </Button>
                  <Button
                    size="small"
                    startIcon={<BookmarkBorder />}
                    onClick={() => update(p.id, "saved")}
                  >
                    {state[p.id]?.saved ? t("saved") : t("savePrompt")}
                  </Button>
                  <Button
                    size="small"
                    startIcon={<CheckCircleOutline />}
                    onClick={() => update(p.id, "done")}
                  >
                    {state[p.id]?.done ? t("done") : t("complete")}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mt: 2 }}
      >
        These prompts are local sample content. No public posts or shared
        accounts are enabled.
      </Typography>
    </>
  );
}
