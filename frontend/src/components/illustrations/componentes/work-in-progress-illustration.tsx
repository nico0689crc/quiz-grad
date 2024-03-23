import { memo } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

function WorkInProgressIllustration({ ...other }: BoxProps) {
  return (
    <Box component='svg' width='100%' height='100%' viewBox='0 0 480 360' xmlns='http://www.w3.org/2000/svg' {...other}>
      <image href='/assets/illustrations/wip.svg' height='300' x='10%' y='10%' />
    </Box>
  );
}

export default memo(WorkInProgressIllustration);
