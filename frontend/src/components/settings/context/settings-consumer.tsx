"use client";

import { SettingsContext } from "./settings-context";

export const SettingsConsumer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SettingsContext.Consumer>
      {(setting) => (!setting.isLoading ? children : null)}
    </SettingsContext.Consumer>
  );
};
