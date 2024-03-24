import { RootState, useAppSelector } from "@/store";
import { Stack, Typography } from "@mui/material";

const PositionContent = () => {
  const { positions } = useAppSelector((state: RootState) => state.room.room);

  return (
    <Stack spacing={2}>
      {positions?.map((position, index) => (
        <Stack direction="row" spacing={1} key={position.playerUUID}>
          <Typography variant="subtitle1">{++index}</Typography>
          <Typography component="span">-</Typography>
          <Typography
            sx={{
              width: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="subtitle1"
          >
            {position.userName}
          </Typography>
          <Typography component="span">-</Typography>
          <Typography variant="subtitle1">
            {position.totalPoints} pts
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

export default PositionContent;