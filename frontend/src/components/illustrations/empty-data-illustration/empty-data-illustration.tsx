"use client";

import { Stack } from "@mui/material";

import { useTranslate } from "@/locales";

import {
  IllustrationContainer,
  NoDataIllustration,
} from "@/components/illustrations";

const EmptyDataIllustration = () => {
  const { t } = useTranslate();

  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1}>
      <IllustrationContainer
        illustration={<NoDataIllustration />}
        title={t("common.labels.no_data_title")}
        subTitle={t("common.labels.no_data_subtitle")}
      />
    </Stack>
  );
};

export default EmptyDataIllustration;
