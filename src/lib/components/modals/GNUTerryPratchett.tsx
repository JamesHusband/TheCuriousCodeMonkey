"use client";

import Image from "next/image";

interface GNUTerryPratchettProps {
  isOpen: boolean;
  onClose: () => void;
  onBackdropClick: (e: React.MouseEvent) => void;
}

export function GNUTerryPratchett({
  isOpen,
  onClose,
  onBackdropClick,
}: GNUTerryPratchettProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onBackdropClick}
    >
      <div className="bg-[#1f2937] w-2/3 max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <Image
              src="/assets/bumblebee.png"
              alt="Bumblebee"
              fill
              className="object-cover opacity-10"
            />
          </div>
          <div className="p-8 relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 mb-6">
                GNU Terry Pratchett
              </h2>
              <div className="space-y-6 text-gray-300">
                <div className="space-y-2">
                  <p className="text-lg italic">
                    "You know they'll never really die while the Trunk is
                    alive[...] It lives while the code is shifted, and they live
                    with it, always Going Home."
                  </p>
                  <p className="text-sm text-gray-500">
                    - Moist von Lipwig, Going Postal, Chapter 13
                  </p>
                </div>
                <div className="my-6 border-l-4 border-red-600/50 pl-4 py-2 bg-gray-800/50">
                  <p>
                    In Terry Pratchett's Discworld series, the clacks are a
                    series of semaphore towers loosely based on the concept of
                    the telegraph. Invented by an artificer named Robert
                    Dearheart, the towers could send messages "at the speed of
                    light" using standardized codes. Three of these codes are of
                    particular import:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p>
                      <span className="font-bold text-red-500">G:</span> send
                      the message on
                    </p>
                    <p>
                      <span className="font-bold text-red-500">N:</span> do not
                      log the message
                    </p>
                    <p>
                      <span className="font-bold text-red-500">U:</span> turn
                      the message around at the end of the line and send it back
                      again
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p>
                    When Dearheart's son John died due to an accident while
                    working on a clacks tower, Dearheart inserted John's name
                    into the overhead of the clacks with a "GNU" in front of it
                    as a way to memorialize his son forever (or for at least as
                    long as the clacks are standing.)
                  </p>
                  <div className="space-y-2">
                    <p className="text-lg italic">
                      "A man is not dead while his name is still spoken."
                    </p>
                    <p className="text-sm text-gray-500">
                      - Going Postal, Chapter 4 prologue
                    </p>
                  </div>
                  <p>
                    Keeping the legacy of{" "}
                    <a
                      href="http://www.gnuterrypratchett.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 underline"
                    >
                      Sir Terry Pratchett
                    </a>{" "}
                    alive forever.
                  </p>
                  <p>
                    For as long as his name is still passed along the Clacks
                    <sup className="text-sm">1</sup>,
                    <br />
                    Death can't have him.
                  </p>
                  <p className="text-sm text-gray-500">
                    <sup>1</sup> Nowadays called the Internet.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-red-600/90 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
