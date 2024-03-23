'use client';

import { Box } from '@mui/material';
import { m } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component={m.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 1.5 }}
      p={{ xs: 2, md: 5 }}
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}
