"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { DialogManager } from "@/lib/components/dialog/DialogManager";
import { DialogKeyboardManager } from "@/lib/components/dialog/DialogKeyboardManager";

type DialogType = "terminal" | "commandPalette" | "gnuTerry";

interface DialogContextType {
  openDialog: (type: DialogType) => void;
  closeDialog: (type: DialogType) => void;
  toggleDialog: (type: DialogType) => void;
  isDialogOpen: (type: DialogType) => boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [openDialogs, setOpenDialogs] = useState<Set<DialogType>>(new Set());

  const openDialog = useCallback((type: DialogType) => {
    setOpenDialogs((prev) => new Set(prev).add(type));
  }, []);

  const closeDialog = useCallback((type: DialogType) => {
    setOpenDialogs((prev) => {
      const next = new Set(prev);
      next.delete(type);
      return next;
    });
  }, []);

  const toggleDialog = useCallback((type: DialogType) => {
    setOpenDialogs((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  const isDialogOpen = useCallback(
    (type: DialogType) => openDialogs.has(type),
    [openDialogs]
  );

  return (
    <DialogContext.Provider
      value={{ openDialog, closeDialog, toggleDialog, isDialogOpen }}
    >
      {children}
      <DialogManager />
      <DialogKeyboardManager />
    </DialogContext.Provider>
  );
}
