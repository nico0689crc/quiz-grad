import { MaterialDesignContent } from "notistack";
import { styled, alpha } from "@mui/material/styles";

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  const isLight = theme.palette.mode === "light";

  return {
    "& #notistack-snackbar": {
      display: "flex",
      columnGap: "15px",
      ...theme.typography.subtitle2,
      padding: 10,
      paddingTop: 0,
      flexGrow: 1,
      width: "100%",
    },
    "&.notistack-MuiContent": {
      display: "flex",
      flexDirection: "column-reverse",
      padding: theme.spacing(1),
      paddingRight: theme.spacing(2),
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      maxWidth: "400px",
    },
    "&.notistack-MuiContent-default": {
      padding: theme.spacing(1),
      color: isLight ? theme.palette.common.white : theme.palette.grey[800],
      backgroundColor: isLight
        ? theme.palette.grey[800]
        : theme.palette.common.white,
    },
  };
});

// ----------------------------------------------------------------------

type StyledIconProps = {
  color: "info" | "success" | "warning" | "error";
};

export const StyledIcon = styled("span")<StyledIconProps>(
  ({ color, theme }) => ({
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette[color].main,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  }),
);
