"use client";

import { useDialog } from "@/lib/providers/DialogProvider";

export function GNUButton() {
  const { toggleDialog } = useDialog();

  return (
    <button
      onClick={() => toggleDialog("gnuTerry")}
      className="text-gray-400 hover:text-white text-sm transition-colors"
    >
      G.N.U PTerry
    </button>
  );
}
