import { Question } from "@/types";
import {
  Button,
  Card,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import QuizAnswersList from "./quiz-answers-list";
import Iconify from "@/components/iconify";
import React, { useState } from "react";
import { RootState, useAppSelector } from "@/store";
import { useQuizContext } from "./contexts/use-quiz-context";
import { selectCurrentQuestion } from "@/store/slices/room/roomSlice";
import { useTranslate } from "@/locales";

interface QuizQuestionItemProps {
  question: Question;
  index?: number;
  showCollapse?: boolean;
  actions?: React.ReactNode;
}

export default function QuizQuestionItem({
  question: { title, answers, description },
  index,
  showCollapse = true,
  actions,
}: QuizQuestionItemProps) {
  const [open, setOpen] = useState(index === 0 ? true : false);
  const { t } = useTranslate();

  const { isRoomOpen, user } = useAppSelector(
    (state: RootState) => state.room.room,
  );
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const { sendAnswer, isRunning } = useQuizContext();

  const handleCollapse = () => {
    setOpen(!open);
  };

  const questionTitle = index ? `${++index} - ${title}` : title;

  const questionContent = showCollapse ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <QuizAnswersList answers={answers} />
    </Collapse>
  ) : (
    <QuizAnswersList answers={answers} />
  );

  return (
    <Stack component={Card} px={3} py={4} spacing={2}>
      {actions && <Stack alignItems="flex-end">{actions}</Stack>}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{questionTitle}</Typography>
        {showCollapse && (
          <IconButton aria-label="collapse" onClick={handleCollapse}>
            <Iconify icon={open ? "ep:arrow-down-bold" : "ep:arrow-up-bold"} />
          </IconButton>
        )}
      </Stack>
      <Typography>{description}</Typography>
      {questionContent}
      {isRoomOpen &&
        !user?.isUserModerator &&
        currentQuestion?.showButtons &&
        isRunning && (
          <Stack alignItems="center">
            <Button fullWidth={false} variant="contained" onClick={sendAnswer}>
              {t("playing.labels.send_answer")}
            </Button>
          </Stack>
        )}
    </Stack>
  );
}
