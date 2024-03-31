import { Button, Stack } from "@mui/material";
import { useTranslate } from "@/locales";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import Iconify from "@/components/iconify";
import { paths } from "@/routes/paths";
import { Quiz } from "@/types";
import { RouterLink } from "@/routes/components";
import QuizForm from "../../common/form/quiz-form";
import { useEffect } from "react";
import { useQuizFormContext } from "../../common/form/context/quiz-form-provider";

export default function QuizEdit({ quiz }: { quiz: Quiz }) {
  const { t } = useTranslate();
  const { initQuiz } = useQuizFormContext();

  const { title, description, questions, uuid } = quiz;

  useEffect(() => {
    initQuiz(title, description, questions)
  }, []);

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
            href: `${paths.quizes.root}/${uuid}`,
          },
          {
            name: t('common.labels.edit'),
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
          px: { xs: 1, mb: 5 },
        }}
      />
      <QuizForm />
    </>
  );
}
