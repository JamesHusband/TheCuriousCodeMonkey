"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Terminal as TerminalComponent } from "@/lib/components/terminal/Terminal";
import { GNUTerryPratchett } from "@/lib/components/modals/GNUTerryPratchett";
import { Command } from "lucide-react";

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

  const handleModalBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeDialog("commandPalette");
        closeDialog("gnuTerry");
      }
    },
    [closeDialog]
  );

  return (
    <DialogContext.Provider
      value={{ openDialog, closeDialog, toggleDialog, isDialogOpen }}
    >
      {children}

      {/* Command Palette */}
      {isDialogOpen("commandPalette") && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-gray-800 w-2/3 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
                <Command className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none focus:outline-none text-white"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal */}
      <TerminalComponent
        isOpen={isDialogOpen("terminal")}
        onClose={() => closeDialog("terminal")}
        onBackdropClick={() => {}}
      />

      {/* GNU Terry Pratchett */}
      <GNUTerryPratchett
        isOpen={isDialogOpen("gnuTerry")}
        onClose={() => closeDialog("gnuTerry")}
        onBackdropClick={handleModalBackdropClick}
      />
    </DialogContext.Provider>
  );
}
