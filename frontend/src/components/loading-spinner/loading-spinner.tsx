import { CircularProgress, Stack } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Stack flexGrow={1} alignItems="center" justifyContent="center">
      <CircularProgress color="primary" />
    </Stack>
  );
}
