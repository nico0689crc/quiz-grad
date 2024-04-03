import { useCallback } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  PaperProps,
} from "@mui/material";
import { useTranslate } from "@/locales/use-locales";
import { ReturnType } from "@/hooks/use-boolean";
import { varFade } from "@/components/animate";
import LoadingButton from "@/components/loading-button/loading-button";
import { useDeleteQuiz } from "@/utils/react-query/quiz";

type PropsType = {
  viewDeleteDialog: ReturnType;
  quiz: { quizUUID: string; title: string };
};

const QuizDelete = ({ viewDeleteDialog, quiz }: PropsType) => {
  const { deleteQuiz } = useDeleteQuiz();
  const { t } = useTranslate();

  const deleteQuizHandler = useCallback(() => {
    deleteQuiz(quiz.quizUUID);
    viewDeleteDialog.onFalse();
  }, [quiz]);

  return (
    <AnimatePresence mode="sync">
      {viewDeleteDialog.value && (
        <Dialog
          open={viewDeleteDialog.value}
          onClose={viewDeleteDialog.onFalse}
          fullWidth
          maxWidth="xs"
          PaperComponent={(props: PaperProps) => (
            <m.div {...varFade().inDown}>
              <Paper sx={{ p: 2, maxWidth: "500px" }}>{props.children}</Paper>
            </m.div>
          )}
        >
          <DialogTitle id="alert-dialog-title">
            {t("quiz_delete.labels.title_dialog")}
          </DialogTitle>

          <DialogContent>
            {t("quiz_delete.labels.content_dialog")}
          </DialogContent>

          <DialogActions sx={{ display: "flex", columnGap: 2 }}>
            <Button color="error" onClick={viewDeleteDialog.onFalse}>
              {t("common.labels.cancel")}
            </Button>
            <LoadingButton
              variant="contained"
              color="error"
              onClick={deleteQuizHandler}
              autoFocus
              label={t("common.labels.remove")}
              loadingLabel={t("common.labels.removing")}
            />
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default QuizDelete;
