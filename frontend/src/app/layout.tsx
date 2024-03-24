import "@/global.css";
import "@/locales/i18n";

import { AuthProvider } from "@/components/auth/context/auth-provider";
import { SettingsConsumer } from "@/components/settings/context/settings-consumer";
import MainLayout from "@/layouts/main";

import type { Metadata } from "next";
import { MotionLazy } from "src/components/animate/motion-lazy";
import { SettingsProvider } from "src/components/settings";
import ThemeProvider from "src/theme";
import { primaryFont } from "src/theme/typography";
import { ReduxProvider } from "@/store/provider";
import { WebsocketProvider } from "@/websocket/provider";

export const metadata: Metadata = {
  title: "Quiz Grad Game (MUI - NextJs)",
  keywords: "react,material,kit,application,dashboard,admin,template",
  description: "Quiz Grad Game (MUI - NextJs)",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <WebsocketProvider>
            <AuthProvider>
              <SettingsProvider defaultSettings={{ themeMode: "dark" }}>
                <ThemeProvider>
                  <MotionLazy>
                    <SettingsConsumer>
                      <MainLayout>{children}</MainLayout>
                    </SettingsConsumer>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </WebsocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
