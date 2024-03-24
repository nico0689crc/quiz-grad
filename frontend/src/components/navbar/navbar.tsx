import { useContext } from "react";
import { AnimatePresence, m } from "framer-motion";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "@/components/iconify";
import { RouterLink } from "@/routes/components";
import { varFade } from "@/components/animate";
import ThemeModeButton from "@/components/theme-mode-button/theme-mode-button";
import LanguageButton from "@/components/language-button/language-button";

import { SettingsContext } from "../settings/context/settings-context";

import { useNavbarConfig as menuItems } from "./use-navbar-config";
import { useAuthContext } from "@/components/auth/context/auth-provider";
import { useTranslate } from "@/locales";

import { paths } from "@/routes/paths";

const Navbar = () => {
  const { authenticated, logout } = useAuthContext();
  const { t } = useTranslate();
  const { navbarMobileToggle, toggleMobileNavbar } =
    useContext(SettingsContext);
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      {/* Desktop */}
      <AnimatePresence>
        {!isDownLg && (
          <m.div {...varFade().inLeft}>
            <List component="nav" sx={{ display: "flex", gap: 1 }}>
              {menuItems.map((item, index) => (
                <Stack key={index}>
                  {(item.isPublic || authenticated) && (
                    <ListItem dense={true}>
                      <Link component={RouterLink} href={item.href}>
                        <Typography noWrap variant="button">
                          {t(item.title)}
                        </Typography>
                      </Link>
                    </ListItem>
                  )}
                </Stack>
              ))}
            </List>
          </m.div>
        )}
      </AnimatePresence>

      {/* Mobile */}
      {isDownLg && (
        <Drawer
          anchor="right"
          open={navbarMobileToggle}
          onClose={toggleMobileNavbar}
        >
          <Box component="nav" sx={{ p: 3, height: "100%" }}>
            <Stack
              sx={{
                width: "300px",
                height: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <m.div {...varFade().inLeft}>
                  <IconButton color="primary" onClick={toggleMobileNavbar}>
                    <Iconify icon="iconamoon:close-bold" width={25} />
                  </IconButton>
                </m.div>
                <Stack direction="row" spacing={1} alignItems="center">
                  <m.div {...varFade({ durationIn: 0.75 }).inRight}>
                    <LanguageButton />
                  </m.div>
                  <m.div {...varFade({ durationIn: 1 }).inRight}>
                    <ThemeModeButton />
                  </m.div>
                </Stack>
              </Stack>
              <Stack
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                spacing={3}
              >
                {menuItems.map((item, index) => (
                  <Stack key={index}>
                    {(item.isPublic || authenticated) && (
                      <m.div {...varFade({ durationIn: item.duration }).inLeft}>
                        <Link
                          component={RouterLink}
                          href={item.href}
                          onClick={toggleMobileNavbar}
                        >
                          <Typography variant="h6">{t(item.title)}</Typography>
                        </Link>
                      </m.div>
                    )}
                  </Stack>
                ))}
              </Stack>

              {!authenticated ? (
                <Stack spacing={2} direction="row">
                  <m.div {...varFade({ durationIn: 0.75 }).inUp}>
                    <Button
                      variant="outlined"
                      fullWidth
                      component={RouterLink}
                      startIcon={<Iconify icon="uil:arrow-to-right" />}
                      onClick={toggleMobileNavbar}
                      href={paths.login}
                    >
                      <Typography noWrap variant="button">
                        {t("buttons.login")}
                      </Typography>
                    </Button>
                  </m.div>
                  <m.div {...varFade({ durationIn: 1.25 }).inUp}>
                    <Button
                      variant="contained"
                      fullWidth
                      component={RouterLink}
                      startIcon={<Iconify icon="uil:pen" />}
                      onClick={toggleMobileNavbar}
                      href={paths.register}
                    >
                      <Typography noWrap variant="button">
                        {t("buttons.signup")}
                      </Typography>
                    </Button>
                  </m.div>
                </Stack>
              ) : (
                <m.div {...varFade({ durationIn: 1.25 }).inUp}>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="material-symbols:logout" />}
                    onClick={() => {
                      toggleMobileNavbar();
                      logout();
                    }}
                  >
                    <Typography noWrap variant="button">
                      {t("buttons.signout")}
                    </Typography>
                  </Button>
                </m.div>
              )}
            </Stack>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
