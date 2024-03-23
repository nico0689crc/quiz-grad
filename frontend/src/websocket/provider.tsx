'use client';

import { createContext, PropsWithChildren } from 'react';
import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_BACKEND_HOST_DOMAIN as string, {
  withCredentials: true,
});

export const SocketContext = createContext(socket);

export function WebsocketProvider({ children }: PropsWithChildren) {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
