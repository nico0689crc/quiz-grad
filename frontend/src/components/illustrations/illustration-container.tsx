'use client';

import React from 'react';

import { m } from 'framer-motion';

import { Stack, Typography } from '@mui/material';

import { varFade } from '../animate';

type PropsType = {
  title?: string;
  subTitle?: string;
  caButton?: React.ReactNode;
  illustration: React.ReactNode;
  maxWidth?: number;
  height?: number;
};

export default function IllustrationContainer({ title, subTitle, caButton, illustration }: PropsType) {
  return (
    <Stack
      spacing={2}
      alignItems='center'
      justifyContent='center'
      sx={{
        textAlign: 'center',
        height: '100%',
      }}
    >
      <m.div {...varFade({ durationIn: 0.5 }).inDown}>
        {title && (
          <Typography variant='h3' noWrap sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
      </m.div>
      <m.div {...varFade({ durationIn: 0.75 }).inDown}>
        {subTitle && <Typography sx={{ color: 'text.secondary' }}>{subTitle}</Typography>}
      </m.div>
      <m.div style={{ height: '100%' }} {...varFade({ durationIn: 1 }).inDown}>
        {illustration}
      </m.div>
      <m.div {...varFade({ durationIn: 1.25 }).inDown}>{caButton && caButton}</m.div>
    </Stack>
  );
}
