import { AnimatePresence, m } from "framer-motion";

import {
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useBoolean } from "@/hooks/use-boolean";

import Iconify from "@/components/iconify";
import TextMaxLine from "@/components/text-max-line";
import { useTranslate } from "@/locales";
import { Answer } from "@/types";
import { varFade } from "@/components/animate";
import { useCallback, useContext } from "react";
import { QuizFormAnswerContext } from "../context/quiz-form-answer-context";

type PropsType = {
  answer: Partial<Answer>;
  index: number;
};

const QuizFormItemAnswer = ({ answer, index }: PropsType) => {
  const { t } = useTranslate();
  const editAnswerView = useBoolean(false);
  const removeAnswerView = useBoolean(false);
  const { removeAnswer } = useContext(QuizFormAnswerContext);

  const removeAnswerHandler = useCallback(() => {
    answer.answerUUID && removeAnswer(answer.answerUUID);
  }, []);

  return (
    <Stack
      sx={{
        position: "relative",
        border: (theme) => `1px dashed ${theme.palette.primary.main}`,
        borderRadius: 1,
        p: 2,
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        {removeAnswerView.value && (
          <m.div key="remover" {...varFade().in}>
            <Stack spacing={2}>
              <Typography textAlign="center">Desea eliminar?</Typography>
              <Stack alignItems="center" direction="row" spacing={2}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={removeAnswerView.onToggle}
                >
                  {t("common.labels.cancel")}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={removeAnswerHandler}
                >
                  {t("common.labels.remove")}
                </Button>
              </Stack>
            </Stack>
          </m.div>
        )}
        {!editAnswerView.value && !removeAnswerView.value && (
          <m.div key="question" {...varFade().in}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Typography variant="subtitle1">{`${t("common.labels.question")} ${++index}`}</Typography>
                <Stack direction="row">
                  <Tooltip title={t("common.labels.edit")} placement="top">
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={editAnswerView.onToggle}
                    >
                      <Iconify icon="dashicons:edit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("common.labels.remove")} placement="top">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={removeAnswerView.onToggle}
                    >
                      <Iconify icon="dashicons:trash" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TextMaxLine sx={{ flexGrow: 1 }}>{answer.content}</TextMaxLine>
                <Chip
                  size="small"
                  variant="outlined"
                  color={answer.isCorrect ? "success" : "error"}
                  label={
                    answer.isCorrect
                      ? t("common.labels.correct")
                      : t("common.labels.incorrect")
                  }
                />
              </Stack>
            </Stack>
          </m.div>
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default QuizFormItemAnswer;
