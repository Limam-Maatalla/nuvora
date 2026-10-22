import { useMemo, useState, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { getStored, setStored } from "../utils/storage.js";
import { dictionaries } from "../translations/index.js";

const LanguageContext = createContext(null);
const PreferencesContext = createContext(null);
export const useLanguage = () => useContext(LanguageContext);
export const usePreferences = () => useContext(PreferencesContext);

export function AppProviders({ children }) {
  const [language, setLanguageState] = useState(() =>
    getStored("nuvora.language", "en")
  );
  const [mode, setModeState] = useState(() =>
    getStored("nuvora.mode", "light")
  );
  const [displayName, setDisplayName] = useState(() =>
    getStored("nuvora.name", "Nuvora Explorer")
  );
  const [email, setEmail] = useState(() => getStored("nuvora.email", ""));
  const [notifications, setNotifications] = useState(() =>
    getStored("nuvora.notifications", true)
  );
  const isRtl = language === "ar";
  const setLanguage = (value) => {
    setLanguageState(value);
    setStored("nuvora.language", value);
    document.documentElement.lang = value;
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
  };
  const setMode = (value) => {
    setModeState(value);
    setStored("nuvora.mode", value);
  };
  const updateName = (value) => {
    setDisplayName(value);
    setStored("nuvora.name", value);
  };
  const updateEmail = (value) => {
    setEmail(value);
    setStored("nuvora.email", value);
  };
  const updateNotifications = (value) => {
    setNotifications(value);
    setStored("nuvora.notifications", value);
  };
  const t = (key) =>
    dictionaries[language]?.[key] ?? dictionaries.en[key] ?? key;
  const theme = useMemo(
    () =>
      createTheme({
        direction: isRtl ? "rtl" : "ltr",
        palette: {
          mode,
          primary: { main: "#6558d3" },
          secondary: { main: "#16a394" },
          background: {
            default: mode === "light" ? "#f6f7fb" : "#10121a",
            paper: mode === "light" ? "#ffffff" : "#1a1d29",
          },
        },
        shape: { borderRadius: 14 },
        typography: {
          fontFamily: 'Inter, "Segoe UI", Tahoma, Arial, sans-serif',
          button: { textTransform: "none", fontWeight: 650 },
        },
        components: {
          MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
          MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
        },
      }),
    [mode, isRtl]
  );
  const cache = useMemo(
    () =>
      createCache({
        key: isRtl ? "muirtl" : "mui",
        stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [prefixer],
      }),
    [isRtl]
  );
  const languageValue = useMemo(
    () => ({ language, setLanguage, t, isRtl }),
    [language, isRtl]
  );
  const prefValue = useMemo(
    () => ({
      mode,
      setMode,
      displayName,
      setDisplayName: updateName,
      email,
      setEmail: updateEmail,
      notifications,
      setNotifications: updateNotifications,
    }),
    [mode, displayName, email, notifications]
  );
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <LanguageContext.Provider value={languageValue}>
          <PreferencesContext.Provider value={prefValue}>
            {children}
          </PreferencesContext.Provider>
        </LanguageContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}
