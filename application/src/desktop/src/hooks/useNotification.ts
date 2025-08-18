import { useState, useCallback } from "react";

interface NotificationData {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

export function useNotification() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = useCallback((
    message: string, 
    type: "success" | "error" | "info" | "warning" = "info",
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: NotificationData = { id, message, type, duration };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove notification after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification,
    clearAll,
    success: (message: string, duration?: number) => showNotification(message, "success", duration),
    error: (message: string, duration?: number) => showNotification(message, "error", duration),
    info: (message: string, duration?: number) => showNotification(message, "info", duration),
    warning: (message: string, duration?: number) => showNotification(message, "warning", duration),
  };
}
