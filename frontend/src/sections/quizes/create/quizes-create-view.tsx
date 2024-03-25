"use client";

import { Stack } from "@mui/material";
import { paths } from "@/routes/paths";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { useTranslate } from "@/locales";
import QuizForm from "../common/form/quiz-form";

const QuizesCreateView = () => {
  const { t } = useTranslate();

  return (
    <Stack sx={{ width: "100%" }}>
      <CustomBreadcrumbs
        heading={t("quiz_create.labels.page_title")}
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
            name: t("quiz_create.labels.page_title"),
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
          px: { xs: 1, mb: 5 },
        }}
      />
      <QuizForm />
    </Stack>
  );
};

export default QuizesCreateView;
