'use client';

import type { AppStore } from '@/store';
import { makeStore } from '@/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

interface Props {
  readonly children: ReactNode;
}

export const ReduxProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
