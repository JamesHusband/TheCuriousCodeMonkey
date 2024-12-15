"use client";

import { useEffect } from "react";
import { useDialog } from "@/lib/providers/DialogProvider";

export function DialogKeyboardManager() {
  const { toggleDialog, isDialogOpen, closeDialog } = useDialog();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "p"
      ) {
        event.preventDefault();
        toggleDialog("commandPalette");
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "`") {
        event.preventDefault();
        toggleDialog("terminal");
      }
      if (event.key === "Escape") {
        if (isDialogOpen("commandPalette")) closeDialog("commandPalette");
        if (isDialogOpen("terminal")) closeDialog("terminal");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeDialog, isDialogOpen, toggleDialog]);

  return null;
}
