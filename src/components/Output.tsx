import { useState } from "react";

export default function Output({
  transcription,
  restart,
}: {
  transcription: string;
  restart: () => void;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const copy = async () => {
    await navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col max-w-md w-1/2 space-y-4">
      <div className="p-4 bg-neutral-100 rounded-md divide-y-2">
        <div className="flex justify-between items-center mb-2">
          <h1>Result</h1>
          <button id="copyBtn" onClick={copy}>
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="pt-2 ">{transcription}</p>
      </div>
      <button
        className="py-2 px-3 rounded-full border border-teal-400 text-teal-400"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}
