import { Theme } from "@mui/material/styles";
import { ButtonProps } from "@mui/material/Button";

const COLORS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
] as const;

export function button(theme: Theme) {
  const lightMode = theme.palette.mode === "light";

  const rootStyles = (ownerState: ButtonProps) => {
    const inheritColor = ownerState.color === "inherit";

    const containedVariant = ownerState.variant === "contained";

    const outlinedVariant = ownerState.variant === "outlined";

    const textVariant = ownerState.variant === "text";

    const smallSize = ownerState.size === "small";

    const mediumSize = ownerState.size === "medium";

    const largeSize = ownerState.size === "large";

    const defaultStyle = {
      ...(inheritColor && {
        // CONTAINED
        ...(containedVariant && {
          backgroundColor: lightMode
            ? theme.palette.grey[800]
            : theme.palette.common.white,
          "&:hover": {
            backgroundColor: lightMode
              ? theme.palette.grey[700]
              : theme.palette.grey[400],
          },
        }),
        // OUTLINED
        ...(outlinedVariant && {
          // borderColor: alpha(theme.palette.grey[500], 0.32),
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }),
        // TEXT
        ...(textVariant && {
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }),
      }),
      ...(outlinedVariant && {
        "&:hover": {
          // borderColor: 'currentColor',
          boxShadow: "0 0 0 0.5px currentColor",
        },
      }),
    };

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        "&:hover": {
          boxShadow: theme.customShadows[color],
        },
      }),
    }));

    const size = {
      ...(smallSize && {
        height: 30,
        fontSize: 13,
        paddingLeft: 8,
        paddingRight: 8,
        ...(textVariant && {
          paddingLeft: 4,
          paddingRight: 4,
        }),
      }),
      ...(mediumSize && {
        paddingLeft: 12,
        paddingRight: 12,
        ...(textVariant && {
          paddingLeft: 8,
          paddingRight: 8,
        }),
      }),
      ...(largeSize && {
        height: 48,
        fontSize: 15,
        paddingLeft: 16,
        paddingRight: 16,
        ...(textVariant && {
          paddingLeft: 10,
          paddingRight: 10,
        }),
      }),
    };

    return [defaultStyle, ...colorStyle, size];
  };

  return {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) =>
          rootStyles(ownerState),
      },
    },
  };
}
