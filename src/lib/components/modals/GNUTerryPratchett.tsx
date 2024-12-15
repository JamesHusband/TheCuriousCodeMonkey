"use client";

import { useDialog } from "@/lib/providers/DialogProvider";

export function GNUTerryPratchett() {
  const { closeDialog } = useDialog();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDialog("gnuTerry");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 w-2/3 max-w-2xl rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-700 px-4 py-2">
          <h2 className="text-xl font-semibold text-white">
            GNU Terry Pratchett
          </h2>
          <button
            onClick={() => closeDialog("gnuTerry")}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-300">
            "A man is not dead while his name is still spoken." - Going Postal,
            Chapter 4 prologue
          </p>
          <div className="space-y-4 text-gray-300">
            <p>
              GNU Terry Pratchett is a tribute to author Sir Terry Pratchett,
              who passed away in March 2015. The message is passed in the
              "X-Clacks-Overhead" header, reminiscent of the "clacks"
              communication system in his Discworld novels.
            </p>
            <p>In the Discworld, "GNU" represents a specific clacks code:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>G: Send the message on</li>
              <li>N: Do not log the message</li>
              <li>U: Turn the message around at the end of the line</li>
            </ul>
            <p>
              This means Terry's name will be carried on forever through the
              internet's "clacks" - our HTTP headers.
            </p>
            <div className="mt-6 bg-gray-900 p-4 rounded-md">
              <code className="text-green-400">
                X-Clacks-Overhead: GNU Terry Pratchett
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
