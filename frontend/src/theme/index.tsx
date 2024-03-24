"use client";

import { useMemo } from "react";
import merge from "lodash/merge";

import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { useSettingsContext } from "src/components/settings";

import { palette } from "./palette";
import { shadows } from "./shadows";
import { typography } from "./typography";

import { customShadows } from "./custom-shadows";
import { componentsOverrides } from "./overrides";
import NextAppDirEmotionCacheProvider from "./next-emotion-cache";
import { useLocales } from "@/locales";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { currentLang } = useLocales();

  const settings = useSettingsContext();

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(settings.themeMode),
      },
      customShadows: {
        ...customShadows(settings.themeMode),
      },
      shadows: shadows(settings.themeMode),
      shape: { borderRadius: 8 },
      typography,
    }),
    [settings.themeMode],
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme));

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLang.systemValue),
    [currentLang.systemValue, theme],
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={themeWithLocale}>
        <>
          <CssBaseline />
          {children}
        </>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
