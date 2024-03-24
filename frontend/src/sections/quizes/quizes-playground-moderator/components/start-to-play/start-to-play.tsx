import { useCallback } from "react";
import { Button, Stack } from "@mui/material";

import { useParams } from "@/hooks/use-params";
import { useWebSocket } from "@/websocket/use-web-socket";
import { useTranslate } from "@/locales";
import { useAppDispatch } from "@/store";
import { getQuizLocalStorageKey, setStorage } from "@/hooks/use-local-storage";

import {
  IllustrationContainer,
  StartToPlayIllustration,
} from "@/components/illustrations";

import { initializeRoom } from "@/store/slices/room/roomSlice";

import { ParamsQuizUUID } from "@/types";
import { setError } from "@/store/slices/common/commonSlice";

const StartToPlay = () => {
  const { t } = useTranslate();
  const websocket = useWebSocket();
  const dispatch = useAppDispatch();
  const { uuid: quizUUID } = useParams<ParamsQuizUUID>();

  const openRoom = useCallback(() => {
    websocket.emit.onOpenRoomToPlay(
      { quizUUID },
      ({ confirm, player, room, message }) => {
        if (confirm) {
          const user = { ...player, isUserModerator: true };
          setStorage(getQuizLocalStorageKey(quizUUID), {
            accessToken: player.accessToken,
          });
          dispatch(initializeRoom({ ...room, user, isRoomOpen: true }));
        } else {
          dispatch(setError(message));
        }
      },
    );
  }, [quizUUID]);

  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1}>
      <IllustrationContainer
        illustration={<StartToPlayIllustration />}
        title={t("start_to_play.labels.title")}
        subTitle={t("start_to_play.labels.sub_title")}
        caButton={
          <Button onClick={openRoom} color="primary" variant="contained">
            {t("start_to_play.labels.start_to_play_button")}
          </Button>
        }
      />
    </Stack>
  );
};

export default StartToPlay;
