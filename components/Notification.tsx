"use client";

import { useEffect, useState } from "react";

export type NotificationType = "error" | "success" | "info";

interface NotificationProps {
  message: string;
  type?: NotificationType;
  onDismiss?: () => void;
  autoDismissMs?: number;
}

const BAR_COLORS: Record<NotificationType, string> = {
  error: "bg-red-500",
  success: "bg-green-500",
  info: "bg-blue-500",
};

const CONTAINER_COLORS: Record<NotificationType, string> = {
  error: "border-red-400 bg-red-50 text-red-800",
  success: "border-green-400 bg-green-50 text-green-800",
  info: "border-blue-400 bg-blue-50 text-blue-800",
};

export default function Notification({
  message,
  type = "error",
  onDismiss,
  autoDismissMs = 5000,
}: NotificationProps) {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [barWidth, setBarWidth] = useState(100);

  useEffect(() => {
    const enterRaf = requestAnimationFrame(() => {
      setMounted(true);
      if (autoDismissMs) setBarWidth(0);
    });

    const dismissTimer =
      onDismiss &&
      autoDismissMs &&
      setTimeout(() => {
        setExiting(true);
        setTimeout(onDismiss, 300);
      }, autoDismissMs);

    return () => {
      cancelAnimationFrame(enterRaf);
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, [onDismiss, autoDismissMs]);

  const isVisible = mounted && !exiting;

  return (
    <div
      className={`fixed right-4 bottom-4 left-4 z-50 sm:left-auto sm:w-80 transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        role="alert"
        className={`overflow-hidden rounded-lg border shadow-lg ${CONTAINER_COLORS[type]}`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-3 text-sm">
          <p>{message}</p>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="shrink-0 opacity-60 hover:opacity-100"
              aria-label="Dismiss"
            >
              ✕
            </button>
          )}
        </div>

        {autoDismissMs > 0 && (
          <div className="h-1 w-full bg-black/5">
            <div
              className={`h-full ${BAR_COLORS[type]}`}
              style={{
                width: `${barWidth}%`,
                transition: `width ${autoDismissMs}ms linear`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
