import { FormControl, MenuItem, Select } from "@mui/material";
import { useLanguage } from "../../context/AppProviders.jsx";
export function LanguageMenu() {
  const { language, setLanguage } = useLanguage();
  return (
    <FormControl size="small" sx={{ minWidth: 112 }}>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Language"
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="ar">العربية</MenuItem>
      </Select>
    </FormControl>
  );
}
