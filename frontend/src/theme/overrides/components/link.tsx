import { LinkProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

const COLORS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
] as const;

export function link(theme: Theme) {
  const lightMode = theme.palette.mode === "light";

  const rootStyles = (ownerState: LinkProps) => {
    const defaultStyle = {
      display: "inline-block",
      position: "relative",
      textDecoration: "none",
      "::after": {
        content: '" "',
        position: "absolute",
        width: "100%",
        transform: "scaleX(0)",
        height: "2px",
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.primary.dark,
        transformOrigin: "bottom right",
        transition: theme.transitions.create(["transform"], {
          delay: 0.5,
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }),
      },
      ":hover::after": {
        transform: "scaleX(1)",
        transformOrigin: "bottom left",
      },
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        color: lightMode
          ? theme.palette[color].dark
          : theme.palette[color].main,
      }),
    }));

    return [defaultStyle, ...colorStyle];
  };

  return {
    MuiLink: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: LinkProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
