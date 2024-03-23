import { AnimatePresence, m } from 'framer-motion';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Paper,
  PaperProps,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { varFade, varZoom } from '@/components/animate';
import { useTranslate } from '@/locales';
import { RootState, useAppSelector } from '@/store';
import Iconify from '@/components/iconify';
import { useState } from 'react';

const PositionBoard = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslate();
  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up('lg'));
  const { positions } = useAppSelector((state: RootState) => state.room.room);

  const positionsContent = (
    <Stack spacing={2}>
      {positions.map((position, index) => (
        <Stack direction='row' spacing={1} key={position.playerUUID}>
          <Typography variant='subtitle1'>{++index}</Typography>
          <Typography component='span'>-</Typography>
          <Typography
            sx={{
              width: '150px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant='subtitle1'
          >
            {position.userName}
          </Typography>
          <Typography component='span'>-</Typography>
          <Typography variant='subtitle1'>{position.totalPoints} pts</Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      {isUpLg ? (
        <Box component={m.div} {...varFade({ durationIn: 2, durationOut: 0 }).inRight} sx={{ width: '100%' }}>
          <Stack component={Card} px={4} py={2} spacing={2} height='100%'>
            <Typography variant='subtitle1' textAlign='center'>
              {t('common.labels.positions')}
            </Typography>
            <Divider sx={{ width: '100%' }} />
            {positionsContent}
          </Stack>
        </Box>
      ) : (
        <>
          <Box
            component={m.div}
            {...varFade({ durationIn: 1, durationOut: 0 }).inRight}
            sx={{
              position: 'fixed',
              top: 120,
              right: 20,
            }}
          >
            <Fab sx={{ position: 'relative' }} size='small' color='primary' onClick={() => setOpen(() => true)}>
              <Iconify icon='game-icons:podium' width={20} sx={{ mb: 1 }} />
            </Fab>
          </Box>
          <AnimatePresence>
            {open && (
              <Dialog
                maxWidth='xs'
                open={open}
                onClose={() => setOpen(() => false)}
                PaperComponent={(props: PaperProps) => (
                  <m.div {...varZoom().in}>
                    <Paper {...props}>{props.children}</Paper>
                  </m.div>
                )}
              >
                <DialogTitle textAlign='center' id='alert-dialog-title'>
                  {t('common.labels.positions')}
                </DialogTitle>
                <Divider sx={{ width: '100%' }} />
                <DialogContent>{positionsContent}</DialogContent>
                <Divider sx={{ width: '100%' }} />
                <DialogActions sx={{ py: 2 }}>
                  <Button variant='outlined' onClick={() => setOpen(() => false)}>
                    {t('common.labels.close')}
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default PositionBoard;
