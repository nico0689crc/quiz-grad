import { m } from "framer-motion";
import {
  Box,
  Stack,
  Card,
  useMediaQuery,
  Divider,
  Typography,
  Fab,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  PaperProps,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { varFade, varZoom } from "@/components/animate";
import Iconify from "@/components/iconify";
import { useTranslate } from "@/locales";
import QuizPlayerList from "@/sections/quizes/common/quiz-player-list";
import { useAppSelector } from "@/store";
import { selectPlayers } from "@/store/slices/room/roomSlice";
import { useState } from "react";

const PlayersBoard = () => {
  const { t } = useTranslate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const players = useAppSelector(selectPlayers);

  const playersContent = (
    <Box
      sx={{
        display: "grid",
        alignItems: "start",
        gridTemplateColumns: "repeat(3,60px)",
        gap: 5,
      }}
    >
      <QuizPlayerList players={players} />
    </Box>
  );

  return (
    <>
      {isUpLg ? (
        <Box
          component={m.div}
          {...varFade({ durationIn: 2, durationOut: 0 }).inLeft}
          sx={{ width: "100%" }}
        >
          <Stack component={Card} px={4} py={2} spacing={2} height="100%">
            <Typography variant="subtitle1" textAlign="center">
              {t("common.labels.players")}
            </Typography>
            <Divider sx={{ width: "100%" }} />
            {playersContent}
          </Stack>
        </Box>
      ) : (
        <>
          <Box
            component={m.div}
            {...varFade({ durationIn: 1, durationOut: 0 }).inRight}
            sx={{
              position: "fixed",
              top: 70,
              right: 20,
            }}
          >
            <Fab
              sx={{ position: "relative" }}
              size="small"
              color="primary"
              onClick={() => setOpen(() => true)}
            >
              <Iconify icon="fa6-solid:people-group" width={20} />
            </Fab>
          </Box>
          {open && (
            <Dialog
              maxWidth="xs"
              open={open}
              onClose={() => setOpen(() => false)}
              PaperComponent={(props: PaperProps) => (
                <m.div {...varZoom().in}>
                  <Paper {...props}>{props.children}</Paper>
                </m.div>
              )}
            >
              <DialogTitle textAlign="center" id="alert-dialog-title">
                {t("common.labels.players")}
              </DialogTitle>

              <Divider sx={{ width: "100%" }} />

              <DialogContent>{playersContent}</DialogContent>

              <Divider sx={{ width: "100%" }} />

              <DialogActions sx={{ py: 2 }}>
                <Button variant="outlined" onClick={() => setOpen(() => false)}>
                  {t("common.labels.close")}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </>
  );
};

export default PlayersBoard;
