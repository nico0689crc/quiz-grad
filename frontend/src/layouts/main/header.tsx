'use client';

import { useContext } from 'react';
import { AnimatePresence, m } from 'framer-motion';

import { Button, Card, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';

import Iconify from '@/components/iconify';
import Logo from '@/components/logo';
import Navbar from '@/components/navbar';
import { SettingsContext } from '@/components/settings/context/settings-context';
import { RouterLink } from '@/routes/components';
import { varFade } from '@/components/animate';
import ThemeModeButton from '@/components/theme-mode-button/theme-mode-button';
import LanguageButton from '@/components/language-button';

import { useTheme } from '@mui/material/styles';
import { useTranslate } from '@/locales';
import { useAuthContext } from '@/components/auth/context/auth-provider';

import { paths } from '@/routes/paths';

export default function Header() {
  const { t } = useTranslate();
  const { toggleMobileNavbar } = useContext(SettingsContext);
  const { authenticated, user, logout } = useAuthContext();

  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      height='100%'
      component={Card}
      elevation={5}
      square
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.background.paper,
        height: '100%',
        px: { xs: 2, md: 6 },
      }}
    >
      <m.div {...varFade().inLeft}>
        <Logo />
      </m.div>

      <Stack direction='row' spacing={5} sx={{ alignItems: 'center' }}>
        <Navbar />
        <AnimatePresence>
          {isUpLg && (
            <m.div {...varFade().inRight}>
              <Stack direction='row' spacing={1} alignItems='center'>
                <LanguageButton />
                <ThemeModeButton />
                {authenticated ? (
                  <>
                    <Typography variant='body1'>{`${user?.firstName} ${user?.lastName}`}</Typography>
                    <IconButton color='primary' size='large' onClick={logout}>
                      <Iconify icon='material-symbols:logout' width={25} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button
                      variant='outlined'
                      component={RouterLink}
                      startIcon={<Iconify icon='uil:arrow-to-right' />}
                      href={paths.login}
                    >
                      <Typography noWrap variant='button'>
                        {t('buttons.login')}
                      </Typography>
                    </Button>
                    <Button
                      variant='contained'
                      component={RouterLink}
                      startIcon={<Iconify icon='uil:pen' />}
                      href={paths.register}
                    >
                      <Typography noWrap variant='button'>
                        {t('buttons.signup')}
                      </Typography>
                    </Button>
                  </>
                )}
              </Stack>
            </m.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isUpLg && (
            <m.div {...varFade().inRight}>
              <IconButton color='primary' size='large' onClick={toggleMobileNavbar}>
                <Iconify icon='pepicons-pop:menu' width={25} />
              </IconButton>
            </m.div>
          )}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
}
