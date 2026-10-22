import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
export default function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  color = "#6558d3",
}) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Box>
            <Typography color="text.secondary" variant="body2">
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ my: 1 }}>
              {value}
            </Typography>
            {caption && (
              <Typography color="text.secondary" variant="caption">
                {caption}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: `${color}18`,
                color,
              }}
            >
              <Icon />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
