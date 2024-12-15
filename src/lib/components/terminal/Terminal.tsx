"use client";

import { useState, useRef, useEffect } from "react";
import { useDialog } from "@/lib/providers/DialogProvider";

interface TerminalCommand {
  command: string;
  output: string;
  isVideo?: boolean;
  videoId?: string;
}

function VideoEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="my-4 flex justify-center">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function Terminal() {
  const { isDialogOpen, closeDialog } = useDialog();
  const [history, setHistory] = useState<TerminalCommand[]>([
    {
      command: "",
      output: "Welcome to The Curious Code Monkey Terminal...",
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let output = "";
    let isVideo = false;
    let videoId = "";

    switch (cmd) {
      case "ook":
        output = "Ook?";
        break;

      case "monkey":
        output = "🐒 Spinning up some monkey business...";
        isVideo = true;
        videoId = "zuu_ob29yIc";
        break;

      default:
        output = "Type 'ook' for a surprise.";
    }

    setHistory((prev) => [...prev, { command, output, isVideo, videoId }]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentCommand);
      setCurrentCommand("");
    } else if (e.key === "Backspace") {
      setCurrentCommand((prev) => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setCurrentCommand((prev) => prev + e.key);
    }
  };

  useEffect(() => {
    if (isDialogOpen("terminal")) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDialogOpen, currentCommand, handleKeyDown]);

  if (!isDialogOpen("terminal")) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
    >
      <div
        className="bg-[#1f2937] w-3/4 h-2/3 rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
          <span className="text-gray-300">Terminal</span>
          <button
            onClick={() => closeDialog("terminal")}
            className="text-gray-400 hover:text-white"
            aria-label="Close terminal"
          >
            ×
          </button>
        </div>
        <div
          ref={terminalRef}
          className="p-4 font-mono text-green-400 bg-black h-[calc(100%-40px)] overflow-y-auto"
        >
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              {entry.command && (
                <div>
                  <span className="text-blue-400">$ </span>
                  <span>{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div>
                  {entry.output.split("\n").map((line, j) => (
                    <div key={j}>{line}</div>
                  ))}
                  {entry.isVideo && entry.videoId && (
                    <VideoEmbed videoId={entry.videoId} />
                  )}
                </div>
              )}
            </div>
          ))}
          <div>
            <span className="text-blue-400">$ </span>
            <span>{currentCommand}</span>
            <span
              className={`${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity duration-100`}
            >
              ▊
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
