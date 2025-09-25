import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { API_CONFIG } from '../lib/api/config';

const SOCKET_URL = API_CONFIG.BASE_URL || 'http://localhost:3000'; // Your backend Socket.IO URL

interface SocketContextType {
  socket: Socket | null;
  emitEvent: (eventName: string, data: any) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
}

export const useSocket = (): SocketContextType => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection only once
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    // Event listeners
    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current?.id);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Clean up on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // This function handles emitting events
  const emitEvent = (eventName: string, data: any) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, data);
    } else {
      console.warn('Socket not connected, cannot emit event:', eventName);
    }
  };

  // Functions to join/leave chat rooms
  const joinChat = (id: string) => {
    if (socketRef.current && socketRef.current.connected && id) {
      socketRef.current.emit('joinChat', id);
    }
  };

  const leaveChat = (id: string) => {
    if (socketRef.current && socketRef.current.connected && id) {
      socketRef.current.removeListener('');
    }
  };

  // Return socket instance and functions to join/leave/emit
  return { socket: socketRef.current, emitEvent, joinChat, leaveChat };
};
