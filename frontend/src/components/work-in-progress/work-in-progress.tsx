"use client";

import { Button, Stack } from "@mui/material";

import { useTranslate } from "@/locales";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import {
  IllustrationContainer,
  WorkInProgressIllustration,
} from "@/components/illustrations";

const WorkInProgress = () => {
  const { t } = useTranslate();

  return (
    <Stack alignItems="center" spacing={2} justifyContent="center" flexGrow={1}>
      <IllustrationContainer
        illustration={<WorkInProgressIllustration />}
        title={t("common.labels.work_progress_title")}
        subTitle={t("common.labels.work_progress_subtitle")}
        caButton={
          <Button
            size="large"
            component={RouterLink}
            href={paths.home}
            variant="contained"
            color="primary"
          >
            {t("common.labels.not_found_cabutton_home")}
          </Button>
        }
      />
    </Stack>
  );
};

export default WorkInProgress;
