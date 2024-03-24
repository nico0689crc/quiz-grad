"use client";

import { Button, Stack } from "@mui/material";

import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { useTranslate } from "@/locales";

import {
  IllustrationContainer,
  PageNotFoundIllustration,
} from "@/components/illustrations";

export const metadata = {
  title: "404 Page Not Found!",
};

const NotFoundPage = () => {
  const { t } = useTranslate();

  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1}>
      <IllustrationContainer
        illustration={<PageNotFoundIllustration />}
        title={t("common.labels.not_found_title")}
        subTitle={t("common.labels.not_found_subtitle")}
        caButton={
          <Button
            component={RouterLink}
            href={paths.home}
            size="large"
            color="primary"
            variant="contained"
          >
            {t("common.labels.not_found_cabutton_home")}
          </Button>
        }
      />
    </Stack>
  );
};

export default NotFoundPage;
