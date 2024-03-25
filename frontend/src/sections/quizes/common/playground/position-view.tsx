import { Button, Card, Divider, Stack, Typography } from "@mui/material";
import PositionContent from "./position-content";
import { useTranslate } from "@/locales";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { RootState, useAppSelector } from "@/store";

const PositionView = () => {
  const { t } = useTranslate();
  const { quiz, user } = useAppSelector((state: RootState) => state.room.room);

  return (
    <Stack
      component={Card}
      sx={{
        display: "grid",
        gridTemplateRows: "auto auto 1fr auto auto",
      }}
      px={4}
      py={2}
      spacing={2}
      height="100%"
      minWidth={200}
    >
      <Typography variant="subtitle1" textAlign="center">
        {t("common.labels.positions")}
      </Typography>
      <Divider sx={{ width: "100%" }} />
      <PositionContent />
      <Divider sx={{ width: "100%" }} />
      <Stack alignItems="center">
        <Button
          component={RouterLink}
          href={
            user?.isUserModerator
              ? `${paths.quizes.root}/${quiz?.uuid}`
              : paths.home
          }
          variant="contained"
          color="primary"
        >
          {user?.isUserModerator
            ? t("playing.labels.back_quiz")
            : t("playing.labels.back_home")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default PositionView;
