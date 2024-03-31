import { Box, Card, IconButton, Link, MenuItem, Stack } from "@mui/material";

import { usePopover } from "@/components/custom-popover";
import CustomPopover from "@/components/custom-popover/custom-popover";
import Iconify from "@/components/iconify";
import Image from "@/components/image";
import TextMaxLine from "@/components/text-max-line";
import { useResponsive } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { Quiz } from "@/types";
import { fShortenNumber } from "@/utils/format-number";
import { fDate } from "@/utils/format-time";

type ItemQuizProps = {
  quiz: Quiz;
};

export default function ItemQuiz({ quiz }: ItemQuizProps) {
  const popover = usePopover();
  const { uuid, title, coverUrl, createdAt, description, questions } = quiz;
  const smUp = useResponsive("up", "sm");
  const { t } = useTranslate();

  return (
    <>
      <Stack
        component={Card}
        direction={"row"}
        elevation={10}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Stack sx={{ p: (theme) => theme.spacing(3, 3, 2, 3), flexGrow: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 2 }}
          >
            <Box
              component="span"
              sx={{ typography: "caption", color: "text.disabled" }}
            >
              {fDate(createdAt)}
            </Box>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link
              color="inherit"
              component={RouterLink}
              href={`${paths.quizes.root}/${uuid}`}
              sx={{ width: "fit-content" }}
            >
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine
              variant="body2"
              line={4}
              sx={{ color: "text.secondary" }}
            >
              {description}
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-start"
              sx={{
                typography: "caption",
                color: "text.disabled",
              }}
            >
              <Stack direction="row" alignItems="center">
                <Iconify
                  icon="eva:message-circle-fill"
                  width={16}
                  sx={{ mr: 0.5 }}
                />
                {`${fShortenNumber(questions.length)} ${t("common.labels.questions")}`}
              </Stack>
            </Stack>

            <IconButton
              color={popover.open ? "inherit" : "default"}
              onClick={popover.onOpen}
            >
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Stack>
        </Stack>
        {smUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: "relative",
              flexShrink: 0,
              p: 1,
            }}
          >
            <Image
              alt={title}
              src={coverUrl}
              sx={{ height: 1, borderRadius: 1.5 }}
            />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          {t("common.labels.view")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {t("common.labels.edit")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t("common.labels.remove")}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
