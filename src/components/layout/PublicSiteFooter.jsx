import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/AppProviders.jsx";
export default function PublicSiteFooter() {
  const { t } = useLanguage();
  return (
    <Box
      component="footer"
      sx={{
        maxWidth: 1240,
        mx: "auto",
        mt: 5,
        pt: 2,
        pb: 1,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Nuvora · {t("footerNote")}
        </Typography>
        <Stack direction="row" spacing={2}>
          <MuiLink
            component={Link}
            to="/about"
            underline="hover"
            variant="caption"
          >
            {t("about")}
          </MuiLink>
          <MuiLink
            component={Link}
            to="/contact"
            underline="hover"
            variant="caption"
          >
            {t("contact")}
          </MuiLink>
          <MuiLink
            component={Link}
            to="/privacy-policy"
            underline="hover"
            variant="caption"
          >
            {t("privacy")}
          </MuiLink>
        </Stack>
      </Stack>
    </Box>
  );
}
