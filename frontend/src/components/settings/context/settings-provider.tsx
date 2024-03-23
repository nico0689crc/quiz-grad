'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useLocalStorage } from 'src/hooks/use-local-storage';
import { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { localStorage, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const [isLoading, setIsLoading] = useState(true);
  const [navbarMobileToggle, setNavbarMobileToggle] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const toggleMobileNavbar = useCallback(() => {
    setNavbarMobileToggle((navbarMobileToggle) => !navbarMobileToggle);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      ...localStorage,
      onUpdate: update,
      isLoading,
      navbarMobileToggle,
      toggleMobileNavbar,
    }),
    [reset, update, localStorage, isLoading, navbarMobileToggle, toggleMobileNavbar]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
