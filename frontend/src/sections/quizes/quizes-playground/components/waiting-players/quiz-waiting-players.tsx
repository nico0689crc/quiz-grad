import {
  Container,
  Typography,
  Card,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import { useAppSelector } from "@/store";
import { useTranslate } from "@/locales";
import { selectPlayers } from "@/store/slices/room/roomSlice";
import QuizPlayerList from "@/sections/quizes/common/quiz-player-list";

const QuizWaitingPlayers = () => {
  const players = useAppSelector(selectPlayers);
  const { t } = useTranslate();

  return (
    <Container maxWidth="lg">
      <Card sx={{ p: 5 }}>
        <Divider orientation="horizontal">
          <Typography variant="subtitle2">
            {t("common.labels.players")}
          </Typography>
        </Divider>
        <Stack sx={{ alignItems: "center", justifyContent: "space-evenly" }}>
          {players.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
              }}
            >
              <Typography variant="subtitle1">
                {t("waiting_for_players.labels.no_players")}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(3, 1fr)",
                  sm: "repeat(6, 1fr)",
                  md: "repeat(9, 1fr)",
                  lg: "repeat(12, 1fr)",
                },
                gap: 2,
                p: 3,
              }}
            >
              <QuizPlayerList players={players} />
            </Box>
          )}
        </Stack>
      </Card>
    </Container>
  );
};

export default QuizWaitingPlayers;
