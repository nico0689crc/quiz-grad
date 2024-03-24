import { useCallback } from "react";

import { IconButton } from "@mui/material";

import Iconify from "@/components/iconify";
import { useSettingsContext } from "@/components/settings";

const ThemeModeButton = () => {
  const { themeMode, onUpdate } = useSettingsContext();

  const icon = themeMode === "dark" ? "iconoir:sun-light" : "iconoir:moon-sat";

  const onChangeThemeMode = useCallback(() => {
    onUpdate("themeMode", themeMode === "dark" ? "light" : "dark");
  }, [themeMode]);

  return (
    <IconButton color="primary" onClick={onChangeThemeMode}>
      <Iconify icon={icon} width={25} />
    </IconButton>
  );
};

export default ThemeModeButton;
