import { Question } from "@/types";
import { Card, Collapse, IconButton, Stack, Typography } from "@mui/material";
import QuizAnswersList from "./quiz-answers-list";
import Iconify from "@/components/iconify";
import React, { useState } from "react";

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
    </Stack>
  );
}
