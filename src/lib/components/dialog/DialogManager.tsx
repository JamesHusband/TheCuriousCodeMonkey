"use client";

import { useDialog } from "@/lib/providers/DialogProvider";
import { Terminal } from "@/lib/components/terminal/Terminal";
import { GNUTerryPratchett } from "@/lib/components/modals/GNUTerryPratchett";
import { CommandPalette } from "@/lib/components/command-palette/CommandPalette";

export function DialogManager() {
  const { isDialogOpen } = useDialog();

  return (
    <>
      {isDialogOpen("commandPalette") && <CommandPalette />}
      <Terminal />
      {isDialogOpen("gnuTerry") && <GNUTerryPratchett />}
    </>
  );
}
