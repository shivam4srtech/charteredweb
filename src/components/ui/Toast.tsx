"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ToastFn = (message: string) => void;
const ToastContext = createContext<ToastFn>(() => {});

/** Small bottom-centre toast, same look and timing as the original page. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback<ToastFn>((msg) => {
    setMessage(msg);
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2600);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={"toast" + (show ? " show" : "")} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
