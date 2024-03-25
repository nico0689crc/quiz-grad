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

import { varZoom } from "@/components/animate";
import Iconify from "@/components/iconify";
import { useTranslate } from "@/locales";
import QuizPlayerList from "@/sections/quizes/common/playground/quiz-player-list";
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
        <Stack component={Card} px={4} py={2} spacing={2} height="100%">
          <Typography variant="subtitle1" textAlign="center">
            {t("common.labels.players")}
          </Typography>
          <Divider sx={{ width: "100%" }} />
          {playersContent}
        </Stack>
      ) : (
        <>
          <Fab
            sx={{ position: "absolute", top: 0, right: "60px" }}
            size="small"
            color="primary"
            onClick={() => setOpen(() => true)}
          >
            <Iconify icon="fa6-solid:people-group" width={20} />
          </Fab>
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
