import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Stack,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteOutline, AddCircleOutline } from "@mui/icons-material";
import PageHeader from "../components/common/PageHeader.jsx";
import { useLanguage } from "../context/AppProviders.jsx";
import { getStored, setStored } from "../utils/storage.js";

export default function StudyPlannerPage() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState(() => getStored("nuvora.tasks", []));
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Study");
  const [duration, setDuration] = useState("25");
  const [dueDate, setDueDate] = useState("");
  const persist = (next) => {
    setTasks(next);
    setStored("nuvora.tasks", next);
  };
  const add = () => {
    if (!title.trim()) return;
    persist([
      {
        id: Date.now(),
        title: title.trim(),
        subject,
        duration: Number(duration) || 25,
        dueDate,
        done: false,
        createdAt: new Date().toISOString(),
      },
      ...tasks,
    ]);
    setTitle("");
    setDueDate("");
  };
  const toggle = (id) =>
    persist(tasks.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  return (
    <>
      <PageHeader
        title={t("planner")}
        subtitle="Turn a big goal into a small next step."
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={750} sx={{ mb: 2 }}>
                {t("addTask")}
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label={t("taskTitle")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && add()}
                  fullWidth
                />
                <TextField
                  label={t("subject")}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  fullWidth
                />
                <TextField
                  label={t("duration")}
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  inputProps={{ min: 1, max: 600 }}
                />
                <TextField
                  label={t("dueDate")}
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={add}
                >
                  {t("add")}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6" fontWeight={750}>
              {t("today")}
            </Typography>
            <Chip
              label={`${tasks.filter((x) => x.done).length}/${tasks.length} ${t(
                "done"
              )}`}
            />
          </Stack>
          {tasks.length === 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Typography color="text.secondary">
                  {t("emptyTasks")}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Stack spacing={1.5}>
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  variant="outlined"
                  sx={{ opacity: task.done ? 0.72 : 1 }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: "12px!important",
                    }}
                  >
                    <Checkbox
                      checked={task.done}
                      onChange={() => toggle(task.id)}
                      inputProps={{ "aria-label": task.title }}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        fontWeight={700}
                        sx={{
                          textDecoration: task.done ? "line-through" : "none",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.subject} · {task.duration} min
                        {task.dueDate ? ` · ${task.dueDate}` : ""}
                      </Typography>
                    </Box>

                    <Chip
                      size="small"
                      color={task.done ? "success" : "default"}
                      label={task.done ? t("done") : t("pending")}
                    />
                    <IconButton
                      aria-label={t("delete")}
                      onClick={() =>
                        persist(tasks.filter((x) => x.id !== task.id))
                      }
                    >
                      <DeleteOutline />
                    </IconButton>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Grid>
      </Grid>
    </>
  );
}
