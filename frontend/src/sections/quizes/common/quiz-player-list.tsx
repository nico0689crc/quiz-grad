import { Avatar, Box, Stack, Typography } from '@mui/material';
import { Player } from '@/types';

const QuizPlayerList = ({ players }: { players: Player[] }) => {
  return players.map((player) => (
    <Stack key={player.playerUUID} justifyContent='center' alignItems='center' spacing={1}>
      <Box sx={{ position: 'relative' }}>
        <Avatar alt={player.userName} src={player.avatar} sx={{ width: 50, height: 50 }}>
          {player.userName.charAt(0)}
        </Avatar>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: '15px',
            width: '15px',
            borderRadius: '50%',
            backgroundColor: (theme) => (player.connected ? theme.palette.success.main : theme.palette.error.main),
          }}
        />
      </Box>
      <Typography
        variant='caption'
        sx={{
          width: '60px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'center',
        }}
      >
        {player.userName}
      </Typography>
    </Stack>
  ));
};

export default QuizPlayerList;
