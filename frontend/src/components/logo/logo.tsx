'use client';

import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';
import { Stack, Typography } from '@mui/material';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component='div'
      sx={{
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <Stack direction='row' spacing={0.25} alignItems='center'>
        <Typography variant='h3' sx={{ fontWeight: 200 }}>
          Quiz
        </Typography>
        <Typography variant='h3' sx={{ color: (theme) => theme.palette.text.primary }}>
          Grad
        </Typography>
      </Stack>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href='/' sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;
