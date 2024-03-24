"use client";

import { useQuizes } from "@/utils/react-query/quiz";
import ListQuizes from "./componentes/list-quizes";
import { LoadingSpinner } from "@/components/loading-spinner";
import ErrorIllustration from "@/components/illustrations/error-illustration";
import EmptyDataIllustration from "@/components/illustrations/empty-data-illustration";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import { Button, Stack } from "@mui/material";
import Iconify from "@/components/iconify";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { useTranslate } from "@/locales";

const QuizesListView = () => {
  const { error, isLoading, quizes, isDataEmpty } = useQuizes();
  const { t } = useTranslate();

  return (
    <Stack sx={{ width: "100%" }} spacing={3}>
      <CustomBreadcrumbs
        heading="Quizs"
        links={[
          {
            name: t("navbar.home"),
            href: paths.home,
          },
          {
            name: "Quizs",
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.quizes.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t("common.labels.create_quiz")}
          </Button>
        }
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorIllustration />}
      {!isLoading && quizes && isDataEmpty && <EmptyDataIllustration />}
      {!isLoading && quizes && !isDataEmpty && <ListQuizes quizes={quizes} />}
    </Stack>
  );
};

export default QuizesListView;
