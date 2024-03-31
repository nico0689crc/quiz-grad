import {
  Container,
  Typography,
  Card,
  Stack,
  Divider,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { useTranslate } from "@/locales";
import QRCode from "qrcode.react";
import Image from "@/components/image";
import { selectPlayers, setRoomStatus } from "@/store/slices/room/roomSlice";
import { useCallback } from "react";
import { RoomStatusEnum } from "@/types";
import QuizPlayerList from "@/sections/quizes/common/playground/quiz-player-list";
import { useQuizContext } from "../../../common/playground/contexts/use-quiz-context";

const QuizModeratorWaitingPlayers = () => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const { sendNextQuestion } = useQuizContext();

  const { room } = useAppSelector((state: RootState) => state.room);

  const players = useAppSelector(selectPlayers);
  const { t } = useTranslate();

  const sendFirstQuestionHandler = useCallback(() => {
    dispatch(setRoomStatus(RoomStatusEnum.PLAYING));
    sendNextQuestion();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ display: "grid", gridTemplateRows: "100%" }}>
      <Box
        component={Card}
        sx={{ display: "grid", gridTemplateRows: "auto auto auto" }}
      >
        <Box
          sx={{
            display: "grid",
            ...(!isUpMd && { gridTemplateRows: "400px auto auto" }),
            ...(isUpMd && { gridTemplateColumns: "1fr auto 1fr" }),
            p: 2,
          }}
        >
          <Stack sx={{ alignItems: "center", justifyContent: "space-evenly" }}>
            <Typography variant="subtitle1">
              {t("waiting_for_players.labels.waiting_for_players")}
            </Typography>
            <Image
              src="/assets/illustrations/waiting_for_players.svg"
              height={0.4}
            />
            <Button onClick={sendFirstQuestionHandler} variant="contained">
              {t("waiting_for_players.labels.send_first_question")}
            </Button>
          </Stack>
          <Divider orientation={isUpMd ? "vertical" : "horizontal"} />
          <Stack
            spacing={2}
            py={3}
            sx={{ alignItems: "center", justifyContent: "space-evenly" }}
          >
            <Typography variant="subtitle1">{`${t("waiting_for_players.labels.invite_code")} ${room.inviteCode}`}</Typography>
            <Divider sx={{ width: "50%" }} variant="middle">
              <Typography variant="subtitle2">
                {t("common.labels.or")}
              </Typography>
            </Divider>
            <Typography variant="subtitle1">
              {t("waiting_for_players.labels.invite_qr")}
            </Typography>
            <QRCode
              value={`${process.env.NEXT_PUBLIC_FRONTEND_HOST_DOMAIN}/playground/${room.quiz?.quizUUID}`}
              includeMargin
              level="H"
            />
          </Stack>
        </Box>
        <Divider sx={{ width: "100%" }}>
          <Typography variant="subtitle2">
            {t("common.labels.players")}
          </Typography>
        </Divider>

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
      </Box>
    </Container>
  );
};

export default QuizModeratorWaitingPlayers;
