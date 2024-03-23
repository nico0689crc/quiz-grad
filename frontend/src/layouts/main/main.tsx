'use client';
import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SnackbarProvider } from '@/components/snackbar';

import Header from './header';
import Footer from './footer';
import ReactQueryProvider from '@/utils/react-query/client/react-query-provider';

type Props = {
  children: React.ReactNode;
};

const HEADER_HIGHT_DESKTOP = 100;
const HEADER_HIGHT_MOBILE = 50;

export default function MainLayout({ children }: Props) {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ReactQueryProvider>
      <SnackbarProvider>
        <Stack
          sx={{
            display: 'grid',
            gridTemplateRows: `${isUpMd ? HEADER_HIGHT_DESKTOP : HEADER_HIGHT_MOBILE}px 1fr`,
            height: '100vh',
            backgroundColor: 'background.default',
          }}
        >
          <Header />
          <Stack sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
            {children}
            <Footer />
          </Stack>
        </Stack>
      </SnackbarProvider>
    </ReactQueryProvider>
  );
}
