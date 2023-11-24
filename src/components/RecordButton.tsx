interface RecordButtonProps {
  recording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

export default function RecordButton({
  recording,
  stopRecording,
  startRecording,
}: RecordButtonProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-2 bg-teal-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

      <button
        className={`relative flex justify-center items-center bg-teal-400 rounded-full h-20 w-20 ${
          recording ? "animate-pulse" : ""
        }`}
        onClick={recording ? stopRecording : startRecording}
      >
        {recording ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
