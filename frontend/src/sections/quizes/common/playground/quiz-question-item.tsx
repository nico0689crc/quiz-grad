import React, { useCallback, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import {
  Button,
  Card,
  Collapse,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { Question } from "@/types";

import { RootState, useAppSelector } from "@/store";
import { selectCurrentQuestion } from "@/store/slices/room/roomSlice";

import { useTranslate } from "@/locales";
import { useBoolean } from "@/hooks/use-boolean";
import { useQuizContext } from "./contexts/use-quiz-context";

import QuizAnswersList from "./quiz-answers-list";
import { varFade } from "@/components/animate";
import Iconify from "@/components/iconify";
import { useQuizFormContext } from "../form/context/quiz-form-provider";
import QuizFormQuestionForm from "../form/quiz-form-question/quiz-form-question-form";

interface QuizQuestionItemProps {
  question: Partial<Question>;
  index?: number;
  showCollapse?: boolean;
  actions?: React.ReactNode;
  showMutationActions?: boolean;
}

export default function QuizQuestionItem({
  question,
  index,
  showCollapse = true,
  actions,
  showMutationActions = false,
}: QuizQuestionItemProps) {
  const { t } = useTranslate();
  const [open, setOpen] = useState(index === 0 ? true : false);
  const { sendAnswer, isRunning } = useQuizContext();
  const { removeQuestion } = useQuizFormContext();
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const editQuestionView = useBoolean(false);
  const removeQuestionView = useBoolean(false);

  const { isRoomOpen, user } = useAppSelector(
    (state: RootState) => state.room.room,
  );

  const removeQuestionHandler = useCallback(() => {
    question.questionUUID && removeQuestion(question.questionUUID);
  }, []);

  const questionContent = showCollapse ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <QuizAnswersList answers={question.answers!} />
    </Collapse>
  ) : (
    <QuizAnswersList answers={question.answers!} />
  );

  return (
    <Stack component={Card}>
      <AnimatePresence mode="wait">
        {editQuestionView.value && (
          <m.div key="edit-question" {...varFade().in}>
            <Stack px={3} py={4} spacing={2}>
              <QuizFormQuestionForm
                questionFormToggle={editQuestionView.onToggle}
                question={question}
              />
            </Stack>
          </m.div>
        )}
        {removeQuestionView.value && (
          <m.div key="remove-question" {...varFade().in}>
            <Stack px={3} py={4} spacing={2}>
              <Typography textAlign="center">
                {t("quiz_form.labels.remove_question", {
                  question_title: question.title,
                })}
              </Typography>
              <Stack justifyContent="center" direction="row" spacing={2}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={removeQuestionView.onToggle}
                >
                  {t("common.labels.cancel")}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={removeQuestionHandler}
                >
                  {t("common.labels.remove")}
                </Button>
              </Stack>
            </Stack>
          </m.div>
        )}
        {!editQuestionView.value && !removeQuestionView.value && (
          <m.div key="show-question" {...varFade().in}>
            <Stack px={3} py={4} spacing={2}>
              {actions && <Stack alignItems="flex-end">{actions}</Stack>}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {question.title}
                </Typography>
                {showMutationActions && (
                  <Stack direction="row">
                    <Tooltip title={t("common.labels.edit")} placement="top">
                      <IconButton
                        aria-label="delete"
                        color="warning"
                        onClick={editQuestionView.onToggle}
                      >
                        <Iconify icon="dashicons:edit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("common.labels.remove")} placement="top">
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={removeQuestionView.onToggle}
                      >
                        <Iconify icon="dashicons:trash" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                )}
                {showCollapse && (
                  <IconButton
                    aria-label="collapse"
                    onClick={() => setOpen(() => !open)}
                  >
                    <Iconify
                      icon={open ? "ep:arrow-down-bold" : "ep:arrow-up-bold"}
                    />
                  </IconButton>
                )}
              </Stack>

              <Typography>{question.description}</Typography>

              {questionContent}

              {isRoomOpen &&
                !user?.isUserModerator &&
                currentQuestion?.showButtons &&
                isRunning && (
                  <Stack alignItems="center">
                    <Button
                      fullWidth={false}
                      variant="contained"
                      onClick={sendAnswer}
                    >
                      {t("playing.labels.send_answer")}
                    </Button>
                  </Stack>
                )}
            </Stack>
          </m.div>
        )}
      </AnimatePresence>
    </Stack>
  );
}
