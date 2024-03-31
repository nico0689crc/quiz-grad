import { AnimatePresence, m } from "framer-motion";
import {
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { varZoom } from "@/components/animate";
import { useTranslate } from "@/locales";
import Iconify from "@/components/iconify";
import { useState } from "react";
import PositionContent from "./position-content";

const PositionBoard = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslate();
  const theme = useTheme();
  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {isUpLg ? (
        <Stack
          component={Card}
          px={4}
          py={2}
          spacing={2}
          height="100%"
          minWidth={200}
        >
          <Typography variant="subtitle1" textAlign="center">
            {t("common.labels.positions")}
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <PositionContent />
        </Stack>
      ) : (
        <>
          <Fab
            sx={{ position: "absolute", top: 0, right: "10px" }}
            size="small"
            color="primary"
            onClick={() => setOpen(() => true)}
          >
            <Iconify icon="game-icons:podium" width={20} sx={{ mb: 1 }} />
          </Fab>

          <AnimatePresence>
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
                  {t("common.labels.positions")}
                </DialogTitle>
                <Divider sx={{ width: "100%" }} />
                <DialogContent>
                  <PositionContent />
                </DialogContent>
                <Divider sx={{ width: "100%" }} />
                <DialogActions sx={{ py: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setOpen(() => false)}
                  >
                    {t("common.labels.close")}
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
