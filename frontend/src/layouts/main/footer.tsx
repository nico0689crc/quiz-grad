'use client';

import { Link, Stack, Typography } from '@mui/material';

import { useTranslate } from '@/locales';

import { RouterLink } from '@/routes/components';
import { paths } from '@/routes/paths';

export default function Footer() {
  const { t } = useTranslate();

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent='center'
      alignItems='center'
      spacing={{ xs: 1, md: 3, lg: 5 }}
      sx={{
        px: 2,
        py: 3,
        borderTop: (theme) => `1px solid ${theme.palette.primary.main}`,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.background.neutral : theme.palette.background.paper,
      }}
    >
      <Link component={RouterLink} href={paths.terms}>
        <Typography noWrap variant='button'>
          {t('navbar.terms')}
        </Typography>
      </Link>
      <Link component={RouterLink} href={paths.privacy}>
        <Typography noWrap variant='button'>
          {t('navbar.privacy')}
        </Typography>
      </Link>
      <Typography noWrap variant='button' color='primary'>
        {t('navbar.copyright')}
      </Typography>
    </Stack>
  );
}
