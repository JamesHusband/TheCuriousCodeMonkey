"use client";

interface ToolbarButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export function ToolbarButton({ onClick, icon, label }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
      aria-label={label}
    >
      {icon}
    </button>
  );
}
