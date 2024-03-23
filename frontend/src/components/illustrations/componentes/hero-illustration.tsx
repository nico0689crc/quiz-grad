import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function HeroIllustration({ ...other }: BoxProps) {
  return (
    <Box
      component='svg'
      width='100%'
      height='100%'
      viewBox='0 0 480 360'
      xmlns='http://www.w3.org/2000/svg'
      sx={{
        display: 'flex',
      }}
      {...other}
    >
      <image href='/assets/illustrations/hero.svg' height='100%' />
    </Box>
  );
}

export default memo(HeroIllustration);
