"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useTranslate } from "@/locales";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import Iconify from "@/components/iconify";
import { paths } from "@/routes/paths";
import { Quiz } from "@/types";
import QuizQuestionsList from "../../common/playground/quiz-questions-list";
import { RouterLink } from "@/routes/components";

export default function QuizDetail({ quiz }: { quiz: Quiz }) {
  const { t } = useTranslate();
  const { title, description, questions, uuid } = quiz;

  return (
    <>
      <CustomBreadcrumbs
        heading={title}
        links={[
          {
            name: t("navbar.home"),
            href: paths.home,
          },
          {
            name: "Quizs",
            href: paths.quizes.root,
          },
          {
            name: title,
          },
        ]}
        action={
          <Stack direction="row" spacing={2}>
            <Button
              component={RouterLink}
              href={`${paths.quizes.root}/${uuid}/play`}
              variant="contained"
              color="success"
              startIcon={<Iconify icon="grommet-icons:gamepad" />}
            >
              {t("common.labels.lets_play")}
            </Button>
            <Button
              component={RouterLink}
              href={`${paths.quizes.root}/${uuid}/edit`}
              variant="contained"
              startIcon={<Iconify icon="solar:pen-bold" />}
            >
              {t("common.labels.edit")}
            </Button>
          </Stack>
        }
        sx={{
          mb: { xs: 3, md: 5 },
          px: { xs: 1, mb: 5 },
        }}
      />
      <Stack px={{ xs: 1, mb: 5 }} spacing={5}>
        <Typography variant="body1">{description}</Typography>
        <Stack>
          <QuizQuestionsList questions={questions} />
        </Stack>
      </Stack>
    </>
  );
}
