import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { IllustrationContainer, AuthenticateIllustration } from '@/components/illustrations';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const theme = useTheme();
  const isUpToLg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
      {isUpToLg && (
        <Stack justifyContent='center' flexGrow={1}>
          <IllustrationContainer illustration={<AuthenticateIllustration />} />
        </Stack>
      )}
      <Stack flexGrow={1} sx={{ maxWidth: 450, justifyContent: 'center' }}>
        {children}
      </Stack>
    </>
  );
};

export default AuthLayout;
